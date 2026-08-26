<script setup lang="ts">
import {
  XhMarqueeContent,
  XhMarqueeRoot,
  XhPageHeaderRoot,
  XhPageHeaderSubtitle,
  XhPageHeaderTitle,
  XhTabsRoot,
  XhTagLabel,
  XhTagRoot,
} from '@xihan-ui/vue'
import CodeSample from '../components/CodeSample.vue'
import SectionHead from '../components/SectionHead.vue'
import { vReveal } from '../composables/reveal'
import { capabilities, dynamicApiSample, layers, moduleSample, techStack } from '../data/framework'
import { products } from '../data/site'

const framework = products[0]!

const samples = [
  { value: 'api', label: '动态 API' },
  { value: 'module', label: '模块装配' },
]

const sampleCode: Record<string, { lang: string, code: string }> = {
  api: { lang: 'csharp', code: dynamicApiSample },
  module: { lang: 'csharp', code: moduleSample },
}
</script>

<template>
  <section class="section section--tight">
    <div class="container">
      <XhPageHeaderRoot bordered size="lg">
        <XhPageHeaderTitle><h1>XiHan.Framework</h1></XhPageHeaderTitle>
        <XhPageHeaderSubtitle>
          基于 .NET 10 的模块化后端框架 · {{ framework.status }}
        </XhPageHeaderSubtitle>
      </XhPageHeaderRoot>

      <p class="lede" style="margin-block-start: var(--xh-space-6)">
        {{ framework.desc }}
      </p>

      <div class="row" style="margin-block-start: var(--xh-space-5)">
        <a :href="framework.doc" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="solid">
          阅读文档
        </a>
        <a
          v-if="framework.demo"
          :href="framework.demo"
          target="_blank"
          rel="noopener"
          data-scope="button"
          data-part="root"
          data-variant="outline"
        >在线体验</a>
        <a
          href="https://www.nuget.org/profiles/XiHanFun"
          target="_blank"
          rel="noopener"
          data-scope="button"
          data-part="root"
          data-variant="ghost"
        >NuGet</a>
      </div>
    </div>
  </section>

  <!-- 分层 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="66 模块 · 五层"
        title="分层即依赖，依赖可追踪"
        lede="展示、基础设施、领域、应用、核心，自上而下各司其职。模块之间只声明依赖，装配顺序由模块系统按依赖图推导。"
      />

      <div v-reveal class="panel panel--flush">
        <div v-for="layer in layers" :key="layer.name" class="layer-row">
          <div class="row" style="gap: var(--xh-space-2); align-items: baseline">
            <span class="title-md" style="color: var(--xh-fg-brand)">{{ layer.name }}</span>
            <span class="mono subtle text-xs">{{ layer.en }}</span>
          </div>
          <div>
            <div class="module-tags">
              <span v-for="m in layer.items" :key="m" class="chip">{{ m }}</span>
            </div>
            <p class="text-sm subtle" style="margin-block-start: var(--xh-space-2)">{{ layer.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 能力 -->
  <section class="section">
    <div class="container">
      <SectionHead eyebrow="能力清单" title="常用的那些，框架已经备好" />

      <div class="grid" style="--cols: 1; --cols-sm: 2; --cols-lg: 3">
        <div v-for="(c, i) in capabilities" :key="c.title" v-reveal="i * 60" class="panel">
          <div class="row" style="gap: var(--xh-space-2); margin-block-end: var(--xh-space-3)">
            <span style="inline-size: 5px; block-size: 5px; border-radius: 999px; background: var(--xh-fg-brand)" />
            <h3 class="title-md">{{ c.title }}</h3>
          </div>
          <ul class="stack" style="gap: var(--xh-space-1)">
            <li v-for="item in c.items" :key="item" class="text-sm muted">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 代码 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="写起来长什么样"
        title="特性标一下，端点就有了"
        lede="方法名前缀映射 HTTP 动词，DTO 与权限码写在特性上，工作单元与事件总线联动由框架接线。"
      />

      <div v-reveal class="panel">
        <XhTabsRoot :collection="samples" default-value="api">
          <template #panel="node">
            <CodeSample :code="sampleCode[node.value]!.code" :lang="sampleCode[node.value]!.lang" />
          </template>
        </XhTabsRoot>
      </div>
    </div>
  </section>

  <!-- 技术栈 -->
  <section class="section section--tight">
    <div class="container">
      <p class="eyebrow" style="margin-block-end: var(--xh-space-4)">技术选型</p>
      <XhMarqueeRoot auto-fill pause-on-hover :speed="40">
        <XhMarqueeContent>
          <XhTagRoot
            v-for="t in techStack"
            :key="t"
            variant="outline"
            tone="neutral"
            style="margin-inline-end: var(--xh-space-3)"
          ><XhTagLabel>{{ t }}</XhTagLabel></XhTagRoot>
        </XhMarqueeContent>
      </XhMarqueeRoot>
    </div>
  </section>
</template>
