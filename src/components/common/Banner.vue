<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from 'vue'
import {ShrinkImage} from '@/components/image'
import {FloatUpText} from '@/components/text'
import {ScrollToNextViewport} from '@/components/scroll'
import type {BannerImageItem} from '@/types/item'


const props = withDefaults(defineProps<{
    images: BannerImageItem[]
    autoplay?: boolean
    interval?: number
}>(), {
    autoplay: true,
    interval: 5000
})

// 视口宽高
const bannerRef = ref<HTMLElement | null>(null)
const bannerHeight = ref(0)
const bannerWidth = ref(0)

// 当前索引
const currentIndex = ref(0)
// 进度条进度, 0~1
const progress = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null
let progressRAF: number | null = null

// 轨道宽度参数
const total = computed(() => props.images.length)
const trackWidth = computed(() => total.value * 100 + '%')
// 每次移动一个子项宽度 = (100 / total)%
const translateX = computed(() => -currentIndex.value * (100 / total.value) + '%')
// 每个子项的 flex-basis
const itemFlexBasis = computed(() => (100 / total.value) + '%')

// 文本动画激活
const textActive = computed(() => {
    return progress.value > 0.1 && progress.value < 0.9;
})
// 视口mask透明度
const scrollOpacity = ref(0)


/**
 * 跳转到指定图片的索引
 *
 * @param index 图片索引
 */
function goTo(index: number): void {
    if (index === currentIndex.value) return
    currentIndex.value = index
    resetProgress()
    
    // 重置自动播放定时器, 保证进度与定时器同步
    if (props.autoplay && total.value > 1) {
        stopAutoplay()
        autoplayTimer = setInterval(next, props.interval)
    }
}

/**
 * 跳转到下一张图片
 */
function next(): void {
    goTo((currentIndex.value + 1) % total.value)
}

/**
 * 跳转到上一张图片
 */
// function prev(): void {
//     goTo((currentIndex.value - 1 + total.value) % total.value)
// }

/**
 * 重置进度并启动进度动画
 */
function resetProgress(): void {
    if (progressRAF) {
        cancelAnimationFrame(progressRAF)
        progressRAF = null
    }
    progress.value = 0
    const startTime = performance.now()
    const duration = props.interval
    
    const updateProgress = (now: number) => {
        const elapsed = now - startTime
        const p = Math.min(elapsed / duration, 1)
        progress.value = p
        if (p < 1) {
            progressRAF = requestAnimationFrame(updateProgress)
        }
        else {
            progressRAF = null
        }
    }
    progressRAF = requestAnimationFrame(updateProgress)
}

/**
 * 自动播放控制
 */
function startAutoplay(): void {
    if (props.autoplay && total.value > 1) {
        stopAutoplay()
        autoplayTimer = setInterval(next, props.interval)
    }
}

/**
 * 停止自动播放
 */
function stopAutoplay(): void {
    if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
    }
}

/**
 * 测量 Banner 的大小
 */
function updateBannerSize(): void {
    if (bannerRef.value) {
        const rect = bannerRef.value.getBoundingClientRect()
        bannerHeight.value = rect.height
        bannerWidth.value = rect.width
    }
}

/**
 * 监听滚动, 更新视口mask透明度
 */
function updateScrollOpacity(): void {
    const scrollY = window.scrollY
    // 从 0 渐变到 1
    scrollOpacity.value = bannerHeight.value > 0 ? Math.min(scrollY / bannerHeight.value, 1.0) : 0
}

// 监听 currentIndex 变化,  更新进度条的当前进度
watch(currentIndex, resetProgress)

onMounted(() => {
    startAutoplay()
    resetProgress() // 初始启动进度
    
    // 初始测量
    updateBannerSize()
    window.addEventListener('scroll', updateScrollOpacity)
    // 监听窗口变化, 更新高度
    window.addEventListener('resize', updateBannerSize)
})

onUnmounted(() => {
    stopAutoplay()
    if (progressRAF) {
        cancelAnimationFrame(progressRAF)
        progressRAF = null
    }
    
    window.addEventListener('scroll', updateScrollOpacity)
    window.removeEventListener('resize', updateBannerSize)
})
</script>

