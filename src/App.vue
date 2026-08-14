<script setup lang="ts">
import { XhBackTopRoot, XhBackTopTrigger } from '@xihan-ui/vue'
import { RouterView } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <div class="shell">
    <SiteHeader />
    <main>
      <RouterView />
    </main>
    <SiteFooter />

    <XhBackTopRoot :visibility-height="600" :translations="{ trigger: '回到顶部' }">
      <XhBackTopTrigger>↑</XhBackTopTrigger>
    </XhBackTopRoot>
  </div>
</template>
