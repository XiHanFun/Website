<script setup lang="ts">
import SiteBackground from "./components/SiteBackground.vue";
import FloatingCodeWindow from "./components/FloatingCodeWindow.vue";
import { useScrollAnimation } from "./composables/useScrollAnimation";

const links = {
  docs: "https://docs.xihanfun.com",
  github: "https://github.com/XiHanFun",
  gitee: "https://gitee.com/XiHanFun",
  atomgit: "https://atomgit.com/XiHanFun",
  nuget: "https://www.nuget.org/profiles/XiHanFun",
  npm: "https://www.npmjs.com/org/xihan-ui",
  qq: "https://qm.qq.com/q/qYp1Urv3z2",
};

const products = [
  {
    idx: "01",
    title: "XiHan.Framework",
    subtitle: "后端框架",
    status: "v3.5.0",
    tone: "cyan",
    hasDemo: true,
    desc: "基于 .NET 10 的模块化后端框架，57 个模块从核心、应用、领域、基础设施到展示分层清晰。动态 API、自研事件总线（可切 RabbitMQ / Kafka / Redis）、后台作业、混合缓存、多租户、OpenTelemetry 链路追踪与 AI 集成一体提供。",
    features: ["57 模块", "动态 API", "多租户", "链路追踪", "AI 集成"],
    link: "https://framework.xihanfun.com",
    doc: "https://docs.xihanfun.com/cosmos/framework",
  },
  {
    idx: "02",
    title: "XiHan.UI",
    subtitle: "视图组件",
    status: "实验性 · 开发中",
    tone: "warn",
    hasDemo: false,
    desc: "面向 Vue 3 的组件库，工程化 Monorepo 架构，10 个子包覆盖组件、主题、多语言、图标、Hooks、指令、插件与 CLI，TypeScript 优先。目前正在重写，暂不建议生产使用。",
    features: ["10 子包", "主题系统", "i18n", "按需引入"],
    link: "https://ui.xihanfun.com",
    doc: "https://docs.xihanfun.com/cosmos/ui",
  },
  {
    idx: "03",
    title: "XiHan.BasicApp",
    subtitle: "多租户中后台",
    status: "v3.5.0",
    tone: "cyan",
    hasDemo: true,
    desc: "基于 Framework 与 UI 构建的多租户中后台。RBAC + ABAC + 字段级安全、代码生成、消息中心、六类审计、链路追踪、AI 知识库开箱即用，DDD 分层、前后分离、可水平扩展。",
    features: [
      "多租户",
      "RBAC+ABAC",
      "代码生成",
      "六类审计",
      "链路追踪",
      "AI 知识库",
    ],
    link: "https://basicapp.xihanfun.com",
    doc: "https://docs.xihanfun.com/cosmos/basic-app",
  },
];

const frameworkLayers = [
  {
    name: "展示",
    en: "Presentation",
    items: [
      "Web.Api",
      "Web.Core",
      "Web.Gateway",
      "Web.RealTime",
      "Web.Grpc",
      "Web.Docs",
    ],
    desc: "动态 API、网关、SignalR、gRPC、Scalar 文档",
  },
  {
    name: "基础设施",
    en: "Infrastructure",
    items: [
      "Data",
      "Caching",
      "Authentication",
      "EventBus",
      "BackgroundJobs",
      "Auditing",
      "Observability",
      "AI",
      "Bot",
      "MultiTenancy",
      "SearchEngines",
      "ObjectStorage",
    ],
    desc: "SqlSugar 仓储、混合缓存 L1/L2、分布式事件总线、后台作业、审计、可观测性、AI、多租户",
  },
  {
    name: "领域",
    en: "Domain",
    items: ["Domain", "Domain.Shared"],
    desc: "DDD 模式、实体审计、领域事件、查询过滤",
  },
  {
    name: "应用",
    en: "Application",
    items: ["Application", "Application.Contracts"],
    desc: "CRUD、DTO 映射、批量操作、自动分页",
  },
  {
    name: "核心",
    en: "Core",
    items: ["Core", "Utils", "Metadata"],
    desc: "模块系统、依赖注入、生命周期、配置选项",
  },
];

