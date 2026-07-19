<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref} from 'vue'


withDefaults(defineProps<{
    duration?: number
    direction?: 'left' | 'right'
}>(), {
    duration: 10,
    direction: 'left'
});

const wrapperRef = ref<HTMLElement | null>(null)
// 独立测量元素
const measureRef = ref<HTMLElement | null>(null)
// 字号, 默认10vw
const fontSize = ref('10vw')

let resizeObserver: ResizeObserver | null = null

/**
 * 自动调整字号
 *
 * @return: void
 */
function adjustFontSize(): void {
    if (!wrapperRef.value || !measureRef.value) return
    
    // 获得 100vw 的具体值
    const containerWidth = wrapperRef.value.clientWidth
    if (containerWidth === 0) return
    
    // 测量元素独立于滚动轨道, 不继承 flex 限制
    // 设置基准字号 100px
    measureRef.value.style.fontSize = '100px'
    
    // 获取文本的实际内容宽度(用 scrollWidth)
    const textWidth = measureRef.value.scrollWidth
    if (textWidth === 0) return
    
    // 目标宽度：容器宽度的 100%(尽量占满)
    // 计算比例
    const ratio = containerWidth / textWidth
    
    // 新字号
    let newSize = 100 * ratio
    // 安全限制
    if (newSize < 1) newSize = 1
    if (newSize > 1000) newSize = 1000
    
    fontSize.value = newSize + 'px'
}

/**
 * 刷新
 * 重新计算字号, 进行刷新. 只在 resize 触发时才执行
 *
 * @return: void
 */
function refresh(): void {
    nextTick(() => {
        requestAnimationFrame(() => {
            adjustFontSize()
        })
    })
}

onMounted(() => {
    refresh()
    if (window.ResizeObserver) {
        resizeObserver = new ResizeObserver(() => refresh())
        resizeObserver.observe(wrapperRef.value!)
    }
    window.addEventListener('resize', refresh)
})

onUnmounted(() => {
    resizeObserver?.disconnect()
    window.removeEventListener('resize', refresh)
})
</script>

<template>
    <div ref="wrapperRef"
         class="marquee-wrapper"
    >
        <div class="marquee-track"
             :class="`marquee-track-${direction}`"
             :style="{ 'animation-duration': duration + 's' }"
        >
            <div class="marquee-content"
                 :style="{ fontSize: fontSize}"
            >
                <slot/>
            </div>
            <div class="marquee-content"
                 :style="{ fontSize: fontSize }"
            >
                <slot/>
            </div>
        </div>
        
        <!-- 独立测量元素：与滚动轨道完全隔离, 不继承 flex 限制 -->
        <div ref="measureRef"
             class="measure-element"
             :style="{ fontSize: '100px' }"
        >
            <slot/>
        </div>
    </div>
</template>

<style scoped>
.marquee-wrapper {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
}

.marquee-track {
    display: flex;
    width: 200%;
}

/* 通过动态绑定使用 */
.marquee-track-left {
    animation: marquee-to-left linear infinite;
}
.marquee-track-right {
    animation: marquee-to-right linear infinite;
}

.marquee-content {
    flex: 0 0 50%;
    
    text-align: center;
    line-height: 1;
}

/* 测量用元素, 不可视, 也不继承任何 flex 限制, 可以自由伸展 */
.measure-element {
    position: absolute;
    left: -9999px;
    top: 0;
    
    visibility: hidden;
    white-space: nowrap;
}

@keyframes marquee-to-left {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

@keyframes marquee-to-right {
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
