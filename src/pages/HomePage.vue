<script setup lang="ts">
import type { ParamValue } from '@xihan-ui/backgrounds'
import { nebulaEffect } from '@xihan-ui/backgrounds'
import {
  XhCardBody,
  XhCardDescription,
  XhCardFooter,
  XhCardHeader,
  XhCardRoot,
  XhCardTitle,
  XhGradientText,
  XhNumberAnimation,
  XhStatisticLabel,
  XhStatisticRoot,
  XhStatisticSuffix,
  XhStatisticValue,
  XhTabsRoot,
  XhTagLabel,
  XhTagRoot,
} from '@xihan-ui/vue'
import { XhBackground } from '@xihan-ui/vue/backgrounds'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import CodeSample from '../components/CodeSample.vue'
import SectionHead from '../components/SectionHead.vue'
import { vReveal } from '../composables/reveal'
import { links, products, stats } from '../data/site'
import { useTheme } from '../theme'

const { state } = useTheme()

// 星云自带的底色是近黑的，铺在浅色画布上会把整个首屏洗成灰紫。
// 浅色档把底色换成画布色、光强收一档，深色档用效果原本的配色。
//
// 两个分支必须声明同一套键：setParams 是并入不是替换（backgrounds 的 surface.setParams
// 写的是 { ...overrides, ...patch }），深色档只给 speed 的话，切过一次浅色之后
// 那四个键会永远留在 overrides 里，深色首屏被浅色档的白底洗掉。
// 这里的四个值就是 nebula 效果自己声明的缺省值。
const heroParams = computed((): Record<string, ParamValue> => {
  if (state.value?.mode === 'dark')
    return { speed: 0.55, background: '#050416', intensity: 1, opacity: 1, density: 0.35 }
  return { speed: 0.55, background: '#ffffff', intensity: 0.5, opacity: 0.75, density: 0.2 }
})

const starters = [
  { value: 'backend', label: '后端 · NuGet' },
  { value: 'frontend', label: '前端 · npm' },
  { value: 'app', label: '中后台 · 克隆即跑' },
]

const starterCode: Record<string, { lang: string, code: string }> = {
  backend: {
    lang: 'bash',
    code: `dotnet add package XiHan.Framework.Core
dotnet add package XiHan.Framework.Application
dotnet add package XiHan.Framework.Data
dotnet add package XiHan.Framework.Web.Api`,
  },
  frontend: {
    lang: 'bash',
    code: `pnpm add @xihan-ui/vue @xihan-ui/styles

# 可选：背景层与音效层，用到才装
pnpm add @xihan-ui/backgrounds @xihan-ui/sound`,
  },
  app: {
    lang: 'bash',
    code: `git clone https://github.com/XiHanFun/XiHan.BasicApp
cd XiHan.BasicApp/backend/src/main/XiHan.BasicApp.WebHost
dotnet run`,
  },
}

const pitches = [
  {
    k: '模块化',
    v: '后端 66 个模块按依赖图装配，前端 17 个包按角色分组；用哪块装哪块，不用的那部分连代码都不会进产物。',
  },
  {
    k: '可追踪',
    v: '从 HTTP 请求到数据库、消息队列、缓存，全链路 span 一路串下来；七类审计日志把「谁在什么时候改了什么」记在库里。',
  },
  {
    k: '开箱即用',
    v: 'BasicApp 克隆下来就是一套能跑的多租户中后台：权限、代码生成、工作流、消息中心、AI 助手都已经接好线。',
  },
]
</script>

