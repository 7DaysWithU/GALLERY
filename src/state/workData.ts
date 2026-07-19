import {ref, shallowRef} from 'vue'
import type {ZoomImageItem} from '@/types/item'
import {createZoomImageItem} from '@/composables/item'
import {type SeriesConfig, seriesConfigs} from '@/data/series.config'
import {transitionState} from './transition'


export const workData = {
    currentSeriesConfig: shallowRef<SeriesConfig | null>(null),
    zoomImages: shallowRef<ZoomImageItem[]>([]),
    titleImageSrc: ref(''),
    worksTitleList: ref(''),
    loading: ref(false),
    error: ref<Error | null>(null)
}


/**
 * 将相对路径转换为绝对 URL
 *
 * @param relativePath 相对路径
 * @returns 绝对 URL
 */
function resolveAssetPath(relativePath: string): string {
    return new URL(relativePath, import.meta.url).href
}

/**
 * 预加载单个图片(真正下载到浏览器缓存)
 *
 * @param src 图片 URL
 */
function preloadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
        if (!src) {
            resolve()
            return
        }
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve() // 即使失败也不阻塞
        img.src = src
    })
}

/**
 * 批量预加载图片
 *
 * @param urls 图片 URL 数组
 */
async function preloadImages(urls: string[]): Promise<void> {
    const validUrls = urls.filter(Boolean)
    if (validUrls.length === 0) return
    await Promise.allSettled(validUrls.map(preloadImage))
}

/**
 * 加载作品数据
 *
 * @param seriesName 系列名
 */
export async function loadWorkData(seriesName: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 5000))

    // 防止重复加载
    if (workData.loading.value) return
    workData.loading.value = true

    // 重置错误
    workData.error.value = null

    try {
        // 1. 查找系列配置
        const config = seriesConfigs.find(c => c.name === seriesName)
        workData.currentSeriesConfig.value = config

        // 2. 准备所有图片 URL
        const imageUrls = config.works.map(w => resolveAssetPath(w.src))
        const titleImageUrl = resolveAssetPath(config.title_image_src)

        // 3. 创建 ZoomImageItem(数据准备)
        workData.zoomImages.value = await Promise.all(
            config.works.map(w =>
                createZoomImageItem({
                    src: resolveAssetPath(w.src),
                    title: w.title,
                    desc: w.desc,
                    baseSize: w.baseSize,
                    layout: w.layout
                })
            )
        )

        // 4. 存储标题图片和作品标题列表
        workData.titleImageSrc.value = titleImageUrl
        workData.worksTitleList.value = config.works
            .map(w => `《${w.title}》`)
            .join('、')

        // 5. 预加载所有图片(真正下载到缓存)
        const allImages = [titleImageUrl, ...imageUrls]
        await preloadImages(allImages)

        // 6. 清除错误
        workData.error.value = null

    }
    catch (err) {
        console.error('[loadWorkData] 加载失败:', err)
        workData.error.value = err instanceof Error ? err : new Error(String(err))
        // 加载失败也要让过渡层消失，避免卡死
    }
    finally {
        workData.loading.value = false
        // 数据加载完成(无论成功或失败)，触发过渡层退出
        transitionState.loaded = true
    }
}
