import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import {Home, Work} from '@/views'
import {transitionState} from '@/state/transition'
import {loadWorkData} from '@/state/workData'


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Gallery'
        }
    },
    {
        path: '/work/:name',
        name: 'Work',
        component: Work,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 1. 刷新页面时，移除 URL 中的 hash，但不执行任何滚动
        if (!from.name && window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search)
            return false   // 不滚动，让浏览器保持默认滚动恢复
        }

        // 2. 如果目标路由有 hash，滚动到对应元素
        if (to.hash) {
            return new Promise((resolve) => {
                const el = document.querySelector(to.hash)
                if (el) {
                    resolve({el, behavior: 'smooth'})
                    return
                }
                let attempts = 0
                const maxAttempts = 30
                const interval = setInterval(() => {
                    const target = document.querySelector(to.hash)
                    if (target) {
                        clearInterval(interval)
                        resolve({el: target, behavior: 'smooth'})
                    }
                    else if (attempts >= maxAttempts) {
                        clearInterval(interval)
                        resolve({top: 0, behavior: 'smooth'})
                    }
                    attempts++
                }, 100)
            })
        }

        // 3. 浏览器前进/后退时恢复滚动位置
        if (savedPosition) return savedPosition

        // 4. Work 路由使用 instant(避免与过渡层冲突)，其他路由平滑滚动到顶部
        if (to.name === 'Work') {
            return {top: 0, behavior: 'instant'}
        }
        return {top: 0, behavior: 'smooth'}
    }
})

router.beforeEach(async (to, from, next) => {
    // 默认路由守卫
    if (to.meta.title) {
        document.title = to.meta.title as string
    }
    // 过渡页面
    if (to.name === 'Work' && from.name !== 'Work') {
        transitionState.active = true
        transitionState.loaded = false
        transitionState.text = to.params.name as string
        await loadWorkData(to.params.name as string)
    }
    next()
})

export default router
