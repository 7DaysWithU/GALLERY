<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue'
import type {BannerImageItem} from '@/types/item'


const props = withDefaults(defineProps<{
    imageItem: BannerImageItem
    containerHeight: number
    containerWidth: number
    scale?: number              // 图片缩小比例
    active?: boolean            // 是否激活缩小状态
}>(), {
    scale: 0.1,
    active: false,
})

const internalActive = ref(false)

// 状态 B：缩小后的最终缩放值(基于容器宽高取最大值, 确保覆盖)
const targetScale = computed(() => {
    const { containerHeight, containerWidth, imageItem } = props
    if (containerHeight === 0 || containerWidth === 0 || !imageItem.height || !imageItem.width) return 1
    const scaleH = containerHeight / imageItem.height
    const scaleW = containerWidth / imageItem.width
    // 取最大值, 保证图片覆盖容器(类似 cover)
    let baseScale = Math.max(scaleH, scaleW)
    const extra = imageItem.initialScale ?? 0
    return baseScale * (1 + extra)
})

// 当前缩放：未激活时为放大状态 A, 激活时为缩小状态 B
const currentScale = computed(() => {
    if (!internalActive.value) {
        // 状态 A：初始放大(比状态 B 大 scale 倍)
        return targetScale.value / (1 - props.scale)
    } else {
        // 状态 B：缩小后的最终值
        return targetScale.value
    }
})

// 初次渲染时, 如果 active 为 true, 延迟触发过渡动画
onMounted(() => {
    if (props.active) {
        requestAnimationFrame(() => {
            internalActive.value = true
        })
    }
})

// 监听外部 active 变化
watch(() => props.active, (val) => {
    internalActive.value = val
})
</script>

<template>
    <div class="shrink-image-wrapper">
        <img
            class="shrink-image"
            :src="imageItem.src"
            alt=""
            :style="{
                transform: `translate(calc(-50% + ${imageItem.offsetX}%), calc(-50% + ${imageItem.offsetY}%)) scale(${currentScale})`
            }"
        />
    </div>
</template>

<style scoped>
.shrink-image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.shrink-image {
    position: absolute;
    top: 50%;
    left: 50%;
    
    display: block;
    width: auto;
    height: auto;
    max-width: none;
    max-height: none;
    
    transition: transform 5s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: transform;
    transform-origin: center center;
}
</style>
