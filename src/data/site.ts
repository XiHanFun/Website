export const links = {
  docs: 'https://docs.xihanfun.com',
  frameworkDocs: 'https://framework.docs.xihanfun.com',
  uiDocs: 'https://ui.docs.xihanfun.com',
  basicappDocs: 'https://basicapp.docs.xihanfun.com',
  basicappDemo: 'https://basicapp.xihanfun.com',
  github: 'https://github.com/XiHanFun',
  gitee: 'https://gitee.com/XiHanFun',
  gitcode: 'https://gitcode.com/XiHanFun',
  nuget: 'https://www.nuget.org/profiles/XiHanFun',
  npm: 'https://www.npmjs.com/org/xihan-ui',
  qq: 'https://qm.qq.com/q/qYp1Urv3z2',
} as const

export const nav = [
  { to: '/', label: '首页' },
  { to: '/framework', label: '框架' },
  { to: '/ui', label: '组件' },
  { to: '/basicapp', label: '中后台' },
] as const

/** 三处镜像同步维护，Issue 与 PR 在哪一处提都收得到。 */
export const repos = [
  { label: 'GitHub', href: 'https://github.com/XiHanFun' },
  { label: 'Gitee', href: 'https://gitee.com/XiHanFun' },
  { label: 'GitCode', href: 'https://gitcode.com/XiHanFun' },
] as const

export interface Product {
  fig: string
  route: string
  title: string
  /** 生态位：后端基座 / 前端基座 / 基础应用 */
  subtitle: string
  /** 发布阶段，不写具体版本号 */
  status: string
  /** 定位句，与三仓对外文案一致 */
  tagline: string
  /** 首页卡片用的一段短说明 */
  summary: string
  desc: string
  features: string[]
  demo: string | null
  doc: string
  repo: string
}

export const products: Product[] = [
  {
    fig: '01',
    route: '/framework',
    title: 'XiHan.Framework',
    subtitle: '后端基座',
    status: '稳定版',
    tagline: '快速、轻量、高效、用心的 .NET 现代模块化开发框架',
    summary: '模块按依赖图装配，应用服务经动态 API 直接暴露为接口；多租户、工作流、事件总线与 AI 集成开箱可用，优先使用 .NET 原生能力。',
    desc: '从核心、应用、领域、基础设施到展示分层清晰。动态 API、自研事件总线（可切 RabbitMQ / Kafka / Redis）、工作流引擎、后台作业、混合缓存、多租户、OAuth2 与 OIDC、搜索引擎、OpenTelemetry 链路追踪与 AI 集成一体提供。',
    features: ['模块化', '动态 API', '多租户', '工作流', 'OIDC', '链路追踪'],
    demo: 'https://framework.xihanfun.com',
    doc: 'https://framework.docs.xihanfun.com',
    repo: 'https://github.com/XiHanFun/XiHan.Framework',
  },
  {
    fig: '02',
    route: '/ui',
    title: 'XiHan.UI',
    subtitle: '前端基座',
    status: '稳定版',
    tagline: '快速、轻量、高效、用心的框架无关 Headless UI 组件库',
    summary: '状态机与无障碍逻辑沉在无头内核，Vue、React 与 Web Components 三套适配器共用同一份行为；基础组件与 AI 组件覆盖从中后台到 AI 对话的界面。',
    desc: '内核与状态机不绑定任何框架，Vue、React 与 Web Components 各自作为适配器接入同一套无头内核。定位引擎、状态机、图表引擎、代码高亮、WebGL 背景、程序化音效全部自研，底层包不引第三方运行时依赖。',
    features: ['Headless', '框架无关', '多框架适配', 'AI 组件', '无第三方运行时'],
    demo: null,
    doc: 'https://ui.docs.xihanfun.com',
    repo: 'https://github.com/XiHanFun/XiHan.UI',
  },
  {
    fig: '03',
    route: '/basicapp',
    title: 'XiHan.BasicApp',
    subtitle: '基础应用',
    status: '稳定版',
    tagline: '基于 XiHan.Framework 和 XiHan.UI 的超高颜值通用中后台内核',
    summary: 'RBAC + ABAC 混合权限、多租户隔离、代码生成、实时通信与 AI 能力开箱即用，克隆下来前后端各一条命令就能跑起来。',
    desc: 'RBAC + ABAC + 字段级安全、代码生成、工作流设计器、在线聊天（含语音消息）与 AI 助手、消息中心、审计日志、链路追踪、AI 知识库开箱即用，前端整体基于 XiHan.UI 构建，DDD 分层、前后分离、可水平扩展。',
    features: ['多租户', 'RBAC+ABAC', '代码生成', '七类审计', '链路追踪', 'AI 知识库'],
    demo: 'https://basicapp.xihanfun.com',
    doc: 'https://basicapp.docs.xihanfun.com',
    repo: 'https://github.com/XiHanFun/XiHan.BasicApp',
  },
]

/** 首页「为什么能放心采用」：每条都能在产品仓库当前公开事实里查到 */
export const trust = [
  {
    kind: 'modules',
    title: '模块化，按需引用',
    text: '后端按包引用，前端按角色装包。不用的部分不进产物，依赖清单一眼可查。',
  },
  {
    kind: 'permission',
    title: '权限做到字段级',
    text: 'RBAC 功能权限、ABAC 数据范围与字段级脱敏三层叠加，越权请求在服务端拦截。',
  },
  {
    kind: 'tenants',
    title: '多租户写进数据层',
    text: '默认字段级隔离，也支持按租户独立数据库；平台与租户的数据边界由框架守住。',
  },
  {
    kind: 'trace',
    title: '全链路可追踪',
    text: 'OpenTelemetry 链路贯穿请求、数据库、消息与缓存；审计日志落库，可按 TraceId 跨类型聚合。',
  },
  {
    kind: 'a11y',
    title: '无障碍是判据',
    text: '组件键盘交互按 W3C APG 实现，无障碍扫描跑在真实 Chromium 上。本站就是用它搭的。',
  },
  {
    kind: 'open',
    title: 'MIT 开源，没有功能墙',
    text: '全部代码开源，没有企业版；GitHub、Gitee、GitCode 三处同步维护。',
  },
] as const