const frameworkFeatures = [
  {
    title: "动态 API",
    items: [
      "[DynamicApi] 自动生成 REST",
      "方法名映射 HTTP 动词",
      "Scalar 文档界面",
    ],
  },
  {
    title: "自研事件总线",
    items: [
      "进程内与分布式事件",
      "RabbitMQ / Kafka / Redis Broker",
      "处理器工厂与工作单元联动",
    ],
  },
  {
    title: "混合缓存",
    items: ["L1 内存 + L2 Redis", "租户隔离 Key", "UoW 失效联动"],
  },
  {
    title: "AI 集成",
    items: ["Semantic Kernel", "Model Context Protocol", "OpenAI / Ollama"],
  },
  {
    title: "数据与事务",
    items: ["SqlSugar 仓储", "实体审计与软删除", "UoW 工作单元"],
  },
  {
    title: "韧性与可观测",
    items: [
      "OpenTelemetry / W3C 链路追踪",
      "HTTP / DB / MQ / Redis 全链路 span",
      "Polly 重试熔断、限流与指标导出",
    ],
  },
];

const frameworkTech =
  ".NET 10 · SqlSugar · Serilog · Scalar · Redis · OpenTelemetry · Semantic Kernel · Polly · Elasticsearch · gRPC";

const uiPackages = [
  { name: "@xihan-ui/components", desc: "组件集合" },
  { name: "@xihan-ui/themes", desc: "统一样式系统：主题 / 响应式 / 动画" },
  { name: "@xihan-ui/hooks", desc: "组合式 Hooks" },
  { name: "@xihan-ui/icons", desc: "图标" },
  { name: "@xihan-ui/locales", desc: "i18n 多语言" },
  { name: "@xihan-ui/directives", desc: "指令" },
  { name: "@xihan-ui/plugins", desc: "插件" },
  { name: "@xihan-ui/cli", desc: "脚手架 CLI" },
  { name: "@xihan-ui/utils", desc: "工具函数" },
  { name: "@xihan-ui/constants", desc: "共享常量" },
];

const uiPrinciples = [
  { k: "工程化", v: "pnpm + Turborepo + unbuild，产物含 ESM / CJS 与类型声明" },
  { k: "主题", v: "主题引擎与样式编译，设计令牌可定制" },
  { k: "国际化", v: "组件级 locale 与 i18n 集成" },
  { k: "按需", v: "sideEffects 标注，树摇与按需引入" },
];

const basicAppPillars = [
  {
    name: "权限三层",
    items: [
      "RBAC 功能权限码",
      "ABAC 数据范围",
      "字段级安全脱敏",
      "授权申请与审计",
    ],
    desc: "功能、数据范围到字段三层叠加，越权请求在服务端拦截",
  },
  {
    name: "多租户",
    items: ["登录后选租户", "平台态运维", "版本白名单门控", "开通一站式"],
    desc: "邮箱全局唯一登录，智能落点，超管可切入任意租户代管",
  },
  {
    name: "工程能力",
    items: [
      "全栈代码生成",
      "企业级消息中心",
      "六类审计日志",
      "链路追踪时间线",
      "网关灰度发布",
    ],
    desc: "从脚手架到运营开箱即用，请求落库前自动脱敏，一次请求全链路可回溯",
  },
];

const basicAppModules = [
  {
    name: "XiHan.BasicApp.Core",
    desc: "聚合 Framework 多包：认证 / 缓存 / 数据 / 多租户 / 事件总线",
  },
  {
    name: "XiHan.BasicApp.Web.Core",
    desc: "动态 API、Scalar、SignalR、网关与灰度路由",
  },
  {
    name: "XiHan.BasicApp.Saas",
    desc: "用户 / 角色 / 权限 / 租户 / 配置 / 字典 / 通知 / 日志 / 任务",
  },
  {
    name: "XiHan.BasicApp.CodeGeneration",
    desc: "数据源、表结构导入、模板配置、全栈代码生成",
  },
  {
    name: "XiHan.BasicApp.AI",
    desc: "AI Provider 库化管理、RAG 知识库、知识检索技能与 MCP Server",
  },
  { name: "XiHan.BasicApp.WebHost", desc: "启动入口，聚合所有模块" },
];

const productsVis = useScrollAnimation();
const frameworkVis = useScrollAnimation();
const uiVis = useScrollAnimation();
const basicAppVis = useScrollAnimation();
const startVis = useScrollAnimation();
const communityVis = useScrollAnimation();
</script>

