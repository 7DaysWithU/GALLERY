import type {BannerImageItem, ZoomImageItem} from '@/types/item'


/**
 * 从图片 URL 获取图片的自然宽高
 *
 * @param src 图片 URL
 * @returns 图片宽度, 图片高度
 */
function getImageSize(src: string): Promise<{
    width: number;
    height: number
}> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
            resolve({width: img.naturalWidth, height: img.naturalHeight})
        }
        img.onerror = () => {
            reject(new Error(`Failed to load image: ${src}`))
        }
        img.src = src
    })
}

/**
 * 创建 BannerImageItem 对象
 * 自动读取图片宽高, 计算 ratio
 *
 * @param params 配置对象
 * @param params.src 图片 URL(必填)
 * @param params.title 图片标题(可选)
 * @param params.desc 图片描述(可选)
 * @param params.initialScale 额外放大系数(可选, 默认 0)
 * @param params.offsetX X 轴偏移(可选, 默认 0)
 * @param params.offsetY Y 轴偏移(可选, 默认 0)
 */
export async function createBannerImageItem(params: {
    src: string
    title?: string
    desc?: string
    initialScale?: number
    offsetX?: number
    offsetY?: number
}): Promise<BannerImageItem> {
    const {width, height} = await getImageSize(params.src)
    return {
        src: params.src,
        width,
        height,
        ratio: width / height,
        title: params.title ?? '',
        desc: params.desc ?? '',
        initialScale: params.initialScale ?? 0,
        offsetX: params.offsetX ?? 0,
        offsetY: params.offsetY ?? 0
    }
}

/**
 * 创建 ZoomImageItem 对象
 * 自动读取图片宽高, 计算 ratio
 *
 * @param params 配置对象
 * @param params.src 图片 URL(必填)
 * @param params.baseSize 基准高度(必选, 默认 '10vh')
 * @param params.layout 布局方向(可选, 默认通过ratio严格判断)
 * @param params.title 图片标题(可选)
 * @param params.desc 图片描述(可选)
 * @param params.initialScale 额外放大系数(可选, 默认 0)
 */
export async function createZoomImageItem(params: {
    src: string,
    baseSize: string,
    layout?: 'row' | 'column'
    title?: string
    desc?: string
    initialScale?: number
}): Promise<ZoomImageItem> {
    const {width, height} = await getImageSize(params.src)
    const ratio = width / height
    return {
        src: params.src,
        width,
        height,
        ratio: ratio,
        layout: params.layout ?? (ratio > 1 ? 'row' : 'column'),
        baseSize: params.baseSize,
        title: params.title ?? '',
        desc: params.desc ?? '',
        initialScale: params.initialScale ?? 0
    }
}
