<script setup lang="ts">
defineProps<{
    src: string     // 背景图片路径
}>()
</script>

<template>
    <div class="text-image-fill"
         :style="{ backgroundImage: `url(${src})` }"
    >
        <slot/>
    </div>
</template>

<style scoped>
.text-image-fill {
    background-size: cover;
    background-position: center;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
</style>
