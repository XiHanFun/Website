<script setup lang="ts">
import GridBackground from './components/GridBackground.vue'
import ParticlesBackground from './components/ParticlesBackground.vue'
import FloatingCodeWindow from './components/FloatingCodeWindow.vue'
import { useScrollAnimation } from './composables/useScrollAnimation'

const products = [
  {
    title: 'XiHan.Framework',
    subtitle: '开发框架',
    desc: '基于 .NET 10 的模块化后端框架，支持 DDD、CQRS、多租户、AI 集成。动态 API 生成、SqlSugar 仓储、混合缓存、事件总线一应俱全。40+ 模块，分层清晰，依赖可追踪。',
    features: ['动态 API', '多租户', 'AI 集成', '混合缓存'],
    link: 'https://framework.xihanfun.com',
    doc: 'https://docs.xihanfun.com/cosmos/framework',
  },
  {
    title: 'XiHan.UI',
    subtitle: '视图组件',
    desc: '基于 Vue 3 的企业级组件库，11 个子包、55+ 组件，支持树摇按需、主题定制、多语言。TypeScript 支持，可统一引入也可按需引入。',
    features: ['55+ 组件', '11 子包', '主题系统', '按需引入'],
    link: 'https://ui.xihanfun.com',
    doc: 'https://docs.xihanfun.com/cosmos/ui',
  },
  {
    title: 'XiHan.BasicApp',
    subtitle: '基础应用',
    desc: '模块化企业管理系统，基于 Framework 与 UI 构建。RBAC 权限、代码生成、系统升级开箱即用，支持 DDD 分层、多租户、分布式部署，前后分离可水平扩展。',
    features: ['RBAC', '代码生成', '系统升级', '多租户'],
    link: 'https://basicapp.xihanfun.com',
    doc: 'https://docs.xihanfun.com/cosmos/basic-app',
  },
]

const frameworkLayers = [
  { name: '核心', items: ['Core', 'Utils', 'Metadata'], desc: '模块系统、依赖注入、生命周期、配置与选项模式' },
  { name: '应用', items: ['Application', 'Application.Contracts'], desc: 'CRUD、DTO 映射、批量操作、自动查询分页' },
  { name: '领域', items: ['Domain', 'Domain.Shared'], desc: 'DDD 模式、实体审计、领域事件、查询过滤器' },
  { name: '基础设施', items: ['Data', 'Caching', 'Auth', 'Messaging', 'AI', 'Bot'], desc: 'SqlSugar 仓储、混合缓存 L1/L2、多租户、事件总线' },
  { name: '展示', items: ['Web.Api', 'Web.Core', 'Web.Docs', 'Web.Gateway', 'Web.RealTime'], desc: '动态 API、Swagger、网关、SignalR' },
]

const frameworkFeatures = [
  { title: '动态 API', items: ['[DynamicApi] 自动生成 REST 控制器', '方法名映射 HTTP 动词', 'XML 注释生成 OpenAPI'] },
  { title: 'AI 集成', items: ['Semantic Kernel 1.72', 'Kernel Memory RAG', 'OpenAI / Ollama', 'Qdrant / Redis 向量库'] },
  { title: '数据访问', items: ['Repository 模式', '实体基类审计', '软删除', 'UoW 事务'] },
  { title: 'HTTP 客户端', items: ['Polly 重试与熔断', '代理池管理', '请求日志'] },
  { title: '混合缓存', items: ['L1 内存 + L2 Redis', '租户隔离 Key', 'UoW 联动失效'] },
  { title: '其他', items: ['本地化', 'Elasticsearch 搜索', '虚拟文件系统', 'Scriban 模板', '可观测性'] },
]

const links = {
  docs: 'https://docs.xihanfun.com',
  github: 'https://github.com/XiHanFun',
  gitee: 'https://gitee.com/XiHanFun',
  nuget: 'https://www.nuget.org/profiles/XiHanFun',
  npm: 'https://www.npmjs.com/org/xihan-ui',
  qq: 'https://qm.qq.com/q/qYp1Urv3z2',
}

