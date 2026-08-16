export interface Pillar {
  name: string
  desc: string
  items: string[]
}

export const pillars: Pillar[] = [
  {
    name: '权限三层',
    desc: '功能、数据范围到字段三层叠加，越权请求在服务端拦截，请求落库前自动脱敏。',
    items: ['RBAC 功能权限码', 'ABAC 数据范围', '字段级安全脱敏', '授权申请与变更审计'],
  },
  {
    name: '多租户',
    desc: '邮箱全局唯一登录，登录后智能落点，超管可切入任意租户代管。',
    items: ['登录后选租户', '平台态运维', '版本白名单门控', '开通一站式', '切租户轮换令牌'],
  },
  {
    name: '工程能力',
    desc: '导入表即近乎零配置生成全栈代码，重新生成不冲掉手写实现。',
    items: [
      '全栈代码生成',
      '工作流设计器',
      '企业级消息中心',
      '七类审计日志',
      '链路追踪时间线',
      '升级引擎与维护模式',
      '模块可插拔卸载',
      '网关灰度发布',
    ],
  },
]

export interface AppModule {
  name: string
  desc: string
}

export const modules: AppModule[] = [
  { name: 'XiHan.BasicApp.Core', desc: '聚合 Framework 多包：认证 / 缓存 / 数据 / 多租户 / 事件总线' },
  { name: 'XiHan.BasicApp.Web.Core', desc: '动态 API、Scalar、SignalR、网关与灰度路由' },
  { name: 'XiHan.BasicApp.Saas', desc: '用户 / 角色 / 权限 / 租户 / 配置 / 字典 / 消息 / 日志 / 任务' },
  { name: 'XiHan.BasicApp.CodeGeneration', desc: '多数据源导入、配置推断、树表主子表模板，产物可下载或写入项目、不冲掉手写实现' },
  { name: 'XiHan.BasicApp.AI', desc: 'AI Provider 库化管理、RAG 知识库、可配置 AI 助手与 MCP Server' },
  { name: 'XiHan.BasicApp.Workflow', desc: '工作流定义与实例、可视化设计器、运行态追踪与审批流转' },
  { name: 'XiHan.BasicApp.Chat', desc: '单聊群聊、语音消息、群治理与敏感词，前后端均可整体卸载' },
  { name: 'XiHan.BasicApp.Printing', desc: '打印模板设计器、数据源注册表与租户隔离模板存储' },
  { name: 'XiHan.BasicApp.WebHost', desc: '启动入口，聚合所有模块' },
]

export const auditKinds = [
  '操作日志',
  '登录日志',
  '访问日志',
  '异常日志',
  '数据变更日志',
  '权限变更日志',
  '开放接口日志',
]

export const frontendStack = [
  'Vue 3.5',
  'TypeScript',
  'Vite',
  'Pinia',
  'Vue Router',
  'Tailwind CSS v4',
  'Naive UI',
  'SignalR',
]

export const quickStart = `# 后端：克隆后直接跑
git clone https://github.com/XiHanFun/XiHan.BasicApp
cd XiHan.BasicApp/backend/src/main/XiHan.BasicApp.WebHost
dotnet run

# 前端：另开一个终端
cd XiHan.BasicApp/frontend
pnpm install && pnpm dev`
