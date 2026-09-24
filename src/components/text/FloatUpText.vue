<script setup lang="ts">
withDefaults(defineProps<{
    active: boolean
}>(), {
    active: false,
})

</script>

<template>
    <div class="float-up-text-wrapper">
        <div class="float-up-text"
             :class="{ 'is-active': active }"
        >
            <slot/>
        </div>
    </div>
</template>

<style scoped>
.float-up-text-wrapper {
    overflow: hidden;
}

.float-up-text {
    transform: translateY(100%);
    
    transition: transform 1s cubic-bezier(0.70, 0.1, 0.1, 1),
    opacity 0.6s cubic-bezier(0.85, 0.1, 0.1, 1);
    will-change: transform, opacity;
}

.float-up-text.is-active {
    transform: translateY(0);
}
</style>
