import {ref} from 'vue'
import type {BannerImageItem, ZoomImageItem} from '@/types/item'
import {createBannerImageItem, createZoomImageItem} from '@/composables/item'


export const homeData = {
    bannerImages: ref<BannerImageItem[]>([]),
    zoomImages: ref<ZoomImageItem[]>([]),
    loaded: ref(false),
    loading: ref(false),
}

/**
 * 加载首页图片数据
 */
export async function loadHomeData(): Promise<void> {
    if (homeData.loaded.value || homeData.loading.value) return
    homeData.loading.value = true

    try {
        // 复用你 Home.vue 中的图片数据配置
        const [banners, zooms] = await Promise.all([
            Promise.all([
                createBannerImageItem({
                    src: '/postcards/original/132合肥舰_逐浪.jpg',
                    title: '逐浪',
                    desc: '钢铁之上, 浪花在燃烧'
                }),
                createBannerImageItem({
                    src: '/postcards/original/几何的沉默_仰望.jpg',
                    title: '仰望',
                    desc: '穹顶撒下光辉'
                }),
                createBannerImageItem({
                    src: '/postcards/original/山海印象_莱山.jpg',
                    title: '黄海明珠',
                    desc: '黄海海上明珠, 黄海城市花园'
                }),
                createBannerImageItem({
                    src: '/postcards/original/拾光_微醺张裕.jpg',
                    title: '微醺张裕',
                    desc: '一杯酒, 一座城的微光'
                }),
                createBannerImageItem({
                    src: '/postcards/original/海_钓鱼佬.jpg',
                    title: '钓鱼佬',
                    desc: '等一个咬钩的黄昏'
                }),
                createBannerImageItem({
                    src: '/postcards/original/海滨叙事诗_童话.jpg',
                    title: '渔人码头',
                    desc: '欧式屋檐下, 海风藏了故事',
                    offsetY: -3
                }),
                createBannerImageItem({
                    src: '/postcards/original/蓝调时刻_暴雨.jpg',
                    title: '暴雨',
                    desc: '蓝调在雨中溺了, 又浮起'
                }),
                createBannerImageItem({
                    src: '/postcards/original/雅顾_猛虎.jpg',
                    title: '猛虎',
                    desc: '猛虎上树',
                    offsetY: 1
                }),
            ]),
            Promise.all([
                createZoomImageItem({
                    src: '/postcards/original/海滨叙事诗_初见.jpg',
                    title: '海滨叙事诗',
                    desc: '海风拂过, 初见即是永远',
                    baseSize: '50vw'
                }),
                createZoomImageItem({
                    src: '/postcards/original/海_钓鱼佬.jpg',
                    title: '海',
                    desc: '等一个咬钩的黄昏',
                    baseSize: '40vw',
                    layout: 'column'
                }),
                createZoomImageItem({
                    src: '/postcards/original/拾光_花海.jpg',
                    title: '拾光',
                    desc: '花开无声, 时光有痕',
                    baseSize: '45vw',
                    layout: 'column'
                }),
                createZoomImageItem({
                    src: '/postcards/original/蓝调时刻_暴雨.jpg',
                    title: '蓝调时刻',
                    desc: '蓝调在雨中溺了, 又浮起',
                    baseSize: '70vw'
                }),
                createZoomImageItem({
                    src: '/postcards/original/132合肥舰_归港.jpg',
                    title: '132合肥舰',
                    desc: '钢铁巨兽, 终有归期',
                    baseSize: '28vw'
                }),
                createZoomImageItem({
                    src: '/postcards/original/几何的沉默_回响.jpg',
                    title: '几何的沉默',
                    desc: '几何的沉默里, 有回声在游荡',
                    baseSize: '26vw'
                }),
                createZoomImageItem({
                    src: '/postcards/original/雅顾_猛虎.jpg',
                    title: '雅顾',
                    desc: '虚焦带来的油画质感',
                    baseSize: '25vw'
                }),
                createZoomImageItem({
                    src: '/postcards/original/山海印象_牟平.jpg',
                    title: '山海印象',
                    desc: '仙境海岸, 品重烟台',
                    baseSize: '72vw'
                }),
            ])
        ])

        homeData.bannerImages.value = banners
        homeData.zoomImages.value = zooms
        homeData.loaded.value = true
    }
    catch (error) {
        console.error('Failed to load HomePage images:', error)
    }
    finally {
        homeData.loading.value = false
    }
}
