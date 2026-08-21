export interface UiPackage {
  name: string
  group: 'adapters' | 'design' | 'features' | 'engine'
  desc: string
}

/** 四个角色组回答的不是「属于哪一层」，而是「这个包跟使用者是什么关系」。 */
export const packageGroups = [
  { key: 'adapters', label: 'adapters', note: '渲染目标，选一个' },
  { key: 'design', label: 'design', note: '显式安装的外观层' },
  { key: 'features', label: 'features', note: '按需自选，不点头就不来' },
  { key: 'engine', label: 'engine', note: '装了适配器就自动拿到' },
] as const

export const packages: UiPackage[] = [
  { name: '@xihan-ui/vue', group: 'adapters', desc: 'Vue 适配器：组件、组合式函数与状态机运行时' },
  { name: '@xihan-ui/web-components', group: 'adapters', desc: '自定义元素适配器：Light DOM 行为宿主，不渲染结构' },

  { name: '@xihan-ui/tokens', group: 'design', desc: '设计令牌与主题运行时，五个轴写到根元素上' },
  { name: '@xihan-ui/styles', group: 'design', desc: '纯 CSS 皮肤，由 data 属性与设计令牌驱动' },
  { name: '@xihan-ui/icons', group: 'design', desc: '自研一等图标集，结构化 IconRecord 数据' },

  { name: '@xihan-ui/markdown', group: 'features', desc: '流式 Markdown 渲染内核，块 key 稳定不重建' },
  { name: '@xihan-ui/chat-stream', group: 'features', desc: 'SSE 传输、协议归一、消息分片与会话 store' },
  { name: '@xihan-ui/backgrounds', group: 'features', desc: 'WebGL2 背景效果与数据驱动粒子点云' },
  { name: '@xihan-ui/sound', group: 'features', desc: '程序化 UI 音效，零音频文件，声音是可序列化配方' },
  { name: '@xihan-ui/animations', group: 'features', desc: '现成动效：进场、注意、错开起播与文字拆分' },

  { name: '@xihan-ui/kernel', group: 'engine', desc: '基础原语，框架无关、零运行时依赖' },
  { name: '@xihan-ui/machine', group: 'engine', desc: '轻量状态机运行时，框架无关' },
  { name: '@xihan-ui/headless', group: 'engine', desc: '无样式组件：解剖、状态机与 connect' },
  { name: '@xihan-ui/behavior', group: 'engine', desc: '交互行为：关闭层、焦点域、滚动锁、贴底、在场' },
  { name: '@xihan-ui/motion', group: 'engine', desc: '动效原语：缓动、弹簧、补间与减弱动效' },
  { name: '@xihan-ui/position', group: 'engine', desc: '定位引擎，无第三方运行时依赖' },
  { name: '@xihan-ui/code-highlight', group: 'engine', desc: '粗粒度词法着色器，无第三方运行时依赖' },
]

export const principles = [
  {
    k: '框架无关',
    v: '内核与状态机不绑定任何框架，Vue 与 Web Components 各是一层适配器，跑的是同一个状态机、同一份 connect。',
  },
  {
    k: '无第三方运行时',
    v: '定位引擎、状态机、代码高亮、WebGL 背景、音频合成全部自研，底层包不引任何运行时依赖。',
  },
  {
    k: '解剖即契约',
    v: 'data-scope / data-part 是全库地基。皮肤、测试、诊断都建在它上面，标签名反而无关紧要。',
  },
  {
    k: '受控优先',
    v: '传了受控属性就以外部为准，只给 default* 则组件自持；两个事件并发，一个给明细一个给 v-model。',
  },
  {
    k: '令牌独立成包',
    v: '色彩模式、品牌、密度、对比度、书写方向五个轴写在根元素上，皮肤按属性选择器命中，跨适配器共用。',
  },
  {
    k: '缺件不静默',
    v: '必备部件漏写会在诊断通道上报，不会渲染出一个看着正常、其实不工作的组件。',
  },
]

