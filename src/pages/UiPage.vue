<script setup lang="ts">
import type { CodeItem } from '../components/CodeWindow.vue'
import CodeWindow from '../components/CodeWindow.vue'
import DiagramUi from '../components/diagrams/DiagramUi.vue'
import LinkButton from '../components/LinkButton.vue'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import { vReveal } from '../composables/reveal'
import { links, products } from '../data/site'
import {
  bootstrapSample,
  componentGroups,
  installSample,
  packageGroups,
  packages,
  principles,
  usageComposable,
  usageVue,
  usageWebComponents,
} from '../data/ui'

const ui = products[1]!

const groupedPackages = packageGroups.map(group => ({
  ...group,
  items: packages.filter(p => p.group === group.key),
}))

const usages: CodeItem[] = [
  { value: 'vue', label: 'Vue 组件', lang: 'vue', code: usageVue },
  { value: 'composable', label: '组合式函数', lang: 'vue', code: usageComposable },
  { value: 'wc', label: '自定义元素', lang: 'html', code: usageWebComponents },
]
</script>

<template>
  <PageHero :product="ui">
    <template #actions>
      <LinkButton :href="ui.doc" size="lg">阅读文档</LinkButton>
      <LinkButton :href="links.npm" variant="outline" size="lg">npm</LinkButton>
      <LinkButton :href="ui.repo" variant="ghost" size="lg">源码</LinkButton>
    </template>
    <template #art>
      <DiagramUi />
    </template>
  </PageHero>

  <!-- 自证 -->
  <section class="band">
    <div class="frame frame--marked">
      <div class="row-cell" style="background: transparent">
        <p class="eyebrow">自证</p>
        <p class="text-sm text-muted">
          你正在看的这个站点就是用 XiHan.UI 搭的：没有引其他 UI 库，也没有引 CSS 框架。
          顶栏、抽屉、按钮、页签、代码窗与复制都来自 @xihan-ui/vue，颜色、间距与动效全部取自设计令牌。
        </p>
      </div>
    </div>
  </section>

  <!-- 包 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead
        eyebrow="01 / 包"
        title="按「跟使用者什么关系」分组"
        lede="不是按「属于哪一层」，而是按「怎么到达你手里」：适配器选一个，外观显式装，特性按需自选，引擎跟着适配器自动来。"
        split
      />
      <div v-reveal class="cells">
        <div v-for="g in groupedPackages" :key="g.key" class="row-cell" style="align-items: start">
          <div class="stack" style="gap: var(--xh-space-1)">
            <span class="h-item mono" style="font-size: 1rem">{{ g.label }}</span>
            <span class="text-xs text-subtle">{{ g.note }}</span>
          </div>
          <ul class="stack" style="gap: var(--xh-space-3)">
            <li v-for="p in g.items" :key="p.name" class="stack" style="gap: 2px">
              <span class="mono" style="color: var(--xh-fg-brand)">{{ p.name }}</span>
              <span class="text-sm text-muted">{{ p.desc }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 原则 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead eyebrow="02 / 原则" title="不打折的约束" />
      <div class="cells cells--3">
        <div v-for="(p, i) in principles" :key="p.k" v-reveal="i * 50" class="cell" style="gap: var(--xh-space-3)">
          <span class="fig"><b>{{ String(i + 1).padStart(2, '0') }}</b></span>
          <h3 class="h-item">{{ p.k }}</h3>
          <p class="text-sm text-muted">{{ p.v }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 三种用法 -->
  <section class="band">
    <div class="frame frame--marked">
      <div class="cells cells--2">
        <div class="cell" style="justify-content: center; padding: var(--site-band-py) var(--site-pad)">
          <p class="eyebrow">03 / 用法</p>
          <h2 class="h-section">同一个对话框，写三遍</h2>
          <p class="lede">三种写法跑的是同一个状态机、同一份 connect，差别只在谁负责把属性挂到 DOM 上。</p>
        </div>
        <div class="cell code-stage" style="justify-content: center">
          <div v-reveal style="position: relative">
            <CodeWindow :items="usages" label="三种用法" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 组件总览 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead
        eyebrow="04 / 组件"
        title="每个组件，三种写法同时供货"
        lede="每个组件都由无头内核给出解剖与状态机，Vue 组件、React 组件与自定义元素只是它的外壳，行为完全一致。"
        split
      />
      <div v-reveal class="cells">
        <div v-for="g in componentGroups" :key="g.name" class="row-cell" style="align-items: start">
          <span class="h-item">{{ g.name }}</span>
          <div class="chips">
            <span v-for="c in g.items" :key="c" class="chip">{{ c }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 接入 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead eyebrow="05 / 接入" title="装两个包，写两行导入" />
      <div class="cells cells--2">
        <div class="cell code-stage">
          <CodeWindow :items="[{ value: 'install', label: '安装', lang: 'bash', code: installSample }]" label="安装" />
        </div>
        <div class="cell code-stage">
          <CodeWindow :items="[{ value: 'bootstrap', label: 'main.ts', lang: 'typescript', code: bootstrapSample }]" label="接线" />
        </div>
      </div>
    </div>
  </section>
</template>
