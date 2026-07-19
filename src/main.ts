import {createApp} from 'vue'
// @ts-ignore
import 'modern-normalize'
import './style.css'
import App from './App.vue'

import router from "@/route";


const app = createApp(App)

app.config.warnHandler = () => null
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual' // 禁用浏览器自动恢复
}

app.use(router)
app.mount('#app')
