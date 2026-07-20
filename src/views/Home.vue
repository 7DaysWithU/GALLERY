<script setup lang="ts">
import {computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {TopBar, Banner, ImageCard, EndBar} from "@/components/common";
import {RevealText, MarqueeText, AutoFloatUpText} from '@/components/text'
import {homeData, loadHomeData} from '@/state/homeData'


const route = useRoute()

const loaded = computed(() => homeData.loaded.value)
const bannerImages = homeData.bannerImages
const zoomImages = homeData.zoomImages

onMounted(async () => {
    await loadHomeData()
    
    // 防止只停在页面顶部, 不滚动到指定id
    if (route.hash) {
        // 延迟一小段时间确保元素已渲染
        setTimeout(() => {
            const el = document.querySelector(route.hash)
            if (el) {
                el.scrollIntoView({behavior: 'smooth'})
            }
        }, 100)
    }
})
</script>

<template>
    <TopBar v-if="loaded"/>
    
    <body v-if="loaded">
        <section class="section-banner">
            <Banner :images="bannerImages"/>
        </section>
        <section class="selection-text">
            <div class="selection-text-title">
                <AutoFloatUpText class="title-box-wrapper">
                    <div class="title-box">
                        <div>画廊</div>
                        <div class="title-icon">©</div>
                        <div class="title-icon">❤</div>
                    </div>
                    <div>GALLERY</div>
                </AutoFloatUpText>
            </div>
            <div class="selection-text-content">
                <RevealText is-title>
                    欢迎来到 GALLERY！
                </RevealText>
                <RevealText>
                    一些瞬间, 被悄悄印成卡片
                </RevealText>
                <RevealText>
                    斑斓的, 沉默的, 都变成轻巧的纸
                </RevealText>
                <RevealText>
                    海在远方, 故事在指尖
                </RevealText>
                <RevealText>
                    这里没有终点, 只有翻页的声音
                </RevealText>
            </div>
            <div class="selection-text-content">
                <RevealText is-title>
                    这是一份电子纪念册
                </RevealText>
                <RevealText>
                    从一艘舰, 到一片海
                </RevealText>
                <RevealText>
                    从几何的沉默, 到蓝调时刻
                </RevealText>
                <RevealText>
                    这些明信片, 和你同走过一座城
                </RevealText>
                <RevealText>
                    剩下的, 交给你来翻阅
                </RevealText>
            </div>
        </section>
        <section class="section-work" id="work">
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
                />
            </div>
        </section>
    </body>
    
    <EndBar v-if="loaded"/>
</template>

<style scoped>
.section-banner {
    width: 100%;
    height: 100vh;
}

.selection-text {
    padding: 100px 0 0 5vw;
}

.selection-text-title {
    padding-bottom: 5vh;
    font-size: var(--font-size-display);
    font-weight: 700;
    line-height: 1;
    
    overflow: hidden;
}

.title-box-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.title-box {
    position: relative;
    display: inline-block;
}

.title-icon {
    position: absolute;
    top: 0;
    left: 100%;
    font-size: var(--font-size-h3);
}

.title-icon:nth-child(3) {
    transform: translateY(110%);
    font-size: var(--font-size-h4);
}

.selection-text-content {
    padding: 5vh 0 0 40vw;
    font-size: var(--font-size-h1);
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
