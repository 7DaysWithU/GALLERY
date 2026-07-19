<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'


const props = withDefaults(defineProps<{
    once?: boolean
}>(), {
    once: true
})

const elRef = ref<HTMLElement | null>(null)
const internalActive = ref(false)
let observer: IntersectionObserver | null = null
let hasTriggered = false

onMounted(() => {
    if (!elRef.value) return
    
    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                // 进入视口
                if (!props.once || !hasTriggered) {
                    internalActive.value = true
                    if (props.once) {
                        hasTriggered = true
                        observer?.unobserve(elRef.value!)
                        observer?.disconnect()
                        observer = null
                    }
                }
            }
            else {
                // 离开视口时, 如果 once=false 则取消激活
                if (!props.once) {
                    internalActive.value = false
                }
            }
        },
        {
            threshold: 0,
            rootMargin: '0px 0px -100px 0px'  // 底部提前 50px 触发
        }
    )
    observer.observe(elRef.value)
})

onUnmounted(() => {
    observer?.disconnect()
    observer = null
})
</script>

<template>
    <div class="auto-float-up-text-wrapper"
         ref="elRef"
    >
        <div class="auto-float-up-text"
             :class="{ 'is-active': internalActive }">
            <slot/>
        </div>
    </div>
</template>

<style scoped>
.auto-float-up-text-wrapper{
    overflow: hidden;
}

.auto-float-up-text {
    transform: translateY(100%);
    opacity: 0;
    
    transition: transform 1.2s cubic-bezier(0.70, 0.1, 0.1, 1),
    opacity 0.6s cubic-bezier(0.85, 0.1, 0.1, 1);
    will-change: transform, opacity;
}

.auto-float-up-text.is-active {
    transform: translateY(0);
    opacity: 1;
}
</style>
