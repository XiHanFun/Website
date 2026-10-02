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
} from '@xihan-ui/vue'
import { RouterLink } from 'vue-router'
import { nav } from '../data/site'
import ThemeControls from './ThemeControls.vue'
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <RouterLink to="/" class="site-brand">
        <img src="/assets/logo.png" alt="" width="28" height="28">
        <span>曦寒懿</span>
        <small class="desk-only">XIHANFUN</small>
      </RouterLink>

      <nav class="site-nav desk-only" aria-label="站点导航">
        <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="site-nav__link">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="site-header__actions">
        <ThemeToggle />

        <XhDrawerRoot v-slot="{ setOpen }" side="right" size="sm">
          <!-- as-child：触发器的接线合到按钮上，按钮保留自己的 ghost 皮肤 -->
          <XhDrawerTrigger as-child>
            <XhButton class="mobile-only" icon-only variant="ghost" size="sm" aria-label="打开导航">
              <XhIcon :icon="MenuIcon" />
            </XhButton>
          </XhDrawerTrigger>
          <XhDrawerContent>
            <XhDrawerTitle>导航</XhDrawerTitle>
            <!-- 说明只给读屏：content 的 aria-describedby 恒指向它，不渲染会成悬空引用 -->
            <XhDrawerDescription class="xh-visually-hidden">站内页面与色彩模式</XhDrawerDescription>
            <nav class="drawer-nav" aria-label="站点导航">
              <!-- 链接在 content 内部，不触发点外关闭；跳转后要自己收起，否则滚动锁还在 -->
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

            <div class="stack" style="gap: var(--xh-space-3); margin-block-start: var(--xh-space-6)">
              <span class="fig">色彩模式</span>
              <ThemeControls />
            </div>

            <XhDrawerCloseTrigger />
          </XhDrawerContent>
        </XhDrawerRoot>
      </div>
    </div>
  </header>
</template>
