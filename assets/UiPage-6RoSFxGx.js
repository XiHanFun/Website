import{X as A,a as V,b as B,c as P,d as S,e as w,f as H,g as I,h as _}from"./table-CfjeHVeb.js";import{X as L}from"./highlighter-BeK-GAGa.js";import{X as O,a as U,b as G}from"./page-header-B2NQZxTx.js";import{X as M}from"./tabs-C90Skctc.js";import{d as W,n as j,b as i,e as t,f as s,w as o,g as e,t as r,R as q,k as c,F as u,r as m,c as z,o as n,j as p,q as N}from"./index-eptoPuX_.js";import{v as d,_ as h,C as f}from"./reveal-CNW2rGe0.js";import"./backgrounds-DzOvKAV7.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const E=[{key:"adapters",label:"adapters",note:"渲染目标，选一个"},{key:"design",label:"design",note:"显式安装的外观层"},{key:"features",label:"features",note:"按需自选，不点头就不来"},{key:"engine",label:"engine",note:"装了适配器就自动拿到"}],X=[{name:"@xihan-ui/vue",group:"adapters",desc:"Vue 适配器：组件、组合式函数与状态机运行时"},{name:"@xihan-ui/web-components",group:"adapters",desc:"自定义元素适配器：Light DOM 行为宿主，不渲染结构"},{name:"@xihan-ui/tokens",group:"design",desc:"设计令牌与主题运行时，五个轴写到根元素上"},{name:"@xihan-ui/styles",group:"design",desc:"纯 CSS 皮肤，由 data 属性与设计令牌驱动"},{name:"@xihan-ui/icons",group:"design",desc:"自研一等图标集，结构化 IconRecord 数据"},{name:"@xihan-ui/markdown",group:"features",desc:"流式 Markdown 渲染内核，块 key 稳定不重建"},{name:"@xihan-ui/chat-stream",group:"features",desc:"SSE 传输、协议归一、消息分片与会话 store"},{name:"@xihan-ui/backgrounds",group:"features",desc:"WebGL2 背景效果与数据驱动粒子点云"},{name:"@xihan-ui/sound",group:"features",desc:"程序化 UI 音效，零音频文件，声音是可序列化配方"},{name:"@xihan-ui/kernel",group:"engine",desc:"基础原语，框架无关、零运行时依赖"},{name:"@xihan-ui/machine",group:"engine",desc:"轻量状态机运行时，框架无关"},{name:"@xihan-ui/headless",group:"engine",desc:"无样式组件：解剖、状态机与 connect"},{name:"@xihan-ui/behavior",group:"engine",desc:"交互行为：关闭层、焦点域、滚动锁、贴底、在场"},{name:"@xihan-ui/position",group:"engine",desc:"定位引擎，无第三方运行时依赖"},{name:"@xihan-ui/code-highlight",group:"engine",desc:"粗粒度词法着色器，无第三方运行时依赖"}],F=[{k:"框架无关",v:"内核与状态机不绑定任何框架，Vue 与 Web Components 各是一层适配器，跑的是同一个状态机、同一份 connect。"},{k:"无第三方运行时",v:"定位引擎、状态机、代码高亮、WebGL 背景、音频合成全部自研，底层包不引任何运行时依赖。"},{k:"解剖即契约",v:"data-scope / data-part 是全库地基。皮肤、测试、诊断都建在它上面，标签名反而无关紧要。"},{k:"受控优先",v:"传了受控属性就以外部为准，只给 default* 则组件自持；两个事件并发，一个给明细一个给 v-model。"},{k:"令牌独立成包",v:"色彩模式、品牌、密度、对比度、书写方向五个轴写在根元素上，皮肤按属性选择器命中，跨适配器共用。"},{k:"缺件不静默",v:"必备部件漏写会在诊断通道上报，不会渲染出一个看着正常、其实不工作的组件。"}],T=[{name:"通用",items:["button","button-group","icon","icon-wrapper","badge","avatar","avatar-group","clipboard","toggle","toggle-group"]},{name:"布局",items:["layout","flex","grid","splitter","scroll-area","separator","card","page-header","affix","watermark"]},{name:"数据录入",items:["text-field","number-field","pin-input","tags-input","mention","editable","dynamic-input","select","combobox","cascader","tree-select","listbox","transfer","checkbox","checkbox-group","radio-group","switch","slider","rating","color-picker","date-field","date-picker","time-field","time-picker","calendar","file-upload","form","field"]},{name:"数据展示",items:["table","list","tree","descriptions","timeline","statistic","number-animation","countdown","time","carousel","image","image-viewer","marquee","qr-code","code-block","highlight","ellipsis","accordion","collapsible","virtualizer","infinite-scroll","log","typography","gradient-text"]},{name:"导航",items:["tabs","steps","menu","menubar","context-menu","navigation-menu","side-nav","toolbar","breadcrumb","anchor","pagination","back-top","float-button"]},{name:"反馈",items:["alert","dialog","drawer","popover","popconfirm","popselect","hover-card","tooltip","toast","toaster","progress","spinner","skeleton","loading-bar","result","empty-state","tour"]},{name:"AI 对话",items:["composer","thread"]}],$=`<script setup lang="ts">
import { XhDialogContent, XhDialogRoot, XhDialogTitle, XhDialogTrigger } from '@xihan-ui/vue'
<\/script>

