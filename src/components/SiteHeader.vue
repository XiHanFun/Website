<script setup lang="ts">
import { MenuIcon } from '@xihan-ui/icons'
import {
  XhButton,
  XhDrawerCloseTrigger,
  XhDrawerContent,
  XhDrawerDescription,
  XhDrawerRoot,
  XhDrawerTitle,
  XhDrawerTrigger,
  XhIcon,
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

        <XhDrawerRoot v-slot="{ setOpen }" side="right" size="sm">
          <!-- as-child：触发器的接线合到按钮上，按钮保留自己的解剖与 ghost 皮肤，
               否则抽屉触发器皮肤会给它画一道边，和紧邻的 ThemeToggle 对不上 -->
          <XhDrawerTrigger as-child>
            <XhButton class="mobile-only" icon-only variant="ghost" size="sm" aria-label="打开导航">
              <XhIcon :icon="MenuIcon" />
            </XhButton>
          </XhDrawerTrigger>
          <XhDrawerContent>
            <XhDrawerTitle>导航</XhDrawerTitle>
            <XhDrawerDescription>站内页面、代码托管与色彩模式</XhDrawerDescription>
            <nav class="stack" style="gap: var(--xh-space-1); margin-block-start: var(--xh-space-4)">
              <!-- 链接在 content 内部，不触发 closeOnInteractOutside；不自己收起来的话
                   跳到新页面后抽屉还盖着、背后的滚动锁也还在 -->
              <RouterLink
                v-for="item in nav"
                :key="item.to"
                :to="item.to"
                class="site-nav__link"
                @click="setOpen(false)"
              >
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

            <XhDrawerCloseTrigger />
          </XhDrawerContent>
        </XhDrawerRoot>
      </div>
    </div>
  </header>
</template>
