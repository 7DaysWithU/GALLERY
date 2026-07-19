<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';


const props = withDefaults(defineProps<{
    once?: boolean;
    isTitle?: boolean;
}>(), {
    once: false,
    isTitle: false
});

const isVisible = ref(false);
const elRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let prevIntersecting = false;

const line1Ref = ref<SVGPathElement | null>(null);
const line2Ref = ref<SVGPathElement | null>(null);
const line3Ref = ref<SVGPathElement | null>(null);
const pathLengths = ref({line1: 0, line2: 0, line3: 0});

onMounted(() => {
    if (!elRef.value) return;
    const el = elRef.value;
    
    // 测算长度
    if (props.isTitle) {
        if (line1Ref.value) pathLengths.value.line1 = line1Ref.value.getTotalLength();
        if (line2Ref.value) pathLengths.value.line2 = line2Ref.value.getTotalLength();
        if (line3Ref.value) pathLengths.value.line3 = line3Ref.value.getTotalLength();
    }
    
    observer = new IntersectionObserver(
        ([entry]) => {
            const rect = entry.boundingClientRect;
            const rootBounds = entry.rootBounds;
            const viewportBottom = rootBounds ? rootBounds.bottom : window.innerHeight;
            const isIntersecting = entry.isIntersecting;
            
            if (isIntersecting && !prevIntersecting) {
                if (rect.bottom > viewportBottom) {
                    isVisible.value = true;
                    if (props.once) {
                        observer?.unobserve(el);
                    }
                }
            }
            else if (!isIntersecting && prevIntersecting) {
                if (rect.top > viewportBottom) {
                    if (!props.once) {
                        isVisible.value = false;
                    }
                }
            }
            prevIntersecting = isIntersecting;
        },
        {
            threshold: 0,
            rootMargin: '0px 0px -200px 0px' // 距离底部200px时执行动画
        }
    );
    observer.observe(el);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
    <div ref="elRef"
         class="reveal-text"
         :class="{ 'is-visible': isVisible }"
    >
        <!--标题箭头-->
        <svg class="title-svg"
             v-if="isTitle"
             viewBox="0 0 41 28.5"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
        >
            <!-- 横线：出现时无延迟(持续0.6s), 消失时长度延迟0.1s(持续0.3s), 颜色延迟0.4s(持续0.3s) -->
            <path
                ref="line1Ref"
                d="M0 14.9 H38.5"
                stroke-width="2.5"
                :style="{
                    'stroke': isVisible ? 'var(--color-orange)' : 'var(--color-transparent)',
                    'stroke-dasharray': pathLengths.line1,
                    'stroke-dashoffset': isVisible ? 0 : pathLengths.line1,
                    'transition': 'stroke-dashoffset 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19), stroke 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)',
                    'transition-delay': isVisible ? '0s, 0s' : '0.1s, 0.4s'
                }"
            />
            <!-- 右上斜线：出现延迟0.3s(持续0.6s), 消失无延迟(持续0.3s) -->
            <path
                ref="line2Ref"
                d="M22.4 0c0 5.2 7.8 14.9 18.6 14.9"
                stroke-width="2.5"
                :style="{
                    'stroke': isVisible ? 'var(--color-orange)' : 'var(--color-transparent)',
                    'stroke-dasharray': pathLengths.line2,
                    'stroke-dashoffset': isVisible ? 0 : -pathLengths.line2,
                    'transition': 'stroke-dashoffset 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), stroke 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)',
                    'transition-delay': isVisible ? '0.6s, 0.6s' : '0s, 0s'
                }"
            />
            <!-- 右下斜线：出现延迟0.3s(持续0.6s), 消失无延迟(持续0.3s) -->
            <path
                ref="line3Ref"
                d="M22.4 28.5c0-4.7 8.7-13.7 18.7-13.7"
                stroke-width="2.5"
                :style="{
                    'stroke': isVisible ? 'var(--color-orange)' : 'var(--color-transparent)',
                    'stroke-dasharray': pathLengths.line3,
                    'stroke-dashoffset': isVisible ? 0 : -pathLengths.line3,
                    'transition': 'stroke-dashoffset 0.6s cubic-bezier(0.215, 0.61, 0.355, 1), stroke 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)',
                    'transition-delay': isVisible ? '0.6s, 0.6s' : '0s, 0s'
                }"
            />
        </svg>
        <!-- 文字主体 -->
        <div class="text"
             :class="{'text-title': isTitle}"
        >
            <slot/>
        </div>
    </div>
</template>

<style scoped>
/*容器-初始态*/
.reveal-text {
    position: relative;
    white-space: nowrap;
    
    /*初始在左边50px*/
    transform: translateX(-50px);
    transition: transform 1s cubic-bezier(0.86, 0, 0.3, 1);
}

/*容器-滚动态*/
.reveal-text.is-visible {
    /*从X负位置回到0*/
    transform: translateX(0);
}

/*标题箭头-初始态*/
.title-svg {
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    
    width: 10.5vw;
    height: 8vh;
    margin-right: 8px;
    
    color: var(--color-transparent);
    transition: color 1s cubic-bezier(0.86, 0, 0.3, 1);
}

/*标题箭头-滚动态*/
.reveal-text.is-visible .title-svg {
    color: var(--color-orange);
}

/*文本-初始态*/
.text {
    font-weight: 300;
    color: transparent;
    background-image: linear-gradient(
        to right,
        var(--color-gray) 0%,
        var(--color-gray) 50%,
        var(--color-black) 50%,
        var(--color-black) 100%
    );
    background-size: 200% 100%;
    background-position: 0 0;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background-position 1s cubic-bezier(0.86, 0, 0.3, 1);
}

/*文本-滚动态*/
.reveal-text.is-visible .text {
    /*背景左移100%*/
    background-position: -100% 0;
}

.text-title {
    font-weight: 400;
}
</style>
