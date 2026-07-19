<script setup lang="ts">
import {ref} from 'vue'
import {ZoomImage} from '@/components/image'
import {ScrollToDetail} from '@/components/scroll'
import type {ZoomImageItem} from '@/types/item'


const props = withDefaults(defineProps<{
    image: ZoomImageItem
    interactive?: boolean
}>(), {
    interactive: true
})

const showDetail = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

/**
 * 更新鼠标位置
 *
 * @param e 鼠标事件
 */
function updatePosition(e: MouseEvent): void {
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    mouseX.value = e.clientX - rect.left
    mouseY.value = e.clientY - rect.top
}
</script>

<template>
    <component
        class="image-card"
        :class="{ interactive: interactive }"
        :is="interactive ? 'router-link' : 'div'"
        :to="interactive ? `/work/${image.title}` : undefined"
    >
        <div class="image-card-inner"
             @mouseenter="showDetail = true"
             @mouseleave="showDetail = false"
             @mousemove="updatePosition"
             :style="{flexDirection: image.layout}"
        >
            <!--文本(横图用: row排版)-->
            <div class="card-text"
                 v-if="image.layout === 'row'"
            >
                <div class="title">{{ image.title }}</div>
                <div class="desc"
                     :class="{'desc--visible': showDetail}"
                >{{ image.desc }}
                </div>
            </div>
            
            <!--图片-->
            <ZoomImage :imageItem="image" :isHover="showDetail"/>
            
            <!--文本(竖图用: column排版)-->
            <div class="card-text"
                 v-if="image.layout === 'column'"
                 :style="{width: props.image.baseSize}"
            >
                <div class="title">{{ image.title }}</div>
                <div class="desc"
                     :class="{'desc--visible': showDetail}"
                >{{ image.desc }}
                </div>
            </div>
        </div>
        
        <!--滚动图标-->
        <ScrollToDetail
            v-if="interactive"
            class="scroll-detail"
            :class="{'scroll-detail--visible': showDetail}"
            :workName="image.title"
            :style="{
                top: mouseY + 'px',
                left: mouseX + 'px'
            }"
        />
    </component>
</template>

<style scoped>
.image-card {
    position: relative;
    display: inline-block;
}

.image-card.interactive{
    cursor: none;
}

.image-card-inner {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1vw;
}

.card-text {
    flex: 1;
    letter-spacing: 0.25rem;
}

.title {
    color: var(--color-black);
    font-size: var(--font-size-h1);
    font-weight: 400;
}

.desc {
    color: var(--color-black-light);
    font-size: var(--font-size-medium);
    white-space: pre-wrap;
    
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.desc--visible {
    opacity: 1;
    transform: translateY(0);
}

.scroll-detail {
    position: absolute;
    /* top 和 left 在 template 中动态绑定 */
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    pointer-events: none;
    
    transition: transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.scroll-detail--visible {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
}
</style>
