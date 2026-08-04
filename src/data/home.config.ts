export interface HomeTextSection {
    lines: HomeTextLine[]
}

export interface HomeTextLine {
    text: string
    isTitle: boolean
}

export interface HomeBannerItem {
    src: string
    title: string
    desc: string
    offsetY?: number
}

export interface HomeZoomItem {
    src: string
    title: string
    desc: string
    baseSize: string
    layout?: 'row' | 'column'
}

export const basePath = '/postcards/original/'

export const homeBanners: HomeBannerItem[] = [
    {
        src: basePath + '132合肥舰_逐浪.jpg',
        title: '逐浪',
        desc: '钢铁之上, 浪花在燃烧'
    },
    {
        src: basePath + '几何的沉默_仰望.jpg',
        title: '仰望',
        desc: '穹顶撒下光辉'
    },
    {
        src: basePath + '山海印象_莱山.jpg',
        title: '黄海明珠',
        desc: '黄海海上明珠, 黄海城市花园'
    },
    {
        src: basePath + '拾光_微醺张裕.jpg',
        title: '微醺张裕',
        desc: '一杯酒, 一座城的微光'
    },
    {
        src: basePath + '海_钓鱼佬.jpg',
        title: '钓鱼佬',
        desc: '等一个咬钩的黄昏'
    },
    {
        src: basePath + '海滨叙事诗_童话.jpg',
        title: '渔人码头',
        desc: '欧式屋檐下, 海风藏了故事',
        offsetY: -3
    },
    {
        src: basePath + '蓝调时刻_暴雨.jpg',
        title: '暴雨',
        desc: '蓝调在雨中溺了, 又浮起'
    },
    {
        src: basePath + '雅顾_猛虎.jpg',
        title: '猛虎',
        desc: '猛虎上树',
        offsetY: 1
    },
]

export const homeZooms: HomeZoomItem[] = [
    {
        src: basePath + '海滨叙事诗_初见.jpg',
        title: '海滨叙事诗',
        desc: '海风拂过, 初见即是永远',
        baseSize: '50vw'
    },
    {
        src: basePath + '海_钓鱼佬.jpg',
        title: '海',
        desc: '等一个咬钩的黄昏',
        baseSize: '40vw',
        layout: 'column'
    },
    {
        src: basePath + '拾光_花海.jpg',
        title: '拾光',
        desc: '花开无声, 时光有痕',
        baseSize: '45vw',
        layout: 'column'
    },
    {
        src: basePath + '蓝调时刻_暴雨.jpg',
        title: '蓝调时刻',
        desc: '蓝调在雨中溺了, 又浮起',
        baseSize: '70vw'
    },
    {
        src: basePath + '132合肥舰_归港.jpg',
        title: '132合肥舰',
        desc: '钢铁巨兽, 终有归期',
        baseSize: '28vw'
    },
    {
        src: basePath + '几何的沉默_回响.jpg',
        title: '几何的沉默',
        desc: '几何的沉默里, 有回声在游荡',
        baseSize: '26vw'
    },
    {
        src: basePath + '雅顾_猛虎.jpg',
        title: '雅顾',
        desc: '虚焦带来的油画质感',
        baseSize: '25vw'
    },
    {
        src: basePath + '山海印象_牟平.jpg',
        title: '山海印象',
        desc: '仙境海岸, 品重烟台',
        baseSize: '72vw'
    },
]

export const homeTexts = {
    title: '画廊',
    subtitle: 'GALLERY',
    sections: [
        {
            lines: [
                {text: '欢迎来到 GALLERY！', isTitle: true},
                {text: '一些瞬间, 被悄悄印成卡片', isTitle: false},
                {text: '斑斓的, 沉默的, 都变成轻巧的纸', isTitle: false},
                {text: '海在远方, 故事在指尖', isTitle: false},
                {text: '这里没有终点, 只有翻页的声音', isTitle: false}
            ]
        },
        {
            lines: [
                {text: '这是一份电子纪念册', isTitle: true},
                {text: '从一艘舰, 到一片海', isTitle: false},
                {text: '从几何的沉默, 到蓝调时刻', isTitle: false},
                {text: '这些明信片, 和你同走过一座城', isTitle: false},
                {text: '剩下的, 交给你来翻阅', isTitle: false}
            ]
        }
    ]
}
