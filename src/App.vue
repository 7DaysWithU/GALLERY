<script setup lang="ts">
import {watch} from 'vue'
import {PageTransition} from '@/components/common'
import {transitionState} from '@/state/transition'


watch(() => transitionState.active, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
}, {immediate: true})
</script>

<template>
    <PageTransition/>
    <router-view v-if="!transitionState.active"/>
</template>
