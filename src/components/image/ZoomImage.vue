<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, nextTick} from 'vue'
import type {ZoomImageItem} from '@/types/item'


const props = withDefaults(defineProps<{
    imageItem: ZoomImageItem
    isHover: boolean             // 是否处于 hover 状态
    triggerRatio?: number        // 触发放大的 Y 方向比例 (0~1)
    scale?: number               // 放大比例, 默认 0.1
}>(), {
    triggerRatio: 0.4,
    scale: 0.05,
})

const elRef = ref<HTMLElement | null>(null)
const isInView = ref(false)
const offsetY = ref(0)

// 节流锁, 避免频繁触发滚动处理
// 第一次节流: ticking. 防止滚动事件频繁被触发
// 第二次节流: 比对新旧 isInView 的值, 阻止未改变状态时的处理请求
let ticking = false
// 确保组件卸载时精准取消滚动监听
let scrollHandler: (() => void) | null = null

// 计算当前缩放值(固定倍率, 不动态叠加)
const currentScale = computed(() => {
    if (!isInView.value) return 1
    // 进入视口的基础放大倍率
    const baseScale = 1 + props.scale + props.imageItem.initialScale
    // hover 额外放大(如果启用), 最终为 (1+scale)^2
    if (props.isHover) return baseScale * baseScale
    return baseScale
})

/**
 * 基于滚动位置更新随动偏移量
 */
function updateOffset(): void {
    if (!elRef.value || !isInView.value) {
        if (offsetY.value !== 0) {
            offsetY.value = 0
        }
        return
    }
    const rect = elRef.value.getBoundingClientRect()
    const viewHeight = window.innerHeight
    const centerY = (rect.top + rect.height / 2) / viewHeight
    const range = ((currentScale.value - 1) / 2) * 100 //百分比
    let newOffset = (centerY - 0.5) * 2 * range
    newOffset = Math.min(Math.max(newOffset, -range), range)
    if (Math.abs(newOffset - offsetY.value) > 0.001) {
        offsetY.value = newOffset
    }
}

/**
 * 检测触发点是否在视口内, 并更新随动偏移
 */
function checkInView(): void {
    if (!elRef.value) return
    const rect = elRef.value.getBoundingClientRect()
    const triggerY = rect.top + rect.height * props.triggerRatio
    const viewHeight = window.innerHeight
    const newIsInView = triggerY >= 0 && triggerY <= viewHeight
    
    // 状态发生改变
    if (newIsInView !== isInView.value) {
        isInView.value = newIsInView
        // 原先不在视口, 现在在视口: 更新随动偏移
        if (isInView.value) {
            updateOffset()
        }
        // 原先在视口, 现在不在视口: 随动停止, 重置偏移量
        else {
            offsetY.value = 0
        }
    }
    // 状态没变
    else if (isInView.value) {
        updateOffset()
    }
}

/**
 * 滚动节流处理
 */
function handleScroll(): void {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            checkInView()
            ticking = false
        })
        ticking = true
    }
}

onMounted(() => {
    nextTick(() => {
        checkInView()
    })
    
    scrollHandler = handleScroll
    window.addEventListener('scroll', scrollHandler)
    window.addEventListener('resize', checkInView)
})

onUnmounted(() => {
    if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler)
    }
    window.removeEventListener('resize', checkInView)
})
</script>

<template>
    <div class="zoom-image-wrapper"
         ref="elRef"
         :style="{
             width: imageItem.baseSize,
             aspectRatio: imageItem.ratio
         }"
    >
        <img
            class="zoom-image"
            :src="imageItem.src"
            alt=""
            :style="{transform: `translateY(${offsetY}%) scale(${currentScale})`}"
        />
    </div>
</template>

<style scoped>
.zoom-image-wrapper {
    overflow: hidden;
}

.zoom-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    
    transition: transform 1.25s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: transform;
    transform-origin: center center;
}
</style>