<template>
  <div class="relative min-h-screen overflow-x-hidden bg-base">
    <div class="fixed inset-0 z-0">
      <SiteBackground />
    </div>

    <!-- 导航 -->
    <header class="fixed inset-x-0 top-0 z-50 px-3 py-3 sm:px-6 sm:py-4">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-line/40 px-4 py-2.5 backdrop-blur-xl sm:px-6 sm:py-3"
        style="background: rgb(var(--c-base) / 0.55)"
      >
        <a href="#top" class="flex shrink-0 items-center gap-2.5">
          <img
            src="/assets/logo.png"
            alt="曦寒 XiHanFun"
            class="object-contain w-8 h-8 rounded-lg sm:h-9 sm:w-9"
          />
          <span class="hidden text-base font-bold font-cjk text-ink sm:inline"
            >曦寒</span
          >
        </a>
        <div
          class="flex flex-wrap items-center justify-end min-w-0 text-xs gap-x-4 gap-y-1 sm:gap-x-6 sm:text-sm"
        >
          <a
            href="#products"
            class="transition-colors text-ink2 hover:text-cyan sm:inline"
            >产品</a
          >
          <a
            href="#framework"
            class="transition-colors text-ink2 hover:text-cyan sm:inline"
            >架构</a
          >
          <a
            :href="links.github"
            target="_blank"
            rel="noopener"
            class="transition-colors text-ink2 hover:text-cyan sm:inline"
            >GitHub</a
          >
          <a
            :href="links.gitee"
            target="_blank"
            rel="noopener"
            class="transition-colors text-ink2 hover:text-cyan sm:inline"
            >Gitee</a
          >
          <a
            :href="links.atomgit"
            target="_blank"
            rel="noopener"
            class="transition-colors text-ink2 hover:text-cyan sm:inline"
            >AtomGit</a
          >
          <a
            :href="links.docs"
            target="_blank"
            rel="noopener"
            class="btn btn-primary px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm"
            >快速开始</a
          >
        </div>
      </nav>
    </header>

    <!-- Hero -->
    <section
      id="top"
      class="relative z-10 flex flex-col items-center min-h-screen gap-12 px-4 pb-12 mx-auto max-w-7xl pt-28 sm:px-6 lg:flex-row lg:gap-16 lg:pt-20 xl:gap-24"
    >
      <div class="flex-1 w-full">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 mb-5 text-xs border rounded-full border-line/50 text-ink2 animate-reveal"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-soft" />
          .NET 10 + Vue 3 · 企业级开源底座
        </div>
        <h1
          class="font-cjk text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.95] tracking-tightest text-ink wordmark-glow animate-reveal"
        >
          曦寒
        </h1>
        <p
          class="max-w-xl mt-5 text-lg text-ink2 sm:text-xl lg:text-2xl animate-reveal"
          style="animation-delay: 0.08s"
        >
          从后端框架、前端组件到完整中后台，<br
            class="hidden sm:block"
          />一套可落地的企业级开发底座。
        </p>
        <p
          class="max-w-lg mt-4 text-sm leading-relaxed text-ink3 animate-reveal"
          style="animation-delay: 0.16s"
        >
          模块化、可追踪、开箱即用。Framework 打底，UI 拼装，BasicApp 直接跑。
        </p>
        <div
          class="flex flex-wrap items-center gap-3 mt-8 animate-reveal"
          style="animation-delay: 0.24s"
        >
          <a
            :href="links.docs"
            target="_blank"
            rel="noopener"
            class="btn btn-primary"
            >查看文档</a
          >
          <a
            :href="links.github"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
            >GitHub</a
          >
          <a
            :href="links.gitee"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
            >Gitee</a
          >
          <a
            :href="links.atomgit"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
            >AtomGit</a
          >
        </div>
      </div>

      <div
        class="flex flex-col flex-1 w-full min-w-0 gap-4 sm:gap-5 lg:max-w-xl"
      >
        <FloatingCodeWindow
          title="Framework · NuGet"
          :float-offset="-12"
          class="animate-reveal"
          :code="`dotnet add package XiHan.Framework.Core