<template>
  <XhDialogRoot v-slot="{ setOpen }">
    <XhDialogTrigger>打开对话框</XhDialogTrigger>
    <XhDialogContent>
      <XhDialogTitle>确认操作</XhDialogTitle>
      <XhButton variant="solid" @click="setOpen(false)">确定</XhButton>
    </XhDialogContent>
  </XhDialogRoot>
</template>`,K=`<script setup lang="ts">
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
</template>`,J=`<!-- 结构由你手写，data-xh-part 标出哪个节点担任哪个角色 -->
<xh-dialog>
  <button data-xh-part="trigger">打开对话框</button>
  <div data-xh-part="backdrop"></div>
  <div data-xh-part="positioner">
    <div data-xh-part="content">
      <h3 data-xh-part="title">确认操作</h3>
      <button data-xh-part="close-trigger" aria-label="关闭">✕</button>
    </div>
  </div>
</xh-dialog>`,Q=`# Vue 3 项目：适配器 + 默认皮肤
pnpm add @xihan-ui/vue @xihan-ui/styles

# 原生 / 非 Vue 项目：自定义元素 + 默认皮肤
pnpm add @xihan-ui/web-components @xihan-ui/styles

# 背景层与音效层是可选的，用到才装
pnpm add @xihan-ui/backgrounds @xihan-ui/sound`,Y=`// main.ts
import { createThemeController } from '@xihan-ui/tokens/runtime'
import { createApp } from 'vue'
import App from './App.vue'

// 令牌必须在皮肤之前：皮肤里不写兜底值，令牌缺席就是缺陷，不是降级
import '@xihan-ui/tokens/tokens.css'
import '@xihan-ui/styles'

// 把主题的五个属性写到 <html> 上，并持久化用户偏好
createThemeController({ storageKey: 'app-theme' })

