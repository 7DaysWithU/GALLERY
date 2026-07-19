<script setup lang="ts">
import {ScrollToTop} from '@/components/scroll'
import {MarqueeText} from '@/components/text'
</script>

<template>
    <footer class="endbar">
        <!--跑马灯-->
        <div class="marquee">
            <MarqueeText class="marquee-item" :duration="25">
                132合肥舰
                <span style="color: var(--color-white-shadow-dark)">&nbsp;+&nbsp;</span>
                几何的沉默
                <span style="color: var(--color-white-shadow-dark)">&nbsp;+&nbsp;</span>
            </MarqueeText>
            <MarqueeText class="marquee-item" direction="right" :duration="40">
                海
                <span style="color: var(--color-white-shadow-dark)">&nbsp;+&nbsp;</span>
                海滨叙事诗
                <span style="color: var(--color-white-shadow-dark)">&nbsp;+&nbsp;</span>
                山海印象
                <span style="color: var(--color-white-shadow-dark)">&nbsp;+&nbsp;</span>
            </MarqueeText>
            <MarqueeText class="marquee-item" :duration="40">
                拾光
                <span style="color: var(--color-white-shadow-dark)">&nbsp;+&nbsp;</span>
                蓝调时刻
                <span style="color: var(--color-white-shadow-dark)">&nbsp;+&nbsp;</span>
                雅顾
                <span style="color: var(--color-white-shadow-dark)">&nbsp;+&nbsp;</span>
            </MarqueeText>
        </div>
        
        <!-- 底部信息 -->
        <div class="container--normal">
            <div class="container-top">
                <div class="menu-left">Menu</div>
                <div class="menu-right">
                    <router-link :to="{ path: '/', hash: '#work' }" class="menu-right-item">
                        <svg class="menu-right-item__icon"
                             xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                            <path d="M-0.000604448 6.65685H11.3131" stroke-width="2" stroke="currentColor"
                                  fill="none"></path>
                            <path d="M5.65625 1L11.3131 6.65685L5.65625 12.3137" stroke-width="2" stroke="currentColor"
                                  fill="none"></path>
                        </svg>
                        <div class="menu-right-item__text">系列</div>
                    </router-link>
                    <router-link :to="{ hash: '#contact' }" class="menu-right-item">
                        <svg class="menu-right-item__icon"
                             xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
                            <path d="M-0.000604448 6.65685H11.3131" stroke-width="2" stroke="currentColor"
                                  fill="none"></path>
                            <path d="M5.65625 1L11.3131 6.65685L5.65625 12.3137" stroke-width="2" stroke="currentColor"
                                  fill="none"></path>
                        </svg>
                        <div class="menu-right-item__text">联系方式</div>
                    </router-link>
                </div>
            </div>
            <div class="container-middle">
                <a class="mail"
                   id="contact"
                   href="https://github.com/7DaysWithU/GALLERY"
                   target="_blank"
                >
                    <div class="mail__header">GitHub@</div>
                    <div class="mail__content">7DaysWithU/GALLERY</div>
                </a>
                <div class="scroll-to-top">
                    <ScrollToTop/>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.endbar {
    background-color: var(--color-black);
    color: var(--color-white);
}

.marquee {
    display: flex;
    flex-direction: column;
    gap: 5vh;
    padding: 15vh 0;
}

.marquee-item {
    letter-spacing: 1em;
}

.container-top {
    display: flex;
    padding-bottom: 10vh;
    justify-content: flex-start;
    gap: 5rem;
    
    font-size: var(--font-size-base);
}

.menu-left {
    color: var(--color-white-shadow-light);
    /*浏览器补丁*/
    font-size: var(--font-size-base);
}

.menu-right {
    display: flex;
    gap: 5rem;
}

.menu-right-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.menu-right-item__icon {
    color: var(--color-white-shadow-light);
    transition: color 0.2s ease, transform 0.2s ease;
}

.menu-right-item:hover .menu-right-item__icon {
    color: var(--color-orange);
    transform: translate3d(0.1rem, 0, 0);
}

.menu-right-item__text{
    /*浏览器补丁*/
    font-size: var(--font-size-base);
}

.container-middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10vh;
}

.mail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    font-size: var(--font-size-display-small);
    letter-spacing: 0.1rem;
}

.mail__header,
.mail__content {
    position: relative;
    font-size: var(--font-size-display-small);
}

/*下划线动画*/
.mail__header::after,
.mail__content::after {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    background-color: var(--color-white);
    
    transform: scaleX(0) translateZ(0);
    transform-origin: right;
    
    transition: transform 0.6s cubic-bezier(0.7, 0.1, 0.1, 1.0);
}

.mail__content::after {
    /* 动画延迟 */
    transition-delay: 0.2s;
}

.mail:hover .mail__header::after,
.mail:hover .mail__content::after {
    transform: scaleX(1) translateZ(0);
    transform-origin: left;
}
</style>
