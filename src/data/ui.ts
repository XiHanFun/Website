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
  { name: '@xihan-ui/vue', group: 'adapters', desc: 'Vue 3 适配器：组件、组合式函数与状态机运行时' },
  { name: '@xihan-ui/react', group: 'adapters', desc: 'React 19 适配器：函数组件与 hooks，带载荷的插槽写成函数式 children' },
  { name: '@xihan-ui/web-components', group: 'adapters', desc: '自定义元素适配器：Light DOM 行为宿主，不渲染结构' },

  { name: '@xihan-ui/tokens', group: 'design', desc: '设计令牌与视觉环境运行时，七个轴写到根元素上' },
  { name: '@xihan-ui/styles', group: 'design', desc: '纯 CSS 皮肤，由 data 属性与设计令牌驱动' },
  { name: '@xihan-ui/icons', group: 'design', desc: '自研一等图标集，结构化 IconRecord 数据' },

  { name: '@xihan-ui/markdown', group: 'features', desc: '流式 Markdown 渲染内核，块 key 稳定不重建' },
  { name: '@xihan-ui/chat-stream', group: 'features', desc: 'SSE 传输、协议归一、消息分片与会话 store' },
  { name: '@xihan-ui/code-highlight', group: 'features', desc: '粗粒度词法着色器，可选 peer，无第三方运行时依赖' },
  { name: '@xihan-ui/backgrounds', group: 'features', desc: 'WebGL2 背景效果与数据驱动粒子点云' },
  { name: '@xihan-ui/sound', group: 'features', desc: '程序化 UI 音效，零音频文件，声音是可序列化配方' },
  { name: '@xihan-ui/animations', group: 'features', desc: '现成动效：进场、注意、错开起播与文字拆分' },

  { name: '@xihan-ui/core', group: 'engine', desc: '基础原语、状态机运行时与交互行为：关闭层、焦点域、滚动锁、在场' },
  { name: '@xihan-ui/headless', group: 'engine', desc: '无样式组件：解剖、状态机与 connect' },
  { name: '@xihan-ui/motion', group: 'engine', desc: '动效原语：缓动、弹簧、补间与减弱动效' },
  { name: '@xihan-ui/position', group: 'engine', desc: '定位引擎，无第三方运行时依赖' },
  { name: '@xihan-ui/pointer', group: 'engine', desc: '指针会话与拖放、缩放几何，无第三方运行时依赖' },
]

export const principles = [
  {
    k: '框架无关',
    v: '内核与状态机不绑定任何框架，Vue、React 与 Web Components 各是一层适配器，跑的是同一个状态机、同一份 connect。',
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
    v: '色彩模式、品牌、密度、书写方向、对比度、动效与透明材质七个轴写在根元素上，皮肤按属性选择器命中，跨适配器共用。',
  },
  {
    k: '缺件不静默',
    v: '必备部件漏写会在诊断通道上报，不会渲染出一个看着正常、其实不工作的组件。',
  },
]

/** 与文档站组件总览同一份分组与顺序（ui.docs.xihanfun.com/components）。 */
export const componentGroups = [
  {
    name: '通用',
    items: ['button', 'button-group', 'clipboard', 'download-trigger', 'truncate', 'float-button', 'gradient-text', 'kbd', 'icon', 'icon-wrapper', 'scrollbar', 'toggle', 'toggle-group', 'typography', 'watermark'],
  },
  {
    name: '布局',
    items: ['flex', 'grid', 'layout', 'masonry', 'scroll-area', 'separator', 'sortable', 'resizable', 'splitter'],
  },
  {
    name: '导航',
    items: ['affix', 'anchor', 'back-top', 'breadcrumb', 'context-menu', 'menu', 'menubar', 'navigation-menu', 'page-header', 'pagination', 'segmented', 'side-nav', 'steps', 'tabs', 'toolbar', 'tour'],
  },
  {
    name: '数据录入',
    items: [
      'calendar-picker', 'calendar-range-picker', 'cascader', 'checkbox', 'checkbox-group', 'color-field', 'color-picker', 'color-slider', 'color-swatch-picker', 'combobox',
      'date-field', 'date-picker', 'date-range-picker', 'editable', 'field', 'field-array', 'fieldset', 'file-upload', 'form', 'image-cropper',
      'input-group', 'listbox', 'mention', 'number-field', 'password-input', 'pin-input', 'radio-group', 'rating', 'select', 'signature-pad',
      'slider', 'switch', 'tag-group', 'tags-input', 'text-field', 'time-field', 'time-picker', 'time-range-picker', 'transfer', 'tree-select',
    ],
  },
  {
    name: '数据展示',
    items: [
      'accordion', 'avatar', 'avatar-group', 'bar-code', 'card', 'carousel', 'collapsible', 'color-swatch', 'descriptions', 'empty-state',
      'heatmap', 'highlight', 'image', 'image-viewer', 'infinite-scroll', 'json-viewer', 'list', 'marquee', 'matrix-code', 'number-animation',
      'statistic', 'table', 'tag', 'timeline', 'timer', 'timestamp', 'tree', 'virtualizer',
    ],
  },
  {
    name: '反馈',
    items: ['alert', 'badge', 'loading-bar', 'progress', 'skeleton', 'spinner', 'notification', 'toast'],
  },
  {
    name: '浮层',
    items: ['command', 'dialog', 'drawer', 'floating-panel', 'hover-card', 'popconfirm', 'popover', 'tooltip'],
  },
  {
    name: 'AI 对话',
    items: ['approval', 'code-view', 'diff-view', 'log', 'markdown-stream', 'message-feed', 'prompt-input', 'question-flow', 'reasoning', 'tool-call'],
  },
]

export const usageVue = `<script setup lang="ts">
import { XhButton, XhDialogContent, XhDialogRoot, XhDialogTitle, XhDialogTrigger } from '@xihan-ui/vue'
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
      <button data-xh-part="close-trigger" aria-label="关闭"></button>
    </div>
  </div>
</xh-dialog>`

export const installSample = `# Vue 3 项目：适配器 + 默认皮肤
pnpm add @xihan-ui/vue @xihan-ui/styles

# React 19 项目：适配器 + 默认皮肤
pnpm add @xihan-ui/react @xihan-ui/styles

# 原生 / 其它框架：自定义元素 + 默认皮肤
pnpm add @xihan-ui/web-components @xihan-ui/styles

# 背景层、音效层与代码着色是可选 peer，用到才装
pnpm add @xihan-ui/backgrounds @xihan-ui/sound @xihan-ui/code-highlight`

export const bootstrapSample = `// main.ts
import { createVisualEnvironmentController } from '@xihan-ui/tokens/runtime'
import { createApp } from 'vue'
import App from './App.vue'

// 皮肤入口自带层序声明与令牌，只引这一行；单独引 tokens.css 是只要令牌不要皮肤的路径
import '@xihan-ui/styles'

// 把七轴视觉环境写到 <html> 上，并显式处理持久化失败
createVisualEnvironmentController({
  root: document.documentElement,
  storageKey: 'app-visual-environment',
  onStorageError: detail => console.error('视觉偏好持久化失败', detail),
  initial: { mode: 'system', motion: 'system', transparency: 'system' },
})

createApp(App).mount('#app')`
