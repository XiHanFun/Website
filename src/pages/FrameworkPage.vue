<script setup lang="ts">
import type { CodeItem } from '../components/CodeWindow.vue'
import CodeWindow from '../components/CodeWindow.vue'
import DiagramFramework from '../components/diagrams/DiagramFramework.vue'
import LinkButton from '../components/LinkButton.vue'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import { vReveal } from '../composables/reveal'
import { capabilities, dynamicApiSample, layers, moduleSample, techStack } from '../data/framework'
import { links, products } from '../data/site'

const framework = products[0]!

const samples: CodeItem[] = [
  { value: 'api', label: 'ArticleAppService.cs', lang: 'csharp', code: dynamicApiSample },
  { value: 'module', label: 'MyAppModule.cs', lang: 'csharp', code: moduleSample },
]
</script>

<template>
  <PageHero :product="framework">
    <template #actions>
      <LinkButton :href="framework.doc" size="lg">阅读文档</LinkButton>
      <LinkButton :href="framework.repo" variant="outline" size="lg">源码</LinkButton>
      <LinkButton :href="links.nuget" variant="ghost" size="lg">NuGet</LinkButton>
    </template>
    <template #art>
      <DiagramFramework />
    </template>
  </PageHero>

  <!-- 分层 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead
        eyebrow="01 / 分层"
        title="分层即依赖，依赖可追踪"
        lede="展示、基础设施、领域、应用、核心，自上而下各司其职。模块之间只声明依赖，装配顺序由模块系统按依赖图推导。"
        split
      />
      <div v-reveal class="cells">
        <div v-for="layer in layers" :key="layer.name" class="row-cell">
          <div class="stack" style="gap: var(--xh-space-1)">
            <span class="h-item">{{ layer.name }}</span>
            <span class="fig">{{ layer.en }}</span>
          </div>
          <div class="stack" style="gap: var(--xh-space-3)">
            <div class="chips">
              <span v-for="m in layer.items" :key="m" class="chip">{{ m }}</span>
            </div>
            <p class="text-sm text-muted">{{ layer.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 能力 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead eyebrow="02 / 能力" title="常用的那些，框架已经备好" />
      <div class="cells cells--3">
        <div v-for="(c, i) in capabilities" :key="c.title" v-reveal="i * 50" class="cell" style="gap: var(--xh-space-3)">
          <span class="fig"><b>{{ String(i + 1).padStart(2, '0') }}</b></span>
          <h3 class="h-item">{{ c.title }}</h3>
          <ul class="stack" style="gap: var(--xh-space-1)">
            <li v-for="item in c.items" :key="item" class="text-sm text-muted">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 代码 -->
  <section class="band">
    <div class="frame frame--marked">
      <div class="cells cells--2">
        <div class="cell" style="justify-content: center; padding: var(--site-band-py) var(--site-pad)">
          <p class="eyebrow">03 / 写法</p>
          <h2 class="h-section">特性标一下，端点就有了</h2>
          <p class="lede">
            方法名前缀映射 HTTP 动词，权限码写在特性上，工作单元与事件总线的联动由框架接线。模块之间只声明依赖，装配顺序自动推导。
          </p>
        </div>
        <div class="cell code-stage" style="justify-content: center">
          <div v-reveal style="position: relative">
            <CodeWindow :items="samples" label="代码示例" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 技术选型 -->
  <section class="band">
    <div class="frame frame--marked frame__pad frame__pad--tight">
      <div class="row-cell" style="padding-inline: 0; background: transparent">
        <p class="eyebrow">04 / 技术选型</p>
        <div class="chips">
          <span v-for="t in techStack" :key="t" class="chip">{{ t }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