const uiComponentGroups = [
  { name: '基础', items: ['Button', 'Icon', 'Input', 'Form', 'Select', 'Radio', 'Checkbox', 'Switch'] },
  { name: '布局', items: ['Row', 'Col', 'Space', 'Divider'] },
  { name: '数据', items: ['Table', 'Tree', 'TreeSelect', 'Pagination', 'Transfer'] },
  { name: '反馈', items: ['Message', 'Notification', 'Drawer', 'Progress', 'Skeleton'] },
  { name: '导航', items: ['Menu', 'Tabs', 'Breadcrumb', 'Anchor', 'Steps'] },
]

const uiPackages = [
  { name: '@xihan-ui/constants', desc: '共享常量' },
  { name: '@xihan-ui/utils', desc: '工具函数' },
  { name: '@xihan-ui/themes', desc: '主题引擎、样式编译' },
  { name: '@xihan-ui/hooks', desc: '组合式 Hooks' },
  { name: '@xihan-ui/icons', desc: '图标生成与加载' },
  { name: '@xihan-ui/locales', desc: 'i18n 多语言' },
  { name: '@xihan-ui/directives', desc: '指令' },
  { name: '@xihan-ui/plugins', desc: '事件总线、插件' },
  { name: '@xihan-ui/components', desc: '55+ 组件' },
]

const basicAppFeatures = [
  {
    name: 'RBAC 权限',
    items: ['用户角色', '权限矩阵', '资源操作', '菜单导航', '部门数据范围'],
    desc: '用户管理、角色层级、权限矩阵、资源与操作类型、菜单导航、部门结构与数据范围过滤、授权缓存',
  },
  {
    name: '代码生成',
    items: ['模板管理', '实体脚手架', 'CRUD 生成', '自定义模板'],
    desc: '模板管理、实体脚手架、CRUD 代码生成、自定义模板，提升开发效率',
  },
  {
    name: '系统升级',
    items: ['版本迁移', '数据转换', '向后兼容'],
    desc: '版本迁移、数据转换、向后兼容，平滑升级',
  },
]

const basicAppModules = [
  { name: 'XiHan.BasicApp.Core', desc: '聚合 25+ Framework 包：认证、缓存、数据、多租户、事件总线等' },
  { name: 'XiHan.BasicApp.Web.Core', desc: 'Web API、Swagger、网关、SignalR 实时通信' },
  { name: 'XiHan.BasicApp.Rbac', desc: '4 子项目：Domain、Application、Contracts、EFCore' },
  { name: 'XiHan.BasicApp.CodeGeneration', desc: '4 子项目：模板与代码生成引擎' },
  { name: 'XiHan.BasicApp.Upgrade', desc: '版本迁移与数据转换' },
]

const productsVisible = useScrollAnimation(0.1)
const frameworkVisible = useScrollAnimation(0.1)
const quickStartVisible = useScrollAnimation(0.1)
const communityVisible = useScrollAnimation(0.1)
</script>

