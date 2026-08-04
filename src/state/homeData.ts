import {ref} from 'vue'
import type {BannerImageItem, ZoomImageItem} from '@/types/item'
import {createBannerImageItem, createZoomImageItem} from '@/composables/item'
import {type HomeTextSection, homeTexts, homeBanners, homeZooms} from '@/data/home.config'


export const homeData = {
    title: ref(''),
    subtitle: ref(''),
    sections: ref<HomeTextSection[]>([]),
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
            Promise.all(homeBanners.map(item =>
                createBannerImageItem({
                    src: item.src,
                    title: item.title,
                    desc: item.desc,
                    offsetY: item.offsetY
                })
            )),
            Promise.all(homeZooms.map(item =>
                createZoomImageItem({
                    src: item.src,
                    title: item.title,
                    desc: item.desc,
                    baseSize: item.baseSize,
                    layout: item.layout
                })
            ))
        ])

        homeData.title.value = homeTexts.title
        homeData.subtitle.value = homeTexts.subtitle
        homeData.sections.value = homeTexts.sections
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
