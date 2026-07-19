<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {EndBar, ImageCard, TopBar} from "@/components/common";
import {AutoFloatUpText, ImageFillText, MarqueeText} from '@/components/text'
import type {ZoomImageItem} from "@/types/item";
import {createZoomImageItem} from "@/composables/item";
import {seriesConfigs} from '@/data/series.config'


const route = useRoute()


const currentSeriesConfig = computed(() => {
    return seriesConfigs.find(c => c.name === route.params.name)
})
const titleImageSrc = computed(() => {
    const config = currentSeriesConfig.value
    if (!config) return ''
    return new URL(config.title_image_src, import.meta.url).href
})
const worksTitleList = computed(() => {
    const config = currentSeriesConfig.value
    if (!config) return ''
    return config.works.map(w => `《${w.title}》`).join('、')
})
const zoomImages = ref<ZoomImageItem[]>([])

/**
 * 构建图片ZoomImageItem对象
 */
async function buildWorks(): Promise<void> {
    if (!currentSeriesConfig.value) {
        zoomImages.value = []
        return
    }
    
    zoomImages.value = await Promise.all(
        currentSeriesConfig.value.works.map(w =>
            createZoomImageItem({
                src: new URL(w.src, import.meta.url).href,
                title: w.title,
                desc: w.desc,
                baseSize: w.baseSize,
                layout: w.layout
            })
        )
    )
}

/**
 * 设置标题
 */
function setTitle(): void {
    document.title = `Gallery - ${route.params.name}`
}

watch(() => route.params.name, setTitle)
watch(() => route.params.name, buildWorks, {immediate: true})

onMounted(setTitle)
</script>

<template>
    <TopBar :static="true"/>
    
    <body>
        <section class="section-text">
            <AutoFloatUpText class="section-text-title">
                <ImageFillText :src="titleImageSrc"
                >{{ currentSeriesConfig.title }}
                </ImageFillText>
            </AutoFloatUpText>
            <AutoFloatUpText>
                <div class="section-text-desc">
                    <div class="desc-content">
                        {{ currentSeriesConfig.description }}
                    </div>
                    <div class="desc-tags">
                        <div class="tag-item-title">
                            <div>关键词</div>
                            <div>包含作品</div>
                        </div>
                        <div class="tag-item-content">
                            <div>{{ currentSeriesConfig.keywords }}</div>
                            <div>{{ worksTitleList }}</div>
                        </div>
                    </div>
                </div>
            </AutoFloatUpText>
        </section>
        <section class="section-work">
            <AutoFloatUpText>
                <MarqueeText>
                    WORK&nbsp;•&nbsp;
                </MarqueeText>
            </AutoFloatUpText>
            <div class="work-area">
                <ImageCard
                    v-for="(image, idx) in zoomImages"
                    :key="idx"
                    :image="image"
                    :interactive="false"
                />
            </div>
        </section>
    </body>
    
    <EndBar/>
</template>

<style scoped>
.section-text {
    padding: 0 48px;
    color: var(--color-black);
}

.section-text-title {
    padding: 3rem 0;
    
    font-size: var(--font-size-display-xlarge);
    font-weight: 500;
    letter-spacing: 0.5rem;
}

.section-text-desc {
    display: flex;
    gap: 10rem;
}

.desc-content {
    flex: 1.5;
    font-size: var(--font-size-large);
}

.desc-tags {
    flex: 1;
    font-size: var(--font-size-medium);
    font-weight: 300;
    
    display: flex;
    gap: 3rem;
}

.tag-item-title {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 1rem;
}

.tag-item-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1rem;
}

.tag-item-content > :nth-child(2) {
    /* 抵消书名号的缩进(全角字符) */
    text-indent: -0.5rem;
}

.section-work {
    padding: 5vw 0;
}

.work-area {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    gap: 4vw;
    
    padding: 0 5vw;
}
</style>