<template>
    <div class="banner-wrapper" ref="bannerRef">
        <!--图片轨道-->
        <div class="banner-track"
             :style="{ width: trackWidth, transform: `translateX(${translateX})` }"
        >
            <div class="banner-item"
                 v-for="(imageItem, idx) in images"
                 :key="idx"
                 :style="{ flexBasis: itemFlexBasis }"
            >
                <!--淡黑遮罩-->
                <div class="banner-mask"
                     :class="{ 'img--active': currentIndex === idx }"
                ></div>
                
                <!--图片-->
                <ShrinkImage
                    :imageItem=imageItem
                    :containerHeight="bannerHeight"
                    :containerWidth="bannerWidth"
                    :scale="0.1"
                    :active="currentIndex === idx"
                />
            </div>
        </div>
        
        <!--文本-->
        <div class="banner-text"
             :style="{ color: `rgba(255, 255, 255, ${1 - scrollOpacity})` }"
        >
            <float-up-text
                class="banner-text__title"
                :key="`title-${currentIndex}`"
                :active="textActive"
            >{{ props.images[currentIndex].title }}
            </float-up-text>
            <float-up-text
                class="banner-text__desc"
                :key="`desc-${currentIndex}`"
                :active="textActive"
            >{{ props.images[currentIndex].desc }}
            </float-up-text>
        </div>
        
        <!-- 指示器 -->
        <div class="banner-dots" v-if="total > 1">
            <!--圆点 / 进度条轨道-->
            <div
                class="dot-item"
                :class="{ 'dot--active': idx - 1 === currentIndex}"
                v-for="idx in total"
                :key="idx"
                @click="goTo(idx - 1)"
            >
                <!--进度条-->
                <div class="dot-progress"
                     :style="{ width: progress * 100 + '%' }"
                ></div>
            </div>
        </div>
        
        <!--视口常驻遮罩, 防止看不清文字-->
        <div class="banner-mask"
             style="background-color: var(--color-black-shadow);"
        >
        </div>
        <!--视口渐变遮罩, 下滑时逐渐隐藏banner-->
        <div class="banner-viewport-mask"
             :style="{ backgroundColor: `rgba(0, 0, 0, ${scrollOpacity})` }">
        </div>
        
        <!--点击滚动到下一视口-->
        <ScrollToNextViewport/>
    </div>
</template>

<style scoped>
.banner-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.banner-track {
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    
    transition: transform 1s cubic-bezier(0.85, 0.1, 0.1, 1);
    will-change: transform;
}

.banner-item {
    position: relative;
    flex: 0 0 auto;
    height: 100%;
}

.banner-viewport-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-index-lg);
    
    will-change: background-color;
}

.banner-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--z-index-lg);
    
    background-color: var(--color-black-mask);
    transition: background-color 1s linear;
    will-change: background-color;
}

.banner-mask.img--active {
    background-color: var(--color-transparent);
}

.banner-text {
    position: absolute;
    bottom: 15%;
    left: 48px;
    z-index: var(--z-index-middle);
    
    color: var(--color-white);
    line-height: 1.2;
}

.banner-text__title {
    font-size: var(--font-size-display);
}

.banner-text__desc {
    font-size: var(--font-size-large);
}

.banner-dots {
    position: absolute;
    bottom: 10%;
    left: 48px;
    height: 10px;
    
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 32px;
    
    z-index: var(--z-index-middle);
}

/* 未激活-圆点 */
.dot-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 10px;
    
    /* 5px = 10px * 50%, 这样 radius 既有圆的效果, 也不会出现椭圆情况  */
    border-radius: 5px;
    background: var(--color-white);
    transition: width 0.4s cubic-bezier(1, 0, 0, 1);
    
    cursor: pointer;
    flex-shrink: 0;
    overflow: hidden;
}

/* 激活-进度条轨道 */
.dot-item.dot--active {
    width: 48px;
    
    background: var(--color-white-shadow-light);
}

/* 激活-进度条 */
.dot-progress {
    width: 100%;
    height: 100%;
    
    border-radius: 5px;
    background: var(--color-white);
    transition: none;
}
</style>
