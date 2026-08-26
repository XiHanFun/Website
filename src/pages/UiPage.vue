<script setup lang="ts">
import {
  XhPageHeaderRoot,
  XhPageHeaderSubtitle,
  XhPageHeaderTitle,
  XhTableBody,
  XhTableCaption,
  XhTableCell,
  XhTableColumnHeader,
  XhTableHeader,
  XhTableRoot,
  XhTableRow,
  XhTabsRoot,
  XhTagLabel,
  XhTagRoot,
} from '@xihan-ui/vue'
import { computed } from 'vue'
import CodeSample from '../components/CodeSample.vue'
import SectionHead from '../components/SectionHead.vue'
import { vReveal } from '../composables/reveal'
import { products } from '../data/site'
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

const columns = [
  { id: 'name', label: '包', width: '17rem' },
  { id: 'group', label: '角色组', width: '9rem' },
  { id: 'desc', label: '职责' },
]

const rows = computed(() => packages.map(p => ({ id: p.name })))

const usages = [
  { value: 'vue', label: 'Vue 组件' },
  { value: 'composable', label: '组合式函数' },
  { value: 'wc', label: '自定义元素' },
]

const usageCode: Record<string, { lang: string, code: string }> = {
  vue: { lang: 'vue', code: usageVue },
  composable: { lang: 'vue', code: usageComposable },
  wc: { lang: 'html', code: usageWebComponents },
}

const totalComponents = componentGroups.reduce((n, g) => n + g.items.length, 0)
</script>

