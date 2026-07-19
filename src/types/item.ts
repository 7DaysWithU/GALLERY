export interface BannerImageItem {
    // 图片路径
    src: string
    // 原图宽度 (px)
    width: number
    // 原图高度 (px)
    height: number
    // 图片宽高比 (= width / height)
    ratio: number
    // 图片标题
    title?: string
    // 图片描述
    desc?: string
    // 额外放大系数 (0~1), 在基于容器高度计算的基础缩放上再放大, 默认为 0
    initialScale?: number
    // 图片 X 偏移
    offsetX?: number
    // 图片 Y 偏移
    offsetY?: number
}

export interface ZoomImageItem {
    // 图片路径
    src: string
    // 原图宽度 (px)
    width: number
    // 原图高度 (px)
    height: number
    // 图片宽高比 (= width / height)
    ratio: number
    // 图片布局(横图或竖图)
    // 虽然可以通过 ratio 来严格判断, 但为了布局美观, 支持手动设置
    // 默认值为通过 ratio 判断的结果. ratio > 1 时为 column, ratio <= 1 时为 row
    layout: 'row' | 'column'
    // 基础宽度 (单位任意)
    baseSize: string
    // 图片标题
    title?: string
    // 图片描述
    desc?: string
    // 额外放大系数 (0~1), 在基于容器高度计算的基础缩放上再放大, 默认为 0
    initialScale?: number
}