export const componentGroups = [
  {
    name: '通用',
    items: ['button', 'button-group', 'icon', 'icon-wrapper', 'badge', 'avatar', 'avatar-group', 'clipboard', 'download-trigger', 'hotkeys', 'toggle', 'toggle-group'],
  },
  {
    name: '布局',
    items: ['layout', 'flex', 'grid', 'space', 'masonry', 'splitter', 'scroll-area', 'separator', 'card', 'page-header', 'affix', 'watermark'],
  },
  {
    name: '数据录入',
    items: [
      'text-field', 'password-input', 'number-field', 'pin-input', 'tags-input', 'mention', 'editable', 'dynamic-input',
      'select', 'combobox', 'cascader', 'tree-select', 'listbox', 'transfer',
      'checkbox', 'checkbox-group', 'radio-group', 'switch', 'slider', 'rating',
      'color-picker', 'date-field', 'date-picker', 'time-field', 'time-picker', 'calendar', 'file-upload', 'image-cropper', 'signature-pad', 'form', 'fieldset', 'field',
    ],
  },
  {
    name: '数据展示',
    items: [
      'table', 'list', 'tree', 'descriptions', 'tag', 'timeline', 'statistic', 'number-animation', 'countdown', 'timer', 'time',
      'carousel', 'image', 'image-viewer', 'marquee', 'qr-code', 'heatmap', 'code-block', 'json-viewer', 'highlight', 'ellipsis',
      'accordion', 'collapsible', 'virtualizer', 'infinite-scroll', 'log', 'typography', 'gradient-text',
    ],
  },
  {
    name: '导航',
    items: ['tabs', 'segmented', 'steps', 'menu', 'menubar', 'context-menu', 'navigation-menu', 'side-nav', 'toolbar', 'breadcrumb', 'anchor', 'pagination', 'back-top', 'float-button'],
  },
  {
    name: '反馈',
    items: ['alert', 'dialog', 'drawer', 'popover', 'popconfirm', 'popselect', 'floating-panel', 'hover-card', 'tooltip', 'toast', 'toaster', 'progress', 'spinner', 'skeleton', 'loading-bar', 'result', 'empty-state', 'tour'],
  },
  {
    name: 'AI 对话',
    items: ['composer', 'thread'],
  },
]

export const usageVue = `<script setup lang="ts">
import { XhDialogContent, XhDialogRoot, XhDialogTitle, XhDialogTrigger } from '@xihan-ui/vue'
</script>

<template>
  <XhDialogRoot v-slot="{ setOpen }">
    <XhDialogTrigger>打开对话框</XhDialogTrigger>
    <XhDialogContent>
      <XhDialogTitle>确认操作</XhDialogTitle>
      <XhButton variant="solid" @click="setOpen(false)">确定</XhButton>
    </XhDialogContent>
  </XhDialogRoot>
</template>`

export const usageComposable = `<script setup lang="ts">
import { useAccordion } from '@xihan-ui/vue'

// 不要现成的 DOM 结构时，直接拿 api，自己决定渲染成什么标签
const { api } = useAccordion({ multiple: true, defaultValue: ['a'] })
const items = [
  { value: 'a', title: '第一节', body: '内容 A' },
  { value: 'b', title: '第二节', body: '内容 B' },
]
</script>

<template>
  <section v-bind="api.getRootProps()">
    <article v-for="item in items" :key="item.value" v-bind="api.getItemProps(item)">
      <h3 v-bind="api.getHeaderProps(item)">
        <button v-bind="api.getTriggerProps(item)">{{ item.title }}</button>
      </h3>
      <div v-bind="api.getContentProps(item)">{{ item.body }}</div>
    </article>
  </section>
</template>`

export const usageWebComponents = `<!-- 结构由你手写，data-xh-part 标出哪个节点担任哪个角色 -->
<xh-dialog>
  <button data-xh-part="trigger">打开对话框</button>
  <div data-xh-part="backdrop"></div>
  <div data-xh-part="positioner">
    <div data-xh-part="content">
      <h3 data-xh-part="title">确认操作</h3>
      <button data-xh-part="close-trigger" aria-label="关闭">✕</button>
    </div>
  </div>
</xh-dialog>`

export const installSample = `# Vue 3 项目：适配器 + 默认皮肤
pnpm add @xihan-ui/vue @xihan-ui/styles

# 原生 / 非 Vue 项目：自定义元素 + 默认皮肤
pnpm add @xihan-ui/web-components @xihan-ui/styles

# 背景层与音效层是可选的，用到才装
pnpm add @xihan-ui/backgrounds @xihan-ui/sound`

export const bootstrapSample = `// main.ts
import { createThemeController } from '@xihan-ui/tokens/runtime'
import { createApp } from 'vue'
import App from './App.vue'

// 令牌必须在皮肤之前：皮肤里不写兜底值，令牌缺席就是缺陷，不是降级
import '@xihan-ui/tokens/tokens.css'
import '@xihan-ui/styles'

// 把主题的五个属性写到 <html> 上，并持久化用户偏好
createThemeController({ storageKey: 'app-theme' })

createApp(App).mount('#app')`