<template>
  <section class="section section--tight">
    <div class="container">
      <XhPageHeaderRoot bordered size="lg">
        <XhPageHeaderTitle><h1>XiHan.UI</h1></XhPageHeaderTitle>
        <XhPageHeaderSubtitle>
          框架无关的设计系统运行时 · {{ ui.status }}
        </XhPageHeaderSubtitle>
      </XhPageHeaderRoot>

      <p class="lede" style="margin-block-start: var(--xh-space-6)">{{ ui.desc }}</p>

      <div class="row" style="margin-block-start: var(--xh-space-5)">
        <a :href="ui.doc" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="solid">
          阅读文档
        </a>
        <a
          href="https://www.npmjs.com/org/xihan-ui"
          target="_blank"
          rel="noopener"
          data-scope="button"
          data-part="root"
          data-variant="ghost"
        >npm</a>
      </div>
    </div>
  </section>

  <!-- 本站自证 -->
  <section class="section section--tight">
    <div class="container">
      <div v-reveal class="panel" style="border-color: color-mix(in oklab, var(--xh-fg-brand) 35%, transparent)">
        <div class="row" style="gap: var(--xh-space-3)">
          <XhTagRoot variant="solid" tone="brand"><XhTagLabel>自证</XhTagLabel></XhTagRoot>
          <p class="text-sm muted" style="margin: 0">
            你正在看的这个站点本身就是用 XiHan.UI 搭的：没有引任何其他 UI 库，也没有引 Tailwind。
            顶栏、抽屉、卡片、标签页、代码块、统计数字、首屏背景都是库里的组件，排版层只用设计令牌手写。
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 包 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="17 个包 · 四个角色组"
        title="目录名回答的是「跟使用者什么关系」"
        lede="不是「属于哪一层」，而是「怎么到达你手里」：适配器选一个、外观显式装、特性按需自选、引擎跟着适配器自动来。"
      />

      <div v-reveal class="row" style="margin-block-end: var(--xh-space-5)">
        <XhTagRoot v-for="g in packageGroups" :key="g.key" class="pkg-group" variant="outline" tone="brand" size="sm">
          <XhTagLabel>
            <span style="font-family: var(--xh-font-family-mono)">{{ g.label }}</span> · {{ g.note }}
          </XhTagLabel>
        </XhTagRoot>
      </div>

      <div v-reveal>
        <XhTableRoot v-slot="{ columns: cols }" :columns="columns" :rows="rows" size="sm" style="--xh-table-max-h: none">
          <XhTableCaption class="xh-visually-hidden">XiHan.UI 的 17 个包</XhTableCaption>
          <XhTableHeader>
            <XhTableRow>
              <XhTableColumnHeader v-for="col in cols" :key="col.id" :value="col.id">
                {{ col.label }}
              </XhTableColumnHeader>
            </XhTableRow>
          </XhTableHeader>
          <XhTableBody>
            <XhTableRow v-for="p in packages" :key="p.name" :value="p.name">
              <XhTableCell value="name">
                <span class="mono" style="color: var(--xh-fg-brand)">{{ p.name }}</span>
              </XhTableCell>
              <XhTableCell value="group">
                <span class="chip">{{ p.group }}</span>
              </XhTableCell>
              <XhTableCell value="desc">
                <span class="text-sm muted">{{ p.desc }}</span>
              </XhTableCell>
            </XhTableRow>
          </XhTableBody>
        </XhTableRoot>
      </div>
    </div>
  </section>

  <!-- 原则 -->
  <section class="section">
    <div class="container">
      <SectionHead eyebrow="设计原则" title="六条不打折的约束" />
      <div class="grid" style="--cols: 1; --cols-sm: 2; --cols-lg: 3">
        <div v-for="(p, i) in principles" :key="p.k" v-reveal="i * 60" class="kv panel">
          <span class="kv__k">{{ p.k }}</span>
          <p class="kv__v">{{ p.v }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 三种用法 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="三种用法"
        title="同一个对话框，写三遍"
        lede="三种写法跑的是同一个状态机、同一份 connect，差别只在谁负责把属性挂到 DOM 上。"
      />
      <div v-reveal class="panel">
        <XhTabsRoot :collection="usages" default-value="vue" variant="segment">
          <template #panel="node">
            <CodeSample :code="usageCode[node.value]!.code" :lang="usageCode[node.value]!.lang" />
          </template>
        </XhTabsRoot>
      </div>
    </div>
  </section>

  <!-- 组件总览 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="组件总览"
        :title="`${totalComponents} 个组件，两个适配器同时供货`"
        lede="每个组件都由无头内核给出解剖与状态机，Vue 组件与自定义元素只是它的两层外壳，行为完全一致。"
      />

      <div class="stack stack--lg">
        <div v-for="(g, i) in componentGroups" :key="g.name" v-reveal="i * 50">
          <div class="row" style="justify-content: space-between; margin-block-end: var(--xh-space-3)">
            <h3 class="title-md">{{ g.name }}</h3>
            <span class="mono subtle text-xs">{{ g.items.length }} 个</span>
          </div>
          <div class="module-tags">
            <span v-for="c in g.items" :key="c" class="chip">{{ c }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 接入 -->
  <section class="section">
    <div class="container">
      <SectionHead eyebrow="接入" title="装两个包，写两行导入" />
      <div class="grid" style="--cols: 1; --cols-lg: 2">
        <div v-reveal class="panel">
          <CodeSample title="安装" :code="installSample" lang="bash" />
        </div>
        <div v-reveal="80" class="panel">
          <CodeSample title="接线" :code="bootstrapSample" lang="typescript" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 定宽两列不参与富余宽度分配，剩余宽度全给「职责」。
   格子是 flex: 1 1 auto（table.css），三列 grow 都是 1 时富余宽度被等量瓜分，
   写死的 17rem / 9rem 只当下限用。 */
[data-part='column-header'][data-value='name'],
[data-part='cell'][data-value='name'],
[data-part='column-header'][data-value='group'],
[data-part='cell'][data-value='group'] {
  flex-grow: 0;
}

/* 这四枚是「拉丁标识符 + 中文说明」的长串，窄屏要换行，不要被省略号截掉说明。
   tag 根写死 leading-none，真换行时两行中文字形会上下相贴，行高要一起给 */
.pkg-group [data-part='label'] {
  overflow: visible;
  white-space: normal;
  line-height: var(--xh-leading-normal);
}
</style>