<template>
  <div class="min-h-screen bg-[#050508] overflow-x-hidden">
    <!-- 背景层 -->
    <div class="fixed inset-0 z-0">
      <GridBackground />
      <ParticlesBackground />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050508]/90 pointer-events-none" />
    </div>

    <!-- 导航 -->
    <header class="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
      <nav class="max-w-7xl mx-auto flex items-center justify-between glass rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 border border-cyan-500/10 shadow-neon-cyan/20">
        <a href="#" class="flex items-center shrink-0">
          <img src="/assets/logo.png" alt="曦寒" class="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-contain hover:opacity-90 transition-opacity" />
        </a>
        <div class="flex items-center flex-wrap justify-end gap-2 sm:gap-4 lg:gap-6 text-xs sm:text-sm min-w-0">
          <a :href="links.docs" target="_blank" rel="noopener" class="text-slate-400 hover:text-cyan-400 transition-colors">文档</a>
          <a href="#products" class="text-slate-400 hover:text-cyan-400 transition-colors">产品</a>
          <a href="#framework" class="text-slate-400 hover:text-cyan-400 transition-colors">架构</a>
          <a href="#community" class="text-slate-400 hover:text-cyan-400 transition-colors">社区</a>
          <a :href="links.github" target="_blank" rel="noopener" class="text-slate-400 hover:text-cyan-400 transition-colors">GitHub</a>
          <a :href="links.gitee" target="_blank" rel="noopener" class="text-slate-400 hover:text-cyan-400 transition-colors">Gitee</a>
          <a :href="links.docs" target="_blank" rel="noopener" class="px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-300 hover:border-cyan-400/50 hover:shadow-neon-cyan transition-all duration-300 font-medium shrink-0">
            快速开始
          </a>
        </div>
      </nav>
    </header>

    <!-- Hero -->
    <section class="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 pb-8">
      <div class="relative z-10 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 sm:gap-16 lg:gap-24">
        <div class="flex-1 text-center lg:text-left w-full">
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4 sm:mb-6 animate-fade-in">
            <span class="text-gradient-neon animate-glow-cyan">曦寒</span>
          </h1>
          <p class="text-base sm:text-xl lg:text-2xl text-slate-400 mb-4 sm:mb-6 animate-slide-up" style="animation-delay: 0.1s">
            快速、轻量、高效、用心 · 企业级开发框架与组件库
          </p>
          <p class="text-slate-500 text-sm sm:text-base mb-6 sm:mb-8 animate-slide-up" style="animation-delay: 0.2s">
            基于 .NET 10 与 Vue 3 · 40+ 模块 · 55+ 组件 · 企业级解决方案
          </p>
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 animate-slide-up" style="animation-delay: 0.3s">
            <a :href="links.docs" target="_blank" rel="noopener" class="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 font-medium text-sm sm:text-base">
              查看文档
            </a>
            <a :href="links.github" target="_blank" rel="noopener" class="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-white/[0.04] border border-white/[0.12] text-slate-300 hover:bg-white/[0.08] hover:border-cyan-400/30 hover:text-cyan-300 transition-all duration-300 font-medium text-sm sm:text-base">
              GitHub
            </a>
            <a :href="links.gitee" target="_blank" rel="noopener" class="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-white/[0.04] border border-white/[0.12] text-slate-300 hover:bg-white/[0.08] hover:border-cyan-400/30 hover:text-cyan-300 transition-all duration-300 font-medium text-sm sm:text-base">
              Gitee
            </a>
          </div>
        </div>
        <div class="flex-1 relative w-full max-w-xl flex flex-col gap-3 sm:gap-5 min-w-0">
          <FloatingCodeWindow
            title="Framework"
            :code="`dotnet add package XiHan.Framework.Core
dotnet add package XiHan.Framework.Application
dotnet add package XiHan.Framework.Application.Contracts
dotnet add package XiHan.Framework.Data
dotnet add package XiHan.Framework.Web.Api`"
            :delay="0"
            :float-offset="-12"
            class="animate-float"
          />
          <FloatingCodeWindow
            title="UI Components"
            :code="`pnpm add @xihan-ui/components

import { XhButton, XhInput, XhForm } from '@xihan-ui/components'

// 或按需引入
import { XhButton } from '@xihan-ui/components'`"
            :delay="200"
            :float-offset="-8"
            class="animate-float-slow"
          />
          <FloatingCodeWindow
            title="BasicApp"
            :code="`// 克隆并运行
