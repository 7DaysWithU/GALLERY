<script setup lang="ts">
defineProps<{
    length: number
}>()
</script>

<template>
    <div v-for="idx in Array.from({ length: length }, (_, idx) => idx)">文本{{ idx }}</div>
</template>

<style scoped>

</style>