<template>
  <!-- 首屏 -->
  <section class="hero">
    <XhBackground
      class="hero__backdrop"
      aria-hidden="true"
      :effect="nebulaEffect"
      :params="heroParams"
      quality="balanced"
    />
    <div class="container hero__inner">
      <div class="stack" style="gap: var(--xh-space-5)">
        <div class="row" style="gap: var(--xh-space-2)">
          <XhTagRoot variant="subtle" tone="brand"><XhTagLabel>.NET 10 + Vue 3</XhTagLabel></XhTagRoot>
          <XhTagRoot variant="outline" tone="neutral"><XhTagLabel>MIT 开源</XhTagLabel></XhTagRoot>
        </div>

        <h1 class="hero__wordmark">
          <XhGradientText from="var(--xh-fg-brand)" to="var(--xh-fg-brand-strong)">曦寒</XhGradientText>
        </h1>

        <p class="lede" style="font-size: clamp(1.05rem, 2vw, 1.4rem); color: var(--xh-fg-default)">
          从后端框架、前端组件到完整中后台，<br class="desk-only">一套可落地的企业级开发底座。
        </p>
        <p class="lede text-sm">
          Framework 打底，UI 拼装，BasicApp 直接跑。三个仓库各自独立发布，也能一起用。
        </p>

        <div class="row">
          <a :href="links.docs" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="solid">
            查看文档
          </a>
          <a :href="links.github" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="ghost">
            GitHub
          </a>
        </div>
      </div>

      <div v-reveal class="panel" style="min-inline-size: 0">
        <XhTabsRoot :collection="starters" default-value="backend" variant="segment" size="sm">
          <template #panel="node">
            <CodeSample :code="starterCode[node.value]!.code" :lang="starterCode[node.value]!.lang" />
          </template>
        </XhTabsRoot>
      </div>
    </div>
  </section>

  <!-- 数字 -->
  <section class="section section--tight">
    <div class="container">
      <div v-reveal class="grid" style="--cols: 2; --cols-lg: 4">
        <div v-for="s in stats" :key="s.label" class="panel stack" style="gap: var(--xh-space-2)">
          <XhStatisticRoot size="lg" tone="brand">
            <XhStatisticLabel>{{ s.label }}</XhStatisticLabel>
            <XhStatisticValue>
              <XhNumberAnimation :from="0" :to="s.value" :duration="1400" />
            </XhStatisticValue>
            <XhStatisticSuffix>{{ s.suffix }}</XhStatisticSuffix>
          </XhStatisticRoot>
          <span class="mono subtle text-xs">{{ s.note }}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- 三大产品 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="三大产品"
        title="从框架到应用，一套打底"
        lede="三个仓库分别解决后端骨架、前端外观与业务底座三件事，各自独立可用。"
      />

      <div class="grid" style="--cols: 1; --cols-lg: 3">
        <XhCardRoot
          v-for="(p, i) in products"
          :key="p.title"
          v-reveal="i * 80"
          variant="outline"
          segmented
          hoverable
        >
          <XhCardHeader>
            <div class="row" style="justify-content: space-between">
              <span class="mono" style="color: var(--xh-fg-brand)">{{ p.idx }}</span>
              <XhTagRoot :variant="p.stable ? 'subtle' : 'outline'" :tone="p.stable ? 'success' : 'warning'">
                <XhTagLabel>{{ p.status }}</XhTagLabel>
              </XhTagRoot>
            </div>
            <XhCardTitle>{{ p.title }}</XhCardTitle>
            <XhCardDescription>{{ p.subtitle }}</XhCardDescription>
          </XhCardHeader>

          <XhCardBody>
            <p class="text-sm muted">{{ p.desc }}</p>
            <div class="row" style="gap: var(--xh-space-2); margin-block-start: var(--xh-space-4)">
              <XhTagRoot v-for="f in p.features" :key="f" variant="outline" tone="neutral" size="sm">
                <XhTagLabel>{{ f }}</XhTagLabel>
              </XhTagRoot>
            </div>
          </XhCardBody>

          <XhCardFooter>
            <div class="row" style="gap: var(--xh-space-4)">
              <RouterLink :to="p.route" class="link text-sm">本站介绍</RouterLink>
              <a :href="p.doc" target="_blank" rel="noopener" class="link text-sm">文档</a>
              <a v-if="p.demo" :href="p.demo" target="_blank" rel="noopener" class="link text-sm">在线体验</a>
              <span v-else class="text-sm subtle">文档内含示例</span>
            </div>
          </XhCardFooter>
        </XhCardRoot>
      </div>
    </div>
  </section>

  <!-- 三条主张 -->
  <section class="section">
    <div class="container">
      <SectionHead eyebrow="为什么是曦寒" title="三条能验证的主张" />
      <div class="grid" style="--cols: 1; --cols-lg: 3">
        <div v-for="(p, i) in pitches" :key="p.k" v-reveal="i * 80" class="kv panel">
          <span class="kv__k">{{ p.k }}</span>
          <p class="kv__v">{{ p.v }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 社区 -->
  <section class="section">
    <div class="container" style="text-align: center">
      <div v-reveal class="stack" style="align-items: center; gap: var(--xh-space-5)">
        <p class="eyebrow" style="justify-content: center">社区</p>
        <h2 class="title-lg">开源 · MIT · 欢迎贡献</h2>
        <p class="lede">三处镜像同步维护，Issue 与 PR 在哪一处提都收得到。</p>
        <div class="row" style="justify-content: center">
          <a :href="links.github" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="outline">GitHub</a>
          <a :href="links.gitee" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="outline">Gitee</a>
          <a :href="links.gitcode" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="outline">GitCode</a>
          <a :href="links.qq" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="ghost">QQ 群</a>
        </div>
      </div>
    </div>
  </section>
</template>
