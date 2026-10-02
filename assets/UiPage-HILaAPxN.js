import{v as m,b,_,a as u}from"./reveal-BJd8TtyI.js";import{_ as y}from"./DiagramUi.vue_vue_type_script_setup_true_lang-DDSBSMQ1.js";import{_ as w}from"./PageHero.vue_vue_type_script_setup_true_lang-BX8-GVfK.js";import{d as D,p as X,c as t,i as o,j as d,k as s,b as e,m as g,F as c,r as p,o as a,h as f,l as C,q as l}from"./index-CpeoO5ZO.js";const V=[{key:"adapters",label:"adapters",note:"渲染目标，选一个"},{key:"design",label:"design",note:"显式安装的外观层"},{key:"features",label:"features",note:"按需自选，不点头就不来"},{key:"engine",label:"engine",note:"装了适配器就自动拿到"}],R=[{name:"@xihan-ui/vue",group:"adapters",desc:"Vue 适配器：组件、组合式函数与状态机运行时"},{name:"@xihan-ui/react",group:"adapters",desc:"React 适配器：函数组件与 hooks，带载荷的插槽写成函数式 children"},{name:"@xihan-ui/web-components",group:"adapters",desc:"自定义元素适配器：Light DOM 行为宿主，不渲染结构"},{name:"@xihan-ui/tokens",group:"design",desc:"设计令牌与视觉环境运行时，七个轴写到根元素上"},{name:"@xihan-ui/styles",group:"design",desc:"纯 CSS 皮肤，由 data 属性与设计令牌驱动"},{name:"@xihan-ui/icons",group:"design",desc:"自研一等图标集，结构化 IconRecord 数据"},{name:"@xihan-ui/markdown",group:"features",desc:"流式 Markdown 渲染内核，块 key 稳定不重建"},{name:"@xihan-ui/chat-stream",group:"features",desc:"SSE 传输、协议归一、消息分片与会话 store"},{name:"@xihan-ui/code-highlight",group:"features",desc:"粗粒度词法着色器，可选 peer，无第三方运行时依赖"},{name:"@xihan-ui/backgrounds",group:"features",desc:"WebGL2 背景效果与数据驱动粒子点云"},{name:"@xihan-ui/sound",group:"features",desc:"程序化 UI 音效，零音频文件，声音是可序列化配方"},{name:"@xihan-ui/animations",group:"features",desc:"现成动效：进场、注意、错开起播与文字拆分"},{name:"@xihan-ui/core",group:"engine",desc:"基础原语、状态机运行时与交互行为：关闭层、焦点域、滚动锁、在场"},{name:"@xihan-ui/headless",group:"engine",desc:"无样式组件：解剖、状态机与 connect"},{name:"@xihan-ui/motion",group:"engine",desc:"动效原语：缓动、弹簧、补间与减弱动效"},{name:"@xihan-ui/position",group:"engine",desc:"定位引擎，无第三方运行时依赖"},{name:"@xihan-ui/pointer",group:"engine",desc:"指针会话与拖放、缩放几何，无第三方运行时依赖"},{name:"@xihan-ui/viz",group:"engine",desc:"图表引擎：比例尺、刻度、形状、坐标轴布局与拾取，纯函数，无第三方运行时依赖"}],S=[{k:"框架无关",v:"内核与状态机不绑定任何框架，Vue、React 与 Web Components 各是一层适配器，跑的是同一个状态机、同一份 connect。"},{k:"无第三方运行时",v:"定位引擎、状态机、代码高亮、WebGL 背景、音频合成全部自研，底层包不引任何运行时依赖。"},{k:"解剖即契约",v:"data-scope / data-part 是全库地基。皮肤、测试、诊断都建在它上面，标签名反而无关紧要。"},{k:"受控优先",v:"传了受控属性就以外部为准，只给 default* 则组件自持；两个事件并发，一个给明细一个给 v-model。"},{k:"令牌独立成包",v:"色彩模式、品牌、密度、书写方向、对比度、动效与透明材质七个轴写在根元素上，皮肤按属性选择器命中，跨适配器共用。"},{k:"缺件不静默",v:"必备部件漏写会在诊断通道上报，不会渲染出一个看着正常、其实不工作的组件。"}],A=[{name:"通用",items:["button","button-group","clipboard","download-trigger","truncate","float-button","kbd","icon","scrollbar","toggle","toggle-group","typography","watermark"]},{name:"布局",items:["flex","grid","layout","masonry","scroll-area","separator","sortable","resizable","splitter"]},{name:"导航",items:["affix","anchor","back-top","breadcrumb","context-menu","menu","menubar","navigation-menu","page-header","pagination","side-nav","steps","tabs","toolbar","tour"]},{name:"数据录入",items:["calendar-picker","calendar-range-picker","cascader","checkbox","checkbox-group","color-field","color-picker","color-slider","color-swatch-picker","combobox","date-field","date-picker","date-range-picker","editable","field","field-array","fieldset","file-upload","form","image-cropper","input-group","listbox","mention","number-field","password-input","pin-input","radio-group","rating","select","signature-pad","slider","switch","tag-group","tags-input","text-field","time-field","time-picker","time-range-picker","transfer","tree-select"]},{name:"数据展示",items:["accordion","avatar","avatar-group","bar-code","card","carousel","collapsible","color-swatch","descriptions","empty-state","grid-list","highlight","image","image-viewer","infinite-scroll","json-viewer","list","marquee","matrix-code","number-animation","statistic","table","tag","timeline","timer","timestamp","tree","virtualizer"]},{name:"图表",items:["cartesian-chart","funnel-chart","graph-chart","heatmap","hierarchy-chart","pie-chart","radar-chart","sankey-chart","sparkline","progress-meter"]},{name:"反馈",items:["alert","badge","loading-bar","progress","skeleton","spinner","notification"]},{name:"浮层",items:["command","dialog","drawer","floating-panel","hover-card","popconfirm","popover","tooltip"]},{name:"AI 对话",items:["approval","citation","code-view","diff-view","log","markdown-stream","message-feed","prompt-input","question-flow","reasoning","tool-call"]}],T=`<script setup lang="ts">
import { XhButton, XhDialogContent, XhDialogRoot, XhDialogTitle, XhDialogTrigger } from '@xihan-ui/vue'
<\/script>

<template>
  <XhDialogRoot v-slot="{ setOpen }">
    <XhDialogTrigger>打开对话框</XhDialogTrigger>
    <XhDialogContent>
      <XhDialogTitle>确认操作</XhDialogTitle>
      <XhButton variant="solid" @click="setOpen(false)">确定</XhButton>
    </XhDialogContent>
  </XhDialogRoot>
</template>`,z=`<script setup lang="ts">
import { useAccordion } from '@xihan-ui/vue'

// 不要现成的 DOM 结构时，直接拿 api，自己决定渲染成什么标签
const { api } = useAccordion({ multiple: true, defaultValue: ['a'] })
const items = [
  { value: 'a', title: '第一节', body: '内容 A' },
  { value: 'b', title: '第二节', body: '内容 B' },
]
<\/script>

<template>
  <section v-bind="api.getRootProps()">
    <article v-for="item in items" :key="item.value" v-bind="api.getItemProps(item)">
      <h3 v-bind="api.getHeaderProps(item)">
        <button v-bind="api.getTriggerProps(item)">{{ item.title }}</button>
      </h3>
      <div v-bind="api.getContentProps(item)">{{ item.body }}</div>
    </article>
  </section>
</template>`,B=`<!-- 结构由你手写，data-xh-part 标出哪个节点担任哪个角色 -->
<xh-dialog>
  <button data-xh-part="trigger">打开对话框</button>
  <div data-xh-part="backdrop"></div>
  <div data-xh-part="positioner">
    <div data-xh-part="content">
      <h3 data-xh-part="title">确认操作</h3>
      <button data-xh-part="close-trigger" aria-label="关闭"></button>
    </div>
  </div>
</xh-dialog>`,P=`# Vue 项目：适配器 + 默认皮肤
pnpm add @xihan-ui/vue @xihan-ui/styles

# React 项目：适配器 + 默认皮肤
pnpm add @xihan-ui/react @xihan-ui/styles

# 原生 / 其它框架：自定义元素 + 默认皮肤
pnpm add @xihan-ui/web-components @xihan-ui/styles

# 背景层、音效层与代码着色是可选 peer，用到才装
pnpm add @xihan-ui/backgrounds @xihan-ui/sound @xihan-ui/code-highlight`,E=`// main.ts
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

createApp(App).mount('#app')`,O={class:"band"},$={class:"frame frame--marked frame__pad"},j={class:"cells"},G={class:"stack",style:{gap:"var(--xh-space-1)"}},I={class:"h-item mono",style:{"font-size":"1rem"}},L={class:"text-xs text-subtle"},M={class:"stack",style:{gap:"var(--xh-space-3)"}},W={class:"mono",style:{color:"var(--xh-fg-brand)"}},q={class:"text-sm text-muted"},N={class:"band"},F={class:"frame frame--marked frame__pad"},U={class:"cells cells--3"},H={class:"fig"},K={class:"h-item"},J={class:"text-sm text-muted"},Q={class:"band"},Y={class:"frame frame--marked"},Z={class:"cells cells--2"},ee={class:"cell code-stage",style:{"justify-content":"center"}},te={style:{position:"relative"}},ae={class:"band"},se={class:"frame frame--marked frame__pad"},ie={class:"cells"},oe={class:"h-item"},ne={class:"chips"},re={class:"band"},le={class:"frame frame--marked frame__pad"},ce={class:"cells cells--2"},de={class:"cell code-stage"},pe={class:"cell code-stage"},be=D({__name:"UiPage",setup(me){const h=X[1],x=V.map(v=>({...v,items:R.filter(n=>n.group===v.key)})),k=[{value:"vue",label:"Vue 组件",lang:"vue",code:T},{value:"composable",label:"组合式函数",lang:"vue",code:z},{value:"wc",label:"自定义元素",lang:"html",code:B}];return(v,n)=>(a(),t(c,null,[o(w,{product:s(h)},{actions:d(()=>[o(_,{href:s(h).doc,size:"lg"},{default:d(()=>[...n[0]||(n[0]=[f("阅读文档",-1)])]),_:1},8,["href"]),o(_,{href:s(C).npm,variant:"outline",size:"lg"},{default:d(()=>[...n[1]||(n[1]=[f("npm",-1)])]),_:1},8,["href"]),o(_,{href:s(h).repo,variant:"ghost",size:"lg"},{default:d(()=>[...n[2]||(n[2]=[f("源码",-1)])]),_:1},8,["href"])]),art:d(()=>[o(y)]),_:1},8,["product"]),e("section",O,[e("div",$,[o(u,{eyebrow:"01 / 包",title:"按「跟使用者什么关系」分组",lede:"不是按「属于哪一层」，而是按「怎么到达你手里」：适配器选一个，外观显式装，特性按需自选，引擎跟着适配器自动来。",split:""}),g((a(),t("div",j,[(a(!0),t(c,null,p(s(x),i=>(a(),t("div",{key:i.key,class:"row-cell",style:{"align-items":"start"}},[e("div",G,[e("span",I,l(i.label),1),e("span",L,l(i.note),1)]),e("ul",M,[(a(!0),t(c,null,p(i.items,r=>(a(),t("li",{key:r.name,class:"stack",style:{gap:"2px"}},[e("span",W,l(r.name),1),e("span",q,l(r.desc),1)]))),128))])]))),128))])),[[s(m)]])])]),e("section",N,[e("div",F,[o(u,{eyebrow:"02 / 原则",title:"不打折的约束"}),e("div",U,[(a(!0),t(c,null,p(s(S),(i,r)=>g((a(),t("div",{key:i.k,class:"cell",style:{gap:"var(--xh-space-3)"}},[e("span",H,[e("b",null,l(String(r+1).padStart(2,"0")),1)]),e("h3",K,l(i.k),1),e("p",J,l(i.v),1)])),[[s(m),r*50]])),128))])])]),e("section",Q,[e("div",Y,[e("div",Z,[n[3]||(n[3]=e("div",{class:"cell",style:{"justify-content":"center",padding:"var(--site-band-py) var(--site-pad)"}},[e("p",{class:"eyebrow"},"03 / 用法"),e("h2",{class:"h-section"},"同一个对话框，写三遍"),e("p",{class:"lede"},"三种写法跑的是同一个状态机、同一份 connect，差别只在谁负责把属性挂到 DOM 上。")],-1)),e("div",ee,[g((a(),t("div",te,[o(b,{items:k,label:"三种用法"})])),[[s(m)]])])])])]),e("section",ae,[e("div",se,[o(u,{eyebrow:"04 / 组件",title:"每个组件，三种写法同时供货",lede:"每个组件都由无头内核给出解剖与状态机，Vue 组件、React 组件与自定义元素只是它的外壳，行为完全一致。",split:""}),g((a(),t("div",ie,[(a(!0),t(c,null,p(s(A),i=>(a(),t("div",{key:i.name,class:"row-cell",style:{"align-items":"start"}},[e("span",oe,l(i.name),1),e("div",ne,[(a(!0),t(c,null,p(i.items,r=>(a(),t("span",{key:r,class:"chip"},l(r),1))),128))])]))),128))])),[[s(m)]])])]),e("section",re,[e("div",le,[o(u,{eyebrow:"05 / 接入",title:"装两个包，写两行导入"}),e("div",ce,[e("div",de,[o(b,{items:[{value:"install",label:"安装",lang:"bash",code:s(P)}],label:"安装"},null,8,["items"])]),e("div",pe,[o(b,{items:[{value:"bootstrap",label:"main.ts",lang:"typescript",code:s(E)}],label:"接线"},null,8,["items"])])])])])],64))}});export{be as default};
