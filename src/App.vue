<script setup lang="ts">
</script>

<template>
    <Suspense>
        <template #default>
            <router-view/>
        </template>
        
        <template #fallback>
            <!-- 加载中提示(可自定义) -->
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                Loading...
            </div>
        </template>
    </Suspense>
</template>
