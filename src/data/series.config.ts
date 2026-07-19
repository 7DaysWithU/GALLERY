export interface SeriesConfig {
    name: string                 // 系列名（对应路由参数）
    title: string                // 显示标题
    title_image_src: string      // 镂空标题所用图片的路径
    description: string          // 描述文本
    keywords: string             // 关键词
    works: {
        src: string           // 图片路径
        title: string
        desc: string
        baseSize: string
        layout?: 'row' | 'column'
    }[]
}

export const basePath = '/postcards/original/'

export const seriesConfigs: SeriesConfig[] = [
    {
        name: '海滨叙事诗',
        title: '海滨叙事诗',
        title_image_src: basePath + '海滨叙事诗_山海之城.jpg',
        description: '烟台的海岸线像一首写不完的诗。画面里有通向远方的路，也有像画框一样框住海天的建筑。这是一组让人想要深呼吸的照片，蓝调是它的底色，松弛感是它的节奏。每一帧都像是海风轻轻翻过的一页。本系列图片集中摄于滨海路沿途，涵盖渔人码头、黄海明珠、滨海广场等地。',
        keywords: '浪漫、指引、度假感',
        works: [
            {
                src: basePath + '海滨叙事诗_初见.jpg',
                title: '初见',
                desc: '海风拂过，初见即是永远\n摄于渔人码头',
                baseSize: '35vw',
                layout: 'column'
            },
            {
                src: basePath + '海滨叙事诗_童话.jpg',
                title: '童话',
                desc: '欧式屋檐下，海风藏了故事\n摄于渔人码头',
                baseSize: '40vw',
                layout: 'column'
            },
            {
                src: basePath + '海滨叙事诗_画中海.jpg',
                title: '画中海',
                desc: '海面如镜，画中行舟\n摄于烟台画院',
                baseSize: '35vw'
            },
            {
                src: basePath + '海滨叙事诗_远方.jpg',
                title: '远方',
                desc: '山海步道，沿线散步，顶级享受',
                baseSize: '35vw'
            },
            {
                src: basePath + '海滨叙事诗_山海之城.jpg',
                title: '山海之城',
                desc: '山与海之间，一座城的呼吸。（画面背后是烟台自然博物馆~）',
                baseSize: '70vw'
            },
            {
                src: basePath + '海滨叙事诗_月亮老人.jpg',
                title: '月亮老人',
                desc: '入镜游人，更衬一分美好',
                baseSize: '35vw'
            },
            {
                src: basePath + '海滨叙事诗_立体主义.jpg',
                title: '立体主义',
                desc: '毕加索再世',
                baseSize: '35vw'
            },
        ]
    },
    {
        name: '海',
        title: '海',
        title_image_src: basePath + '海_渤海轮渡.jpg',
        description: '海风的咸涩、渔线的颤动、钢铁巨轮划开水面时的低沉轰鸣——这组只有两张图，却拼接出一座城市与海之间的对话。一张属于工业的粗粝，一张属于市井的柔软，它们并置在一起时，海不再是背景，而是故事的主角。',
        keywords: '硬核、市井、人间烟火',
        works: [
            {
                src: basePath + '海_渤海轮渡.jpg',
                title: '渤海轮渡',
                desc: '钢铁与海的对话',
                baseSize: '60vw'
            },
            {
                src: basePath + '海_钓鱼佬.jpg',
                title: '钓鱼佬',
                desc: '等一个咬钩的黄昏',
                baseSize: '60vw',
            }
        ]
    },
    {
        name: '拾光',
        title: '拾光',
        title_image_src: basePath + '拾光_花海.jpg',
        description: '没有预设的主题，只有走街串巷时偶遇的光。可能是一片透过梧桐叶洒落的碎光，可能是巷子尽头一个安静的转角。这些看似随意的瞬间，反而藏着最真实的情感。杂乱、自由、出其不意，是这组照片的底色。',
        keywords: '随性、碎片、小确幸',
        works: [
            {
                src: basePath + '拾光_光阴似箭.jpg',
                title: '光阴似箭',
                desc: '时光的箭，射穿了谁的记忆\n摄于拍摄毕业照当日，一餐外广场',
                baseSize: '40vw',
                layout: 'column'
            },
            {
                src: basePath + '拾光_梧桐大道.jpg',
                title: '梧桐大道',
                desc: '梧桐叶落，时光慢行\n摄于拍摄毕业照当日，计算机中心',
                baseSize: '40vw',
                layout: 'column'
            },
            {
                src: basePath + '拾光_花海.jpg',
                title: '花海',
                desc: '花开无声，时光有痕',
                baseSize: '65vw'
            },
            {
                src: basePath + '拾光_微醺张裕.jpg',
                title: '微醺张裕',
                desc: '一杯酒，一座城的微光\n摄于烟台张裕酒文化博物馆',
                baseSize: '45vw',
                layout: 'column'
            },
            {
                src: basePath + '拾光_观星.jpg',
                title: '观星',
                desc: '仰望夜空，星光是时间的针脚',
                baseSize: '35vw',
                layout: 'column'
            },
            {
                src: basePath + '拾光_云.jpg',
                title: '云',
                desc: '一朵硕大的云',
                baseSize: '55vw'
            },
            {
                src: basePath + '拾光_海滨广场.jpg',
                title: '海滨广场',
                desc: '赶在毕业前修好的东门广场，向海出发！',
                baseSize: '80vw',
                layout: 'column'
            }
        ]
    },
    {
        name: '蓝调时刻',
        title: '蓝调时刻',
        title_image_src: basePath + '蓝调时刻_微茫.jpg',
        description: '蓝调时刻是指日出前或日落后太阳位于地平线下4至6度之间的短暂时段，天空呈现深邃蓝色，是摄影中极具魅力的拍摄时间。深夜独自翻看，仿佛能听见时间流过画面的声音。',
        keywords: '情绪、深邃、电影感',
        works: [
            {
                src: basePath + '蓝调时刻_暴雨.jpg',
                title: '暴雨',
                desc: '蓝调在雨中溺了，又浮起\n摄于烟台大学逸夫图书馆',
                baseSize: '75vw'
            },
            {
                src: basePath + '蓝调时刻_彼岸.jpg',
                title: '彼岸',
                desc: '日落时分搭配蓝调时刻\n摄于黄海明珠南侧',
                baseSize: '60vw',
                layout: 'column'
            },
            {
                src: basePath + '蓝调时刻_微茫.jpg',
                title: '微茫',
                desc: '路灯与星星\n星星位置标注于《拾光-观星》',
                baseSize: '25vw',
                layout: 'column'
            },
            {
                src: basePath + '蓝调时刻_捕月.jpg',
                title: '捕月',
                desc: '剑指明月\n摄于烟台大学东门',
                baseSize: '30vw'
            }
        ]
    },
    {
        name: '132合肥舰',
        title: '132合肥舰',
        title_image_src: basePath + '132合肥舰_弦号132.jpg',
        description: '停泊于烟台的132合肥舰是我国自行设计制造的第一型导弹驱逐舰，在长达32年的服役生涯中屡立战功。1980年，该舰作为指挥舰参加我国首次全程洲际导弹发射试验，圆满完成了赴南太平洋落点海域的警戒护卫任务；1985年，它又与补给舰组成编队，历经狂风巨浪的考验，成功对南亚三国进行友好访问，创下了人民海军组建36年来首次派舰出国访问及首航印度洋的历史纪录。2012年退役后常驻烟台，作为爱国主义教育基地继续发挥国防教育作用。',
        keywords: '硬核、岁月、沉默',
        works: [
            {
                src: basePath + '132合肥舰_逐浪.jpg',
                title: '逐浪',
                desc: '钢铁之上，浪花在燃烧',
                baseSize: '70vw'
            },
            {
                src: basePath + '132合肥舰_弦号132.jpg',
                title: '弦号132',
                desc: '数字背后的故事',
                baseSize: '30vw',
                layout: 'column'
            },
            {
                src: basePath + '132合肥舰_目光.jpg',
                title: '目光',
                desc: '雷达系统',
                baseSize: '24vw'
            },
            {
                src: basePath + '132合肥舰_潮汐.jpg',
                title: '潮汐',
                desc: '潮起潮落，铁甲依旧',
                baseSize: '25vw',
            },
            {
                src: basePath + '132合肥舰_余温.jpg',
                title: '余温',
                desc: '铁锈之外，仍有温度',
                baseSize: '30vw',
                layout: 'column'
            },
            {
                src: basePath + '132合肥舰_归港.jpg',
                title: '归港',
                desc: '钢铁巨兽，终有归期',
                baseSize: '32vw'
            }
        ]
    },
    {
        name: '几何的沉默',
        title: '几何的沉默',
        title_image_src: basePath + '几何的沉默_回响.jpg',
        description: '色彩被抽离，只留下线条与光影的交织。建筑的骨架、地面的分割、墙面的切割——这些被忽略的秩序在镜头下变得清晰而有力。画面安静得近乎高冷，却在沉默中说出了一种属于现代都市的，藏匿于喧嚣之下的真相。',
        keywords: '极简、线条、秩序',
        works: [
            {
                src: basePath + '几何的沉默_仰望.jpg',
                title: '仰望',
                desc: '几何的沉默里，有一片天在看你\n摄于烟台大学逸夫图书馆',
                baseSize: '28vw'
            },
            {
                src: basePath + '几何的沉默_余晖.jpg',
                title: '余晖',
                desc: '光在几何的边界上慢慢消失',
                baseSize: '26vw',
            },
            {
                src: basePath + '几何的沉默_幻境.jpg',
                title: '幻境',
                desc: '楼中倒映着另一个世界\n摄于芝罘区海关大楼',
                baseSize: '27vw'
            },
            {
                src: basePath + '几何的沉默_回响.jpg',
                title: '回响',
                desc: '几何的沉默里，有回声在游荡\n摄于烟台大学综合楼',
                baseSize: '32vw'
            },
            {
                src: basePath + '几何的沉默_孤岛.jpg',
                title: '孤岛',
                desc: '一个人，一座孤岛\n摄于烟台大学第七学生餐厅',
                baseSize: '30vw',
            },
            {
                src: basePath + '几何的沉默_流转.jpg',
                title: '流转',
                desc: '弧形的结构里，光线在无声流转\n摄于烟台大学逸夫图书馆',
                baseSize: '30vw',
            },
            {
                src: basePath + '几何的沉默_骨相.jpg',
                title: '骨相',
                desc: '横平竖直，建筑的筋骨\n摄于烟台大学综合楼',
                baseSize: '32vw'
            },
            {
                src: basePath + '几何的沉默_光栅.jpg',
                title: '光栅',
                desc: '极致的内透\n摄于烟台大学逸夫图书馆',
                baseSize: '60vw',
            },
            {
                src: basePath + '几何的沉默_瓦浪.jpg',
                title: '瓦浪',
                desc: '密集筒瓦如凝固的海浪\n摄于所城里',
                baseSize: '34vw',
            },
            {
                src: basePath + '几何的沉默_墨痕.jpg',
                title: '墨痕',
                desc: '当流动笔触撞上瓦片的重复弧线\n摄于所城里',
                baseSize: '32vw'
            }
        ]
    },
    {
        name: '雅顾',
        title: '雅顾',
        title_image_src: basePath + '雅顾_猛虎.jpg',
        description: '放弃了清晰度，只为留住光本身。虚焦让画面变得柔软而模糊，像一层薄纱轻轻覆在记忆上。这组照片带有一种复古油画般的质地，温柔、克制，又带着一点点神秘。它们更像是情绪的切片，而非现实的记录。',
        keywords: '朦胧、柔焦、法式浪漫',
        works: [
            {
                src: basePath + '雅顾_猛虎.jpg',
                title: '猛虎',
                desc: '虚焦带来的油画质感',
                baseSize: '40vw'
            },
            {
                src: basePath + '雅顾_烟台大学.jpg',
                title: '烟台大学',
                desc: '我向海而生，你为梦而来',
                baseSize: '35vw',
            }
        ]
    },
    {
        name: '山海印象',
        title: '山海印象',
        title_image_src: basePath + '山海印象_芝罘.jpg',
        description: '烟台的山与海，在镜头下被重新组合成一幅幅开阔的城市肖像。每一张都极具辨识度，仿佛能看见这座城市的骨架与呼吸。这是最接近“明信片”意象的一组照片，却又不只是风景——它更是一种凝视一座城市的方式。',
        keywords: '地标、大气、城市名片',
        works: [
            {
                src: basePath + '山海印象_莱山.jpg',
                title: '莱山',
                desc: '黄海海上明珠，黄海城市花园',
                baseSize: '55vw',
                layout: 'column'
            },
            {
                src: basePath + '山海印象_芝罘.jpg',
                title: '芝罘',
                desc: '芝罘老城，海纳百川',
                baseSize: '30vw',
            },
            {
                src: basePath + '山海印象_牟平.jpg',
                title: '牟平',
                desc: '仙境海岸，品重烟台',
                baseSize: '75vw'
            }
        ]
    },
]
