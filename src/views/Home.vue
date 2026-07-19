<script setup lang="ts">
import {TopBar, Banner, ImageCard, EndBar} from "@/components/common";
import {RevealText, MarqueeText, AutoFloatUpText} from '@/components/text'
import type {BannerImageItem, ZoomImageItem} from "@/types/item";
import {createBannerImageItem, createZoomImageItem} from "@/composables/item";


const bannerImages: BannerImageItem[] = [
    await createBannerImageItem({
        src: 'src/assets/postcards/original/132合肥舰_逐浪.jpg',
        title: '逐浪',
        desc: '钢铁之上, 浪花在燃烧',
    }),
    await createBannerImageItem({
        src: 'src/assets/postcards/original/几何的沉默_仰望.jpg',
        title: '仰望',
        desc: '穹顶撒下光辉',
    }),
    await createBannerImageItem({
        src: 'src/assets/postcards/original/山海印象_莱山.jpg',
        title: '黄海明珠',
        desc: '黄海海上明珠, 黄海城市花园',
    }),
    await createBannerImageItem({
        src: 'src/assets/postcards/original/拾光_微醺张裕.jpg',
        title: '微醺张裕',
        desc: '一杯酒, 一座城的微光',
    }),
    await createBannerImageItem({
        src: 'src/assets/postcards/original/海_钓鱼佬.jpg',
        title: '钓鱼佬',
        desc: '等一个咬钩的黄昏',
    }),
    await createBannerImageItem({
        src: 'src/assets/postcards/original/海滨叙事诗_童话.jpg',
        title: '渔人码头',
        desc: '欧式屋檐下, 海风藏了故事',
        offsetY: -3
    }),
    await createBannerImageItem({
        src: 'src/assets/postcards/original/蓝调时刻_暴雨.jpg',
        title: '暴雨',
        desc: '蓝调在雨中溺了, 又浮起',
    }),
    await createBannerImageItem({
        src: 'src/assets/postcards/original/雅顾_猛虎.jpg',
        title: '猛虎',
        desc: '猛虎上树',
        offsetY: 1
    }),
]
const zoomImages: ZoomImageItem[] = [
    await createZoomImageItem({
        src: 'src/assets/postcards/original/海滨叙事诗_初见.jpg',
        title: '海滨叙事诗',
        desc: '海风拂过, 初见即是永远',
        baseSize: '50vw'
    }),
    await createZoomImageItem({
        src: 'src/assets/postcards/original/海_钓鱼佬.jpg',
        title: '海',
        desc: '等一个咬钩的黄昏',
        baseSize: '40vw',
        layout: 'column'
    }),
    await createZoomImageItem({
        src: 'src/assets/postcards/original/拾光_花海.jpg',
        title: '拾光',
        desc: '花开无声, 时光有痕',
        baseSize: '45vw',
        layout: 'column'
    }),
    await createZoomImageItem({
        src: 'src/assets/postcards/original/蓝调时刻_暴雨.jpg',
        title: '蓝调时刻',
        desc: '蓝调在雨中溺了, 又浮起',
        baseSize: '70vw'
    }),
    await createZoomImageItem({
        src: 'src/assets/postcards/original/132合肥舰_归港.jpg',
        title: '132合肥舰',
        desc: '钢铁巨兽, 终有归期',
        baseSize: '28vw'
    }),
    await createZoomImageItem({
        src: 'src/assets/postcards/original/几何的沉默_回响.jpg',
        title: '几何的沉默',
        desc: '几何的沉默里, 有回声在游荡',
        baseSize: '26vw'
    }),
    await createZoomImageItem({
        src: 'src/assets/postcards/original/雅顾_猛虎.jpg',
        title: '雅顾',
        desc: '虚焦带来的油画质感',
        baseSize: '25vw'
    }),
    await createZoomImageItem({
        src: 'src/assets/postcards/original/山海印象_牟平.jpg',
        title: '山海印象',
        desc: '仙境海岸, 品重烟台',
        baseSize: '72vw'
    })
]
</script>

<template>
    <TopBar/>
    
    <body>
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
    
    <EndBar/>
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