dotnet add package XiHan.Framework.Application
dotnet add package XiHan.Framework.Data
dotnet add package XiHan.Framework.Web.Api`"
        />
        <FloatingCodeWindow
          title="UI · npm"
          :float-offset="-8"
          class="animate-float-slow"
          :code="`pnpm add @xihan-ui/components

import { XhButton, XhIcon } from '@xihan-ui/components'`"
        />
        <FloatingCodeWindow
          title="BasicApp · 一行跑起来"
          :float-offset="-6"
          class="animate-reveal"
          :code="`git clone https://github.com/XiHanFun/XiHan.BasicApp
cd XiHan.BasicApp/backend && dotnet run`"
        />
      </div>
    </section>

    <!-- 产品 -->
    <section
      id="products"
      :ref="(el) => (productsVis.el.value = el as HTMLElement)"
      class="relative z-10 max-w-6xl px-4 py-16 mx-auto scroll-mt-24 sm:px-6 lg:py-24"
    >
      <div :class="productsVis.visible ? 'reveal-in' : 'reveal-init'">
        <p class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
          / 三大产品
        </p>
        <h2
          class="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          从框架到应用，一套打底
        </h2>
      </div>
      <div class="mt-10 border-t border-line/40">
        <article
          v-for="(p, i) in products"
          :key="p.title"
          class="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-4 border-b border-line/40 py-8 transition-colors duration-500 hover:bg-surface/30 sm:gap-x-8 lg:grid-cols-[5rem_1fr_auto] lg:px-2"
          :class="productsVis.visible ? 'reveal-in' : 'reveal-init'"
          :style="{ transitionDelay: `${i * 90}ms` }"
        >
          <div class="font-mono text-base font-medium text-cyan/85 lg:text-lg">
            {{ p.idx }}
          </div>
          <div class="min-w-0">
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 class="text-xl font-bold sm:text-2xl">{{ p.title }}</h3>
              <span class="text-sm text-ink3">{{ p.subtitle }}</span>
            </div>
            <p class="mt-2.5 max-w-2xl text-sm leading-relaxed text-ink2">
              {{ p.desc }}
            </p>
            <div class="flex flex-wrap gap-2 mt-4">
              <span v-for="f in p.features" :key="f" class="chip">{{ f }}</span>
            </div>
          </div>
          <div
            class="flex items-center col-start-2 gap-4 lg:col-start-3 lg:flex-col lg:items-end lg:gap-3"
          >
            <span
              class="chip"
              :class="
                p.tone === 'warn'
                  ? 'border-warn/30 text-warn'
                  : 'border-cyan/25 text-cyan'
              "
              >{{ p.status }}</span
            >
            <div class="flex gap-4 text-sm">
              <a
                v-if="p.hasDemo"
                :href="p.link"
                target="_blank"
                rel="noopener"
                class="font-medium transition-colors text-ink hover:text-cyan"
                >在线体验</a
              >
              <span v-else class="font-medium text-warn/80">开发中</span>
              <a
                :href="p.doc"
                target="_blank"
                rel="noopener"
                class="transition-colors text-ink3 hover:text-ink2"
                >文档</a
              >
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Framework 架构 -->
    <section
      id="framework"
      :ref="(el) => (frameworkVis.el.value = el as HTMLElement)"
      class="relative z-10 max-w-6xl px-4 py-16 mx-auto scroll-mt-24 sm:px-6 lg:py-24"
    >
      <div :class="frameworkVis.visible ? 'reveal-in' : 'reveal-init'">
        <p class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
          / Framework · 57 模块
        </p>
        <h2
          class="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          分层即依赖，依赖可追踪
        </h2>
        <p class="max-w-2xl mt-3 text-sm text-ink3">
          展示、基础设施、领域、应用、核心，自上而下各司其职。
        </p>
      </div>

      <!-- 分层架构图 -->
      <div
        class="mt-10 overflow-hidden border rounded-2xl border-line/40"
        :class="frameworkVis.visible ? 'reveal-in' : 'reveal-init'"
        style="transition-delay: 80ms"
      >
        <div
          v-for="layer in frameworkLayers"
          :key="layer.name"
          class="grid gap-2 border-b border-line/30 px-5 py-4 transition-colors duration-500 last:border-0 hover:bg-surface/50 sm:grid-cols-[8.5rem_1fr] sm:gap-5"
        >
          <div class="flex items-baseline gap-2">
            <span class="text-base font-semibold text-cyan">{{
              layer.name
            }}</span>
            <span
              class="font-mono text-[10px] uppercase tracking-wider text-ink3"
              >{{ layer.en }}</span
            >
          </div>
          <div>
            <div
              class="flex flex-wrap font-mono text-xs gap-x-3 gap-y-1 text-ink2"
            >
              <span v-for="m in layer.items" :key="m">{{ m }}</span>
            </div>
            <p class="mt-1.5 text-xs text-ink3">{{ layer.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 能力清单 -->
      <div
        class="grid mt-8 gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
        :class="frameworkVis.visible ? 'reveal-in' : 'reveal-init'"
        style="transition-delay: 160ms"
      >
        <div v-for="feat in frameworkFeatures" :key="feat.title">
          <div
            class="mb-2.5 flex items-center gap-2 border-b border-line/30 pb-2"
          >
            <span class="w-1 h-1 rounded-full bg-violet" />
            <h3 class="text-sm font-semibold text-ink">{{ feat.title }}</h3>
          </div>
          <ul class="space-y-1.5 text-xs text-ink2">
            <li v-for="it in feat.items" :key="it">{{ it }}</li>
          </ul>
        </div>
      </div>
      <p class="mt-8 font-mono text-xs text-ink3">{{ frameworkTech }}</p>
    </section>

    <!-- UI 组件 -->
    <section
      :ref="(el) => (uiVis.el.value = el as HTMLElement)"
      class="relative z-10 max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:py-24"
    >
      <div :class="uiVis.visible ? 'reveal-in' : 'reveal-init'">
        <p
          class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-violet"
        >
          / XiHan.UI · 实验性
        </p>
        <h2
          class="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          十个子包，各司其职
        </h2>
        <p class="max-w-2xl mt-3 text-sm text-ink3">
          面向 Vue 3 的组件库，工程化优先：主题、国际化、图标、Hooks
          全部独立成包。组件库仍处于实验阶段，接口可能调整，暂不建议生产使用。
        </p>
      </div>

      <div class="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div
          class="grid gap-2 sm:grid-cols-2"
          :class="uiVis.visible ? 'reveal-in' : 'reveal-init'"
          style="transition-delay: 80ms"
        >
          <div
            v-for="pkg in uiPackages"
            :key="pkg.name"
            class="panel panel-hover px-3.5 py-3"
          >
            <div class="font-mono text-xs truncate text-violet">
              {{ pkg.name }}
            </div>
            <div class="mt-0.5 text-xs text-ink3">{{ pkg.desc }}</div>
          </div>
        </div>
        <div
          class="space-y-5"
          :class="uiVis.visible ? 'reveal-in' : 'reveal-init'"
          style="transition-delay: 160ms"
        >
          <div
            v-for="pr in uiPrinciples"
            :key="pr.k"
            class="pb-4 border-b border-line/30 last:border-0"
          >
            <div class="text-sm font-semibold text-ink">{{ pr.k }}</div>
            <p class="mt-1 text-xs leading-relaxed text-ink2">{{ pr.v }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- BasicApp -->
    <section
      :ref="(el) => (basicAppVis.el.value = el as HTMLElement)"
      class="relative z-10 max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:py-24"
    >
      <div :class="basicAppVis.visible ? 'reveal-in' : 'reveal-init'">
        <p class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
          / XiHan.BasicApp · 多租户中后台
        </p>
        <h2
          class="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          权限做到字段级，租户隔离到底
        </h2>
      </div>

      <div
        class="grid gap-px mt-10 overflow-hidden border rounded-2xl border-line/40 md:grid-cols-3"
        :class="basicAppVis.visible ? 'reveal-in' : 'reveal-init'"
        style="transition-delay: 80ms"
      >
        <div
          v-for="pillar in basicAppPillars"
          :key="pillar.name"
          class="p-5 transition-colors duration-500 bg-surface/40 hover:bg-surface/70 sm:p-6"
        >
          <h3 class="text-base font-semibold text-ink">{{ pillar.name }}</h3>
          <ul class="mt-3 space-y-1.5 text-sm text-ink2">
            <li
              v-for="it in pillar.items"
              :key="it"
              class="flex items-start gap-2"
            >
              <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan/70" />
              <span>{{ it }}</span>
            </li>
          </ul>
          <p
            class="mt-3.5 border-t border-line/30 pt-3 text-xs leading-relaxed text-ink3"
          >
            {{ pillar.desc }}
          </p>
        </div>
      </div>

      <div
        class="grid gap-2 mt-6 sm:grid-cols-2 lg:grid-cols-3"
        :class="basicAppVis.visible ? 'reveal-in' : 'reveal-init'"
        style="transition-delay: 160ms"
      >
        <div
          v-for="m in basicAppModules"
          :key="m.name"
          class="panel panel-hover px-3.5 py-3"
        >
          <div class="font-mono text-xs truncate text-cyan" :title="m.name">
            {{ m.name }}
          </div>
          <div class="mt-1 text-xs leading-relaxed text-ink3">{{ m.desc }}</div>
        </div>
        <a
          :href="'https://basicapp.xihanfun.com'"
          target="_blank"
          rel="noopener"
          class="panel group flex items-center justify-between px-3.5 py-3 transition-colors duration-500 hover:border-cyan/40"
        >
          <span class="text-xs font-medium text-ink">打开在线 Demo</span>
          <span
            class="transition-transform duration-300 text-cyan group-hover:translate-x-1"
            >→</span
          >
        </a>
      </div>
    </section>

    <!-- 快速开始 -->
    <section
      :ref="(el) => (startVis.el.value = el as HTMLElement)"
      class="relative z-10 max-w-4xl px-4 py-16 mx-auto sm:px-6 lg:py-24"
    >
      <div
        class="text-center"
        :class="startVis.visible ? 'reveal-in' : 'reveal-init'"
      >
        <p class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
          / 快速开始
        </p>
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          后端 NuGet，前端 npm
        </h2>
      </div>
      <div
        class="grid gap-3 mt-8 sm:grid-cols-2"
        :class="startVis.visible ? 'reveal-in' : 'reveal-init'"
        style="transition-delay: 90ms"
      >
        <a
          :href="links.nuget"
          target="_blank"
          rel="noopener"
          class="p-5 text-left panel panel-hover group"
        >
          <span class="mb-1.5 block text-xs text-ink3">后端</span>
          <span class="font-mono text-sm text-cyan"
            >dotnet add package XiHan.Framework.*</span
          >
        </a>
        <a
          :href="links.npm"
          target="_blank"
          rel="noopener"
          class="p-5 text-left panel panel-hover group"
        >
          <span class="mb-1.5 block text-xs text-ink3">前端</span>
          <span class="font-mono text-sm text-violet"
            >pnpm add @xihan-ui/components</span
          >
        </a>
      </div>
      <div
        class="mt-6 text-center"
        :class="startVis.visible ? 'reveal-in' : 'reveal-init'"
        style="transition-delay: 180ms"
      >
        <a
          :href="links.docs"
          target="_blank"
          rel="noopener"
          class="text-sm font-medium transition-colors text-cyan hover:text-ink"
          >查看完整文档 →</a
        >
      </div>
    </section>

    <!-- 社区 -->
    <section
      id="community"
      :ref="(el) => (communityVis.el.value = el as HTMLElement)"
      class="relative z-10 max-w-2xl px-4 py-16 mx-auto text-center sm:px-6 lg:py-24"
    >
      <div :class="communityVis.visible ? 'reveal-in' : 'reveal-init'">
        <p class="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">
          / 社区
        </p>
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
          开源 · MIT · 欢迎贡献
        </h2>
        <div class="flex flex-wrap justify-center gap-3 mt-8">
          <a
            :href="links.github"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
            >GitHub</a
          >
          <a
            :href="links.gitee"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
            >Gitee</a
          >
          <a
            :href="links.atomgit"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
            >AtomGit</a
          >
          <a
            :href="links.qq"
            target="_blank"
            rel="noopener"
            class="btn btn-ghost"
            >QQ 群</a
          >
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="relative z-10 border-t border-line/30">
      <div
        class="flex items-center justify-center max-w-6xl gap-3 px-4 py-6 mx-auto text-xs text-ink3 sm:px-6"
      >
        <div>© XiHanFun · MIT License · 曦寒懿</div>
      </div>
    </footer>
  </div>
</template>
