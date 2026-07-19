<script setup lang="ts">
import {ref, watch, nextTick} from 'vue'
import {transitionState} from '@/state/transition'


const isEntered = ref(false)
const isExiting = ref(false)

watch(() => transitionState.active, (val) => {
    if (val) {
        isEntered.value = false
        isExiting.value = false
        nextTick(() => {
            requestAnimationFrame(() => {
                isEntered.value = true
            })
        })
    }
}, {immediate: true})

watch(() => transitionState.loaded, (val) => {
    if (val) {
        isExiting.value = true
    }
})

function onExitTransitionEnd() {
    if (isExiting.value) {
        transitionState.active = false
        isExiting.value = false
        transitionState.loaded = false
    }
}
</script>

<template>
    <div class="page-transition" v-if="transitionState.active">
        <!--文本边框-->
        <div class="edge">
            <div
                class="page-transition-inner"
                :class="{
                    'is-enter': isEntered && !isExiting,
                    'is-exit': isExiting
                }"
                @transitionend="onExitTransitionEnd"
            >
                {{ transitionState.text }}
            </div>
        </div>
        
        <!-- 伪进度条 -->
        <div class="progress-track">
            <div class="progress-bar"></div>
        </div>
    </div>
</template>

<style scoped>
.page-transition {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: var(--z-index-top);
    background: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
}

.edge {
    overflow: hidden;
}

.page-transition-inner {
    color: var(--color-black);
    font-size: var(--font-size-display-xlarge);
    font-weight: 500;
    letter-spacing: 0.1em;
    transform: translateY(100%);
    transition: transform 1.2s cubic-bezier(0.70, 0.1, 0.1, 1);
}

.page-transition-inner.is-enter {
    transform: translateY(0);
}

.page-transition-inner.is-exit {
    transform: translateY(-100%);
}

.progress-track {
    position: absolute;
    bottom: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 30vw;
    height: 2px;
    
    background: var(--color-black-shadow);
    overflow: hidden;
    border-radius: 2px;
}

.progress-bar {
    width: 33%;
    height: 100%;
    
    background: var(--color-black);
    border-radius: 2px;
    
    animation: progress-slide 1.2s cubic-bezier(0.70, 0.1, 0.1, 1) infinite;
}

@keyframes progress-slide {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(300%);
    }
}
</style>
