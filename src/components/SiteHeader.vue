<script setup lang="ts">
import {
  XhDrawerCloseTrigger,
  XhDrawerContent,
  XhDrawerRoot,
  XhDrawerTitle,
  XhDrawerTrigger,
  XhSeparator,
} from '@xihan-ui/vue'
import { RouterLink } from 'vue-router'
import { links, nav, repos } from '../data/site'
import ThemeControls from './ThemeControls.vue'
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <RouterLink to="/" class="site-brand">
        <img src="/assets/logo.png" alt="曦寒 XiHanFun" width="30" height="30">
        <span>曦寒</span>
      </RouterLink>

      <nav class="site-nav desk-only" aria-label="站点导航">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="site-nav__link">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="site-header__actions">
        <!-- 三处镜像：窄屏收进抽屉，中等宽度只留 GitHub -->
        <a
          v-for="repo in repos"
          :key="repo.label"
          :href="repo.href"
          target="_blank"
          rel="noopener"
          :class="repo.label === 'GitHub' ? 'desk-only' : 'wide-only'"
          data-scope="button"
          data-part="root"
          data-variant="ghost"
          data-size="sm"
        >{{ repo.label }}</a>

        <a
          :href="links.docs"
          target="_blank"
          rel="noopener"
          data-scope="button"
          data-part="root"
          data-variant="solid"
          data-size="sm"
        >文档</a>

        <ThemeToggle />

        <XhDrawerRoot side="right" size="sm" :translations="{ close: '关闭' }">
          <XhDrawerTrigger class="mobile-only" aria-label="打开导航">☰</XhDrawerTrigger>
          <XhDrawerContent>
            <XhDrawerTitle>导航</XhDrawerTitle>
            <nav class="stack" style="gap: var(--xh-space-1); margin-block-start: var(--xh-space-4)">
              <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="site-nav__link">
                {{ item.label }}
              </RouterLink>
            </nav>

            <XhSeparator decorative style="margin-block: var(--xh-space-4)" />

            <div class="stack" style="gap: var(--xh-space-2)">
              <span class="mono subtle text-xs">代码托管</span>
              <div class="row">
                <a
                  v-for="repo in repos"
                  :key="repo.label"
                  :href="repo.href"
                  target="_blank"
                  rel="noopener"
                  data-scope="button"
                  data-part="root"
                  data-variant="outline"
                  data-size="sm"
                >{{ repo.label }}</a>
              </div>
            </div>

            <XhSeparator decorative style="margin-block: var(--xh-space-4)" />

            <div class="stack" style="gap: var(--xh-space-2)">
              <span class="mono subtle text-xs">色彩模式</span>
              <ThemeControls />
            </div>

            <XhDrawerCloseTrigger>✕</XhDrawerCloseTrigger>
          </XhDrawerContent>
        </XhDrawerRoot>
      </div>
    </div>
  </header>
</template>
