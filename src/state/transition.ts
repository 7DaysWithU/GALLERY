import {reactive} from 'vue'


export const transitionState = reactive({
    active: false,      // 是否显示过渡层
    text: '',           // 显示的文字
    loaded: false     // 数据是否加载完成(控制退出动画)
})
