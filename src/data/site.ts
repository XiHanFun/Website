export const links = {
  docs: 'https://docs.xihanfun.com',
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
  idx: string
  route: string
  title: string
  subtitle: string
  status: string
  stable: boolean
  desc: string
  features: string[]
  demo: string | null
  doc: string
}

export const products: Product[] = [
  {
    idx: '01',
    route: '/framework',
    title: 'XiHan.Framework',
    subtitle: '后端框架',
    status: 'v4.2.0',
    stable: true,
    desc: '基于 .NET 10 的模块化后端框架，66 个模块从核心、应用、领域、基础设施到展示分层清晰。动态 API、自研事件总线（可切 RabbitMQ / Kafka / Redis）、工作流引擎、后台作业、混合缓存、多租户、OAuth2 与 OIDC、搜索引擎、OpenTelemetry 链路追踪与 AI 集成一体提供。',
    features: ['66 模块', '动态 API', '多租户', '工作流', 'OIDC', '链路追踪'],
    demo: 'https://framework.xihanfun.com',
    doc: 'https://framework.docs.xihanfun.com',
  },
  {
    idx: '02',
    route: '/ui',
    title: 'XiHan.UI',
    subtitle: '设计系统运行时',
    status: 'v1.1.0',
    stable: true,
    desc: '框架无关的设计系统运行时：18 个包已发布 npm，内核与状态机不绑定任何框架，Vue 与 Web Components 各自作为适配器接入同一套无头内核。定位引擎、状态机、代码高亮、WebGL 背景、程序化音效全部自研，底层包不引第三方运行时依赖。',
    features: ['18 包', '121 组件', '框架无关', '双适配器', '无第三方运行时'],
    demo: null,
    doc: 'https://ui.docs.xihanfun.com',
  },
  {
    idx: '03',
    route: '/basicapp',
    title: 'XiHan.BasicApp',
    subtitle: '多租户中后台',
    status: 'v5.1.0',
    stable: true,
    desc: '基于 Framework 与 UI 构建的多租户中后台。RBAC + ABAC + 字段级安全、代码生成、工作流设计器、在线聊天（含语音消息）与 AI 助手、消息中心、七类审计、链路追踪、AI 知识库开箱即用，前端整体基于 XiHan.UI 构建，DDD 分层、前后分离、可水平扩展。',
    features: ['多租户', 'RBAC+ABAC', '代码生成', '七类审计', '链路追踪', 'AI 知识库'],
    demo: 'https://basicapp.xihanfun.com',
    doc: 'https://basicapp.docs.xihanfun.com',
  },
]

export interface Stat {
  label: string
  value: number
  suffix: string
  note: string
}

export const stats: Stat[] = [
  { label: '后端模块', value: 66, suffix: '个', note: 'XiHan.Framework' },
  { label: '前端组件', value: 121, suffix: '个', note: 'XiHan.UI' },
  { label: '前端子包', value: 18, suffix: '个', note: '已发布 npm' },
  { label: '代码托管', value: 3, suffix: '处', note: 'GitHub / Gitee / GitCode' },
]
