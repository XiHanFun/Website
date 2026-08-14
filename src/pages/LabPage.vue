<script setup lang="ts">
import {
  XhBadge,
  XhPageHeaderRoot,
  XhPageHeaderSubtitle,
  XhPageHeaderTitle,
  XhTabsContent,
  XhTabsList,
  XhTabsRoot,
  XhTabsTrigger,
} from '@xihan-ui/vue'
import { defineAsyncComponent } from 'vue'
import GalleryLab from '../components/lab/GalleryLab.vue'
import SoundLab from '../components/lab/SoundLab.vue'
import StreamLab from '../components/lab/StreamLab.vue'
import ThemeLab from '../components/lab/ThemeLab.vue'

// 背景层带着一个 WebGL 引擎，切到那一格才装
const BackgroundLab = defineAsyncComponent(() => import('../components/lab/BackgroundLab.vue'))

const benches = [
  { value: 'theme', label: '主题', desc: '五个轴写在 <html> 上，皮肤按属性选择器命中' },
  { value: 'gallery', label: '组件', desc: '104 个组件里挑出来的一批，全是活的' },
  { value: 'background', label: '背景', desc: '14 种 WebGL2 效果，调参面板由参数规格自动生成' },
  { value: 'sound', label: '音效', desc: '14 个语义名，声音是实时合成的，不是音频文件' },
  { value: 'stream', label: '流式渲染', desc: '喂截至当前的全文，拿回带稳定 key 的块' },
]
</script>

<template>
  <section class="section section--tight">
    <div class="container">
      <XhPageHeaderRoot bordered size="lg">
        <XhPageHeaderTitle>实验室</XhPageHeaderTitle>
        <XhPageHeaderSubtitle>
          XiHan.UI 的功能都在这里跑起来 · @xihan-ui/* 1.0.0-alpha.1
        </XhPageHeaderSubtitle>
      </XhPageHeaderRoot>

      <p class="lede" style="margin-block-start: var(--xh-space-6)">
        这一页不是截图墙，是一块工作台：主题、组件、背景、音效、流式渲染五张台子，
        每一张都直接调 npm 上那份 alpha 包，改什么当场生效。
      </p>

      <div class="row" style="margin-block-start: var(--xh-space-4)">
        <XhBadge v-for="b in benches" :key="b.value" variant="outline" tone="neutral">{{ b.label }}</XhBadge>
      </div>
    </div>
  </section>

  <section class="section" style="padding-block-start: 0">
    <div class="container">
      <XhTabsRoot default-value="theme" size="lg">
        <XhTabsList>
          <XhTabsTrigger v-for="b in benches" :key="b.value" :value="b.value">{{ b.label }}</XhTabsTrigger>
        </XhTabsList>

        <XhTabsContent v-for="b in benches" :key="b.value" :value="b.value">
          <p class="text-sm subtle" style="margin-block: var(--xh-space-4) var(--xh-space-6)">{{ b.desc }}</p>

          <ThemeLab v-if="b.value === 'theme'" />
          <GalleryLab v-else-if="b.value === 'gallery'" />
          <BackgroundLab v-else-if="b.value === 'background'" />
          <SoundLab v-else-if="b.value === 'sound'" />
          <StreamLab v-else />
        </XhTabsContent>
      </XhTabsRoot>
    </div>
  </section>
</template>
