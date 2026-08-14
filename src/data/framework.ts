export interface Layer {
  name: string
  en: string
  desc: string
  items: string[]
}

export const layers: Layer[] = [
  {
    name: '展示',
    en: 'Presentation',
    desc: '动态 API、网关与灰度、SignalR 实时、gRPC、Scalar 文档、MCP 服务端',
    items: ['Web.Api', 'Web.Core', 'Web.Gateway', 'Web.RealTime', 'Web.Grpc', 'Web.Docs', 'Web.Mcp'],
  },
  {
    name: '基础设施',
    en: 'Infrastructure',
    desc: 'SqlSugar 仓储、混合缓存 L1/L2、分布式事件总线、工作流引擎、后台作业、审计、可观测性、AI、多租户、机器人通道',
    items: [
      'Data',
      'Caching',
      'Authentication',
      'Authorization',
      'EventBus',
      'Workflow',
      'Tasks',
      'Auditing',
      'Observability',
      'AI',
      'Bot',
      'MultiTenancy',
      'SearchEngines',
      'ObjectStorage',
      'Uow',
    ],
  },
  {
    name: '领域',
    en: 'Domain',
    desc: 'DDD 模式、实体审计、领域事件、查询过滤',
    items: ['Domain', 'Domain.Shared'],
  },
  {
    name: '应用',
    en: 'Application',
    desc: 'CRUD、DTO 映射、批量操作、自动分页',
    items: ['Application', 'Application.Contracts'],
  },
  {
    name: '核心',
    en: 'Core',
    desc: '模块系统、依赖注入、生命周期、配置选项、通用工具',
    items: ['Core', 'Utils', 'Metadata', 'Analyzers'],
  },
]

export interface Capability {
  title: string
  items: string[]
}

export const capabilities: Capability[] = [
  {
    title: '动态 API',
    items: ['[DynamicApi] 自动生成 REST', '方法名映射 HTTP 动词', 'Scalar 文档界面'],
  },
  {
    title: '自研事件总线',
    items: ['进程内与分布式事件', 'RabbitMQ / Kafka / Redis Broker', '处理器工厂与工作单元联动'],
  },
  {
    title: '工作流引擎',
    items: ['契约与实现分包', '书签驱动与波次隔离', '可视化设计器'],
  },
  {
    title: '混合缓存',
    items: ['L1 内存 + L2 Redis', '租户隔离 Key', 'UoW 失效联动'],
  },
  {
    title: 'AI 集成',
    items: ['Microsoft.Extensions.AI', 'Model Context Protocol', 'RAG 与向量检索'],
  },
  {
    title: '数据与事务',
    items: ['SqlSugar 仓储', '实体审计与软删除', 'UoW 工作单元'],
  },
  {
    title: '韧性与可观测',
    items: ['OpenTelemetry / W3C 链路追踪', 'HTTP / DB / MQ / Redis 全链路 span', 'Polly 重试熔断、限流与指标导出'],
  },
  {
    title: '多租户',
    items: ['库 / 表 / 字段三档隔离', '租户解析与连接串路由', '写路径租户守卫'],
  },
  {
    title: '通道与推送',
    items: ['邮件 / 短信统一契约', 'Telegram / 钉钉 / 飞书 / 企微', '配置全部落库，不写 appsettings'],
  },
]

export const techStack = [
  '.NET 10',
  'SqlSugar',
  'Serilog',
  'Scalar',
  'Redis',
  'RabbitMQ',
  'Kafka',
  'OpenTelemetry',
  'Microsoft.Extensions.AI',
  'Model Context Protocol',
  'Polly',
  'Elasticsearch',
  'gRPC',
  'SignalR',
]

export const dynamicApiSample = `// 继承 CRUD 基类，标一个特性，增删改查的 REST 端点就都在了
[Authorize]
[DynamicApi(Group = "MyApp.Blog", GroupName = "博客服务", Tag = "文章")]
public sealed class ArticleAppService : CrudApplicationServiceBase<
    Article, ArticleDto, long, ArticleCreateDto, ArticleUpdateDto, ArticlePageRequestDto>
{
    private readonly IDistributedEventBus _eventBus;

    public ArticleAppService(IRepositoryBase<Article, long> repository, IDistributedEventBus eventBus)
        : base(repository)
    {
        _eventBus = eventBus;
    }

    // 方法名前缀决定 HTTP 动词：Get → GET，Create → POST，Update → PUT，Delete → DELETE
    [UnitOfWork(true)]
    [PermissionAuthorize(BlogPermissionCodes.Article.Publish)]
    public async Task<ArticleDto> PublishAsync(long id, CancellationToken cancellationToken = default)
    {
        var article = await Repository.GetAsync(id, cancellationToken);
        article.Publish();

        // 事件在工作单元提交之后才真正投出去
        await _eventBus.PublishAsync(new ArticlePublishedEvent(article.Id), cancellationToken);
        return ArticleMapper.ToDto(article);
    }
}`

export const moduleSample = `// 模块之间只声明依赖，装配顺序由模块系统按依赖图推导
[DependsOn(
    typeof(XiHanDataModule),
    typeof(XiHanCachingModule),
    typeof(XiHanEventBusModule),
    typeof(XiHanMultiTenancyModule)
)]
public class MyAppModule : XiHanModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        var services = context.Services;

        services.AddMyAppDomainServices();
        services.AddMyAppDataSeeders();
    }
}`