git clone https://github.com/XiHanFun/XiHan.BasicApp
cd XiHan.BasicApp/backend
dotnet run`"
            :delay="400"
            :float-offset="-6"
            class="animate-float"
          />
        </div>
      </div>
    </section>

    <!-- 产品 -->
    <section id="products" ref="productsVisible.el" class="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 transition-all duration-700" :class="productsVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          <span class="text-gradient-neon">三大产品</span>
        </h2>
        <p class="text-slate-500 text-center mb-8 sm:mb-10 max-w-2xl mx-auto text-xs sm:text-sm transition-all duration-700 delay-100" :class="productsVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          从后端框架、前端组件到完整应用，一站式企业级开发解决方案
        </p>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <article
            v-for="(p, i) in products"
            :key="i"
            class="group glass-hologram p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:border-cyan-400/30 transition-all duration-500"
            :class="productsVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            :style="{ transitionDelay: `${200 + i * 100}ms` }"
          >
            <h3 class="text-xl font-semibold text-white mb-1">{{ p.title }}</h3>
            <div class="text-cyan-400 text-sm font-medium mb-3">{{ p.subtitle }}</div>
            <p class="text-slate-400 text-sm mb-4 leading-relaxed">{{ p.desc }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="f in p.features" :key="f" class="px-3 py-1 rounded-lg bg-white/[0.05] text-slate-400 text-xs border border-white/[0.06]">{{ f }}</span>
            </div>
            <div class="flex gap-4">
              <a :href="p.link" target="_blank" rel="noopener" class="text-cyan-400 hover:text-cyan-300 font-medium text-sm">在线体验</a>
              <a :href="p.doc" target="_blank" rel="noopener" class="text-slate-500 hover:text-slate-400 text-sm">文档</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Framework 架构 -->
    <section id="framework" ref="frameworkVisible.el" class="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-2 transition-all duration-700" :class="frameworkVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          <span class="text-gradient-neon">Framework 架构</span>
        </h2>
        <p class="text-slate-500 text-center mb-8 sm:mb-10 text-xs sm:text-sm transition-all duration-700 delay-100" :class="frameworkVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          模块化分层，依赖可追踪，展示层、应用层、领域层、基础设施、核心各司其职
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div
            v-for="(layer, i) in frameworkLayers"
            :key="i"
            class="glass-hologram p-3 sm:p-5 rounded-lg sm:rounded-xl hover:border-cyan-400/25 transition-all duration-500"
            :class="frameworkVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            :style="{ transitionDelay: `${200 + i * 80}ms` }"
          >
            <div class="text-cyan-400 font-semibold mb-2">{{ layer.name }}</div>
            <div class="text-slate-400 text-xs space-y-1 mb-2">
              <span v-for="item in layer.items" :key="item" class="block">{{ item }}</span>
            </div>
            <p class="text-slate-500 text-xs leading-relaxed">{{ layer.desc }}</p>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6">
          <div
            v-for="(feat, i) in frameworkFeatures"
            :key="i"
            class="glass-hologram p-3 sm:p-4 rounded-lg sm:rounded-xl hover:border-cyan-400/20 transition-all duration-500"
            :class="frameworkVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            :style="{ transitionDelay: `${400 + i * 60}ms` }"
          >
            <div class="text-purple-400 font-medium text-sm mb-2">{{ feat.title }}</div>
            <ul class="text-slate-500 text-xs space-y-1">
              <li v-for="item in feat.items" :key="item" class="flex items-start gap-1.5">
                <span class="text-cyan-500/70 shrink-0">·</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
        <p class="text-center text-slate-500 text-xs mt-6">.NET 10 · SqlSugar · Serilog · MediatR · Swagger · Redis · Semantic Kernel · Polly · Elasticsearch</p>
      </div>
    </section>

    <!-- UI 组件 -->
    <section class="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2">
          <span class="text-gradient-neon">UI 组件</span>
        </h2>
        <p class="text-slate-500 text-center mb-6 sm:mb-8 text-xs sm:text-sm">55+ 组件，11 子包，主题引擎、i18n、图标系统、事件总线，pnpm + Turborepo + unbuild</p>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          <div
            v-for="(g, i) in uiComponentGroups"
            :key="i"
            class="glass-hologram p-3 sm:p-4 rounded-lg sm:rounded-xl hover:border-purple-400/25 transition-all duration-500"
          >
            <div class="text-cyan-400 font-medium text-sm mb-2">{{ g.name }}</div>
            <div class="text-slate-500 text-xs flex flex-wrap gap-1">
              <span v-for="c in g.items" :key="c" class="px-2 py-0.5 rounded bg-white/[0.04]">{{ c }}</span>
            </div>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
          <div
            v-for="(pkg, i) in uiPackages"
            :key="i"
            class="glass-hologram px-3 py-2.5 rounded-lg hover:border-purple-400/20 transition-all duration-500"
          >
            <div class="font-mono text-purple-400/90 text-xs truncate">{{ pkg.name }}</div>
            <div class="text-slate-500 text-xs mt-0.5">{{ pkg.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- BasicApp 功能 -->
    <section class="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2">
          <span class="text-gradient-neon">BasicApp 功能</span>
        </h2>
        <p class="text-slate-500 text-center mb-6 sm:mb-8 text-xs sm:text-sm">开箱即用，25+ 功能页面，DDD 分层、多租户、分布式、无状态后端、SignalR 实时通信</p>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div
            v-for="(f, i) in basicAppFeatures"
            :key="i"
            class="glass-hologram p-4 sm:p-6 rounded-xl hover:border-cyan-400/25 transition-all duration-500"
          >
            <div class="text-purple-400 font-semibold mb-2">{{ f.name }}</div>
            <div class="text-slate-400 text-sm space-y-1 mb-3">
              <span v-for="item in f.items" :key="item" class="block">{{ item }}</span>
            </div>
            <p class="text-slate-500 text-xs leading-relaxed">{{ f.desc }}</p>
          </div>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          <div
            v-for="(m, i) in basicAppModules"
            :key="i"
            class="glass-hologram p-3 sm:p-4 rounded-lg hover:border-cyan-400/20 transition-all duration-500"
          >
            <div class="font-mono text-cyan-400/90 text-xs mb-1.5 truncate" :title="m.name">{{ m.name }}</div>
            <div class="text-slate-500 text-xs leading-relaxed">{{ m.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section ref="quickStartVisible.el" class="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 transition-all duration-700" :class="quickStartVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          <span class="text-gradient-neon">快速开始</span>
        </h2>
        <p class="text-slate-500 mb-8 text-sm transition-all duration-700 delay-100" :class="quickStartVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          后端 NuGet、前端 npm，文档齐全
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <a :href="links.nuget" target="_blank" rel="noopener" class="glass-hologram px-4 py-3 sm:px-6 sm:py-4 rounded-xl hover:border-cyan-400/30 transition-all duration-500 text-left group">
            <span class="text-slate-500 text-xs block mb-1">后端</span>
            <span class="font-mono text-cyan-400 text-sm group-hover:text-cyan-300">dotnet add package XiHan.Framework.*</span>
          </a>
          <a :href="links.npm" target="_blank" rel="noopener" class="glass-hologram px-4 py-3 sm:px-6 sm:py-4 rounded-xl hover:border-purple-400/30 transition-all duration-500 text-left group">
            <span class="text-slate-500 text-xs block mb-1">前端</span>
            <span class="font-mono text-purple-400 text-sm group-hover:text-purple-300">pnpm add @xihan-ui/components</span>
          </a>
        </div>
        <a :href="links.docs" target="_blank" rel="noopener" class="inline-block mt-6 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">查看完整文档 →</a>
      </div>
    </section>

    <!-- 社区 -->
    <section id="community" ref="communityVisible.el" class="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 transition-all duration-700" :class="communityVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          <span class="text-gradient-neon">加入社区</span>
        </h2>
        <p class="text-slate-500 mb-8 text-sm transition-all duration-700 delay-100" :class="communityVisible.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
          开源项目，MIT 许可，欢迎贡献
        </p>
        <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
          <a :href="links.github" target="_blank" rel="noopener" class="glass-hologram px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-white text-xs sm:text-sm hover:border-cyan-400/40 hover:shadow-neon-cyan transition-all duration-500 border border-white/[0.08]">
            GitHub
          </a>
          <a :href="links.gitee" target="_blank" rel="noopener" class="glass-hologram px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-white text-xs sm:text-sm hover:border-cyan-400/40 transition-all duration-500 border border-white/[0.08] bg-[#c71d23]/20">
            Gitee
          </a>
          <a :href="links.qq" target="_blank" rel="noopener" class="glass-hologram px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-white text-xs sm:text-sm hover:border-cyan-400/40 transition-all duration-500 border border-white/[0.08] bg-[#12b7f5]/20">
            QQ 群
          </a>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="relative z-10 py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 text-center sm:text-left">
        <div>© XiHanFun · MIT License · 曦寒懿</div>
        <div class="flex items-center gap-4 sm:gap-8">
          <a :href="links.docs" target="_blank" rel="noopener" class="hover:text-cyan-400 transition-colors">文档</a>
          <a :href="links.github" target="_blank" rel="noopener" class="hover:text-cyan-400 transition-colors">GitHub</a>
          <a :href="links.gitee" target="_blank" rel="noopener" class="hover:text-cyan-400 transition-colors">Gitee</a>
        </div>
      </div>
    </footer>
  </div>
</template>