createApp(App).mount('#app')`,Z={class:"section section--tight"},ee={class:"container"},te={class:"lede",style:{"margin-block-start":"var(--xh-space-6)"}},ae={class:"row",style:{"margin-block-start":"var(--xh-space-5)"}},se=["href"],oe={class:"section section--tight"},ne={class:"container"},ie={class:"panel",style:{"border-color":"color-mix(in oklab, var(--xh-color-brand-500) 35%, transparent)"}},le={class:"row",style:{gap:"var(--xh-space-3)"}},re={class:"section"},ce={class:"container"},de={class:"row",style:{"margin-block-end":"var(--xh-space-5)"}},ue={class:"panel panel--flush",style:{"overflow-x":"auto"}},pe={class:"mono",style:{color:"var(--xh-fg-brand)"}},me={class:"chip"},he={class:"text-sm muted"},ge={class:"section"},ve={class:"container"},be={class:"grid",style:{"--cols":"1","--cols-sm":"2","--cols-lg":"3"}},_e={class:"kv__k"},fe={class:"kv__v"},xe={class:"section"},ke={class:"container"},ye={class:"panel"},we={style:{"padding-block-start":"var(--xh-space-4)"}},Xe={class:"section"},Te={class:"container"},Ce={class:"stack stack--lg"},De={class:"row",style:{"justify-content":"space-between","margin-block-end":"var(--xh-space-3)"}},Re={class:"title-md"},Ae={class:"mono subtle text-xs"},Ve={class:"module-tags"},Be={class:"section"},Pe={class:"container"},Se={class:"grid",style:{"--cols":"1","--cols-lg":"2"}},He={class:"panel"},Ie={class:"panel"},Ne=W({__name:"UiPage",setup(Le){const v=j[1],x=[{id:"name",label:"包",width:"17rem"},{id:"group",label:"角色组",width:"9rem"},{id:"desc",label:"职责"}],C=z(()=>X.map(g=>({id:g.name}))),D=[{value:"vue",label:"Vue 组件"},{value:"composable",label:"组合式函数"},{value:"wc",label:"自定义元素"}],k={vue:{lang:"vue",code:$},composable:{lang:"vue",code:K},wc:{lang:"html",code:J}},R=T.reduce((g,l)=>g+l.items.length,0);return(g,l)=>(n(),i(u,null,[t("section",Z,[t("div",ee,[s(e(O),{bordered:"",size:"lg"},{default:o(()=>[s(e(U),null,{default:o(()=>[...l[0]||(l[0]=[p("XiHan.UI",-1)])]),_:1}),s(e(G),null,{default:o(()=>[p(" 框架无关的设计系统运行时 · "+r(e(v).status),1)]),_:1})]),_:1}),t("p",te,r(e(v).desc),1),s(e(A),{tone:"warning",closable:!1,style:{"margin-block-start":"var(--xh-space-5)"}},{default:o(()=>[s(e(B),null,{default:o(()=>[...l[1]||(l[1]=[p("alpha 阶段",-1)])]),_:1}),s(e(P),null,{default:o(()=>[...l[2]||(l[2]=[p(" 能装、能跑，但接口还会变，不承诺语义化版本，不建议用于生产。要让行为可复现，请把版本写成精确值而不是区间。 ",-1)])]),_:1})]),_:1}),t("div",ae,[t("a",{href:e(v).doc,target:"_blank",rel:"noopener","data-scope":"button","data-part":"root","data-variant":"solid"}," 阅读文档 ",8,se),s(e(q),{to:"/lab","data-scope":"button","data-part":"root","data-variant":"outline"},{default:o(()=>[...l[3]||(l[3]=[p(" 进实验室试组件 ",-1)])]),_:1}),l[4]||(l[4]=t("a",{href:"https://www.npmjs.com/org/xihan-ui",target:"_blank",rel:"noopener","data-scope":"button","data-part":"root","data-variant":"ghost"},"npm",-1))])])]),t("section",oe,[t("div",ne,[c((n(),i("div",ie,[t("div",le,[s(e(L),{variant:"solid",tone:"brand"},{default:o(()=>[...l[5]||(l[5]=[p("自证",-1)])]),_:1}),l[6]||(l[6]=t("p",{class:"text-sm muted",style:{margin:"0"}}," 你正在看的这个站点本身就是用 XiHan.UI 搭的：没有引任何其他 UI 库，也没有引 Tailwind。 顶栏、抽屉、卡片、标签页、代码块、统计数字、首屏背景都是库里的组件，排版层只用设计令牌手写。 ",-1))])])),[[e(d)]])])]),t("section",re,[t("div",ce,[s(h,{eyebrow:"15 个包 · 四个角色组",title:"目录名回答的是「跟使用者什么关系」",lede:"不是「属于哪一层」，而是「怎么到达你手里」：适配器选一个、外观显式装、特性按需自选、引擎跟着适配器自动来。"}),c((n(),i("div",de,[(n(!0),i(u,null,m(e(E),a=>(n(),i("span",{key:a.key,class:"chip chip--brand"},r(a.label)+" · "+r(a.note),1))),128))])),[[e(d)]]),c((n(),i("div",ue,[s(e(V),{columns:x,rows:C.value,size:"sm"},{default:o(()=>[s(e(S),null,{default:o(()=>[s(e(w),null,{default:o(()=>[(n(),i(u,null,m(x,a=>s(e(H),{key:a.id,value:a.id},{default:o(()=>[p(r(a.label),1)]),_:2},1032,["value"])),64))]),_:1})]),_:1}),s(e(I),null,{default:o(()=>[(n(!0),i(u,null,m(e(X),a=>(n(),N(e(w),{key:a.name,value:a.name},{default:o(()=>[s(e(_),{value:"name"},{default:o(()=>[t("span",pe,r(a.name),1)]),_:2},1024),s(e(_),{value:"group"},{default:o(()=>[t("span",me,r(a.group),1)]),_:2},1024),s(e(_),{value:"desc"},{default:o(()=>[t("span",he,r(a.desc),1)]),_:2},1024)]),_:2},1032,["value"]))),128))]),_:1})]),_:1},8,["rows"])])),[[e(d)]])])]),t("section",ge,[t("div",ve,[s(h,{eyebrow:"设计原则",title:"六条不打折的约束"}),t("div",be,[(n(!0),i(u,null,m(e(F),(a,b)=>c((n(),i("div",{key:a.k,class:"kv panel"},[t("span",_e,r(a.k),1),t("p",fe,r(a.v),1)])),[[e(d),b*60]])),128))])])]),t("section",xe,[t("div",ke,[s(h,{eyebrow:"三种用法",title:"同一个对话框，写三遍",lede:"三种写法跑的是同一个状态机、同一份 connect，差别只在谁负责把属性挂到 DOM 上。"}),c((n(),i("div",ye,[s(e(M),{collection:D,"default-value":"vue",variant:"segment"},{panel:o(a=>[t("div",we,[s(f,{code:k[a.value].code,lang:k[a.value].lang},null,8,["code","lang"])])]),_:1})])),[[e(d)]])])]),t("section",Xe,[t("div",Te,[s(h,{eyebrow:"组件总览",title:`${e(R)} 个组件，两个适配器同时供货`,lede:"每个组件都由无头内核给出解剖与状态机，Vue 组件与自定义元素只是它的两层外壳，行为完全一致。"},null,8,["title"]),t("div",Ce,[(n(!0),i(u,null,m(e(T),(a,b)=>c((n(),i("div",{key:a.name},[t("div",De,[t("h3",Re,r(a.name),1),t("span",Ae,r(a.items.length)+" 个",1)]),t("div",Ve,[(n(!0),i(u,null,m(a.items,y=>(n(),i("span",{key:y,class:"chip"},r(y),1))),128))])])),[[e(d),b*50]])),128))])])]),t("section",Be,[t("div",Pe,[s(h,{eyebrow:"接入",title:"装两个包，写两行导入"}),t("div",Se,[c((n(),i("div",He,[s(f,{title:"安装",code:e(Q),lang:"bash"},null,8,["code"])])),[[e(d)]]),c((n(),i("div",Ie,[s(f,{title:"接线",code:e(Y),lang:"typescript"},null,8,["code"])])),[[e(d),80]])])])])],64))}});export{Ne as default};
