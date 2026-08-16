<script setup lang="ts">
import { provideXhConfig, XhBackTopRoot, XhBackTopTrigger } from '@xihan-ui/vue'
import { RouterView } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'

// 组件内建文案的中文一次给全站，实例上的 translations 仍然胜出
provideXhConfig({
  translations: {
    'back-top': { trigger: '回到顶部' },
    'drawer': { close: '关闭' },
  },
})
</script>

<template>
  <div class="shell">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />

    <XhBackTopRoot :visibility-height="600">
      <XhBackTopTrigger>↑</XhBackTopTrigger>
    </XhBackTopRoot>
  </div>
</template>
