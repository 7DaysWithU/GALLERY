<script setup lang="ts">

</script>

<template>
    <div class="scroll-wrapper">
        <svg class="svg--inside"
             viewBox="0 0 29 42" width="29" height="42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.668 38.522 13.621 0" stroke-width="4"></path>
            <path d="M28.54 22.387c-5.18-.005-14.868 7.837-14.868 18.622" stroke-width="4"></path>
            <path d="M0 22.353c4.748.007 13.66 8.715 13.672 18.656" stroke-width="4"></path>
        </svg>
    </div>
</template>

<style scoped>
.scroll-wrapper {
    position: relative;
    display: block;
    width: 100px;
    height: 100px;
    
    background-color: var(--color-black);
    border-radius: 50%;
    overflow: hidden;
}

.svg--inside {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    will-change: transform;
    
    stroke: var(--color-white);
    animation: drop-rise 1.5s infinite;
}

@keyframes drop-rise {
    0% {
        transform: translate(-50%, -50%) rotate(-90deg);
        opacity: 1;
        animation-timing-function: cubic-bezier(0.65, 0.10, 0.10, 1.00);
    }
    40% {
        transform: translate(111%, -50%) rotate(-90deg); /* 下落到完全离开底部 */
        opacity: 0;
        animation-timing-function: linear;
    }
    41% {
        transform: translate(-211%, -50%) rotate(-90deg); /* 瞬移到顶部上方 */
        opacity: 0;
        animation-timing-function: cubic-bezier(0.00, 0.00, 0.10, 1.00);
    }
    100% {
        transform: translate(-50%, -50%) rotate(-90deg);
        opacity: 1;
    }
}
</style>
