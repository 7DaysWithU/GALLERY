<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';


const props = withDefaults(defineProps<{
    static?: boolean
}>(), {
    static: false
})

const isScrolled = ref(props.static);

/**
 * 监听滚动, 判断是否已滚动
 */
function handleScroll(): void {
    isScrolled.value = window.scrollY > 0;
}

onMounted(() => {
    if (!props.static)
        window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    if (!props.static)
        window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <header class="topbar-wrapper"
            :class="{ 'is-scrolled': isScrolled }"
            :style="{ position: props.static ? 'sticky' : 'fixed' }"
    >
        <!-- 背景层 -->
        <div class="topbar-bg"></div>
        
        <nav class="topbar-nav">
            <div class="topbar-nav__left">
                <router-link to="/" class="nav-item">GALLERY</router-link>
            </div>
            <div class="topbar-nav__right">
                <router-link :to="{ path: '/', hash: '#work' }" class="nav-item">系列</router-link>
                <router-link :to="{ hash: '#contact' }" class="nav-item">联系方式</router-link>
            </div>
        </nav>
    </header>
</template>

<style scoped>
/*顶栏-初始态*/
.topbar-wrapper {
    /*position: fixed;*/
    top: 0;
    left: 0;
    width: 100%;
    z-index: var(--z-index-top);
}

/* 滑动背景层-初始态: 被裁剪隐藏, 滚动后从上往下展开 */
.topbar-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    background-color: var(--color-white);
    z-index: var(--z-index-bottom);
    clip-path: inset(0 0 100% 0);
    transition: clip-path 0.4s ease;
}

/* 滑动背景层-滚动态 */
.is-scrolled .topbar-bg {
    clip-path: inset(0 0 0 0);
}

.topbar-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 24px 48px;
    
    transition: padding 0.3s ease;
}

.is-scrolled .topbar-nav {
    padding-top: 0;
    padding-bottom: 0;
}

.topbar-nav__left,
.topbar-nav__right {
    display: flex;
    gap: 64px;
}

/*导航项-初始态*/
.nav-item {
    position: relative;
    
    color: var(--color-white);
    transition: color 0.3s ease, transform 0.3s ease;
}

/* 导航项-滚动态 */
.is-scrolled .nav-item {
    color: var(--color-black);
    transform: translateY(0);
}

/*单独调整左右导航项的字体大小*/
.topbar-nav__left .nav-item {
    font-size: var(--font-size-h1);
}

.topbar-nav__right .nav-item {
    font-size: var(--font-size-base);
}

/*右侧导航项下划线动画*/
.topbar-nav__right .nav-item::after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: currentColor;
    
    transform: scaleX(0) translateZ(0);
    transform-origin: right;
    
    transition: transform 0.2s ease 0.01s;
}

.topbar-nav__right .nav-item:hover::after {
    transform: scaleX(1) translateZ(0);
    transform-origin: left;
    transition: transform 0.3s ease;
}

/* 当添加 is-scrolled 类的瞬间, 给文字一个向上的初始偏移 */
.topbar-wrapper.is-scrolled .nav-item {
    animation: slideDown 0.5s ease forwards;
}

/* 向下滑入的关键帧动画 */
@keyframes slideDown {
    0% {
        opacity: 0;
        transform: translateY(20px); /* 从上方 10px 处开始 */
    }
    100% {
        opacity: 1;
        transform: translateY(0); /* 落到正常位置 */
    }
}
</style>
