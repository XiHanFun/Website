import{v as m,_,a as y,b as g}from"./reveal-BJd8TtyI.js";import{_ as b}from"./DiagramFramework.vue_vue_type_script_setup_true_lang-DQHHObtW.js";import{_ as S}from"./PageHero.vue_vue_type_script_setup_true_lang-BX8-GVfK.js";import{d as k,p as T,c as t,i as o,j as d,k as l,b as e,m as v,F as c,r as p,o as s,h,l as D,q as n}from"./index-CpeoO5ZO.js";const M=[{name:"展示",en:"Presentation",desc:"动态 API、网关与灰度、SignalR 实时、gRPC、Scalar 文档、MCP 服务端",items:["Web.Api","Web.Core","Web.Gateway","Web.RealTime","Web.Grpc","Web.Docs","Web.Mcp"]},{name:"基础设施",en:"Infrastructure",desc:"SqlSugar 仓储、混合缓存 L1/L2、分布式事件总线、工作流引擎、后台作业、审计、可观测性、AI、多租户、机器人通道",items:["Data","Caching","Authentication","Authorization","EventBus","Workflow","Tasks","Auditing","Observability","AI","Bot","MultiTenancy","SearchEngines","ObjectStorage","Uow"]},{name:"领域",en:"Domain",desc:"DDD 模式、实体审计、领域事件、查询过滤",items:["Domain","Domain.Shared"]},{name:"应用",en:"Application",desc:"CRUD、DTO 映射、批量操作、自动分页",items:["Application","Application.Contracts"]},{name:"核心",en:"Core",desc:"模块系统、依赖注入、生命周期、配置选项、通用工具",items:["Core","Utils","Metadata","Analyzers"]}],P=[{title:"动态 API",items:["[DynamicApi] 自动生成 REST","方法名映射 HTTP 动词","Scalar 文档界面"]},{title:"自研事件总线",items:["进程内与分布式事件","RabbitMQ / Kafka / Redis Broker","处理器工厂与工作单元联动"]},{title:"工作流引擎",items:["契约与实现分包","书签驱动与波次隔离","可视化设计器"]},{title:"混合缓存",items:["L1 内存 + L2 Redis","租户隔离 Key","UoW 失效联动"]},{title:"AI 集成",items:["Microsoft.Extensions.AI","Model Context Protocol","RAG 与向量检索"]},{title:"数据与事务",items:["SqlSugar 仓储","实体审计与软删除","UoW 工作单元"]},{title:"韧性与可观测",items:["OpenTelemetry / W3C 链路追踪","HTTP / DB / MQ / Redis 全链路 span","Polly 重试熔断、限流与指标导出"]},{title:"多租户",items:["库 / 表 / 字段三档隔离","租户解析与连接串路由","写路径租户守卫"]},{title:"通道与推送",items:["邮件 / 短信统一契约","Telegram / 钉钉 / 飞书 / 企微","配置全部落库，不写 appsettings"]}],C=[".NET","SqlSugar","Serilog","Scalar","Redis","RabbitMQ","Kafka","OpenTelemetry","Microsoft.Extensions.AI","Model Context Protocol","Polly","Elasticsearch","gRPC","SignalR"],R=`// 继承 CRUD 基类，标一个特性，增删改查的 REST 端点就都在了
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
}`,x=`// 模块之间只声明依赖，装配顺序由模块系统按依赖图推导
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
}`,B={class:"band"},E={class:"frame frame--marked frame__pad"},w={class:"cells"},I={class:"stack",style:{gap:"var(--xh-space-1)"}},W={class:"h-item"},U={class:"fig"},G={class:"stack",style:{gap:"var(--xh-space-3)"}},H={class:"chips"},O={class:"text-sm text-muted"},z={class:"band"},L={class:"frame frame--marked frame__pad"},N={class:"cells cells--3"},q={class:"fig"},X={class:"h-item"},$={class:"stack",style:{gap:"var(--xh-space-1)"}},j={class:"band"},F={class:"frame frame--marked"},K={class:"cells cells--2"},Q={class:"cell code-stage",style:{"justify-content":"center"}},V={style:{position:"relative"}},J={class:"band"},Y={class:"frame frame--marked frame__pad frame__pad--tight"},Z={class:"row-cell",style:{"padding-inline":"0",background:"transparent"}},ee={class:"chips"},ne=k({__name:"FrameworkPage",setup(te){const u=T[0],A=[{value:"api",label:"ArticleAppService.cs",lang:"csharp",code:R},{value:"module",label:"MyAppModule.cs",lang:"csharp",code:x}];return(se,i)=>(s(),t(c,null,[o(S,{product:l(u)},{actions:d(()=>[o(_,{href:l(u).doc,size:"lg"},{default:d(()=>[...i[0]||(i[0]=[h("阅读文档",-1)])]),_:1},8,["href"]),o(_,{href:l(D).nuget,variant:"outline",size:"lg"},{default:d(()=>[...i[1]||(i[1]=[h("NuGet",-1)])]),_:1},8,["href"]),o(_,{href:l(u).repo,variant:"ghost",size:"lg"},{default:d(()=>[...i[2]||(i[2]=[h("源码",-1)])]),_:1},8,["href"])]),art:d(()=>[o(b)]),_:1},8,["product"]),e("section",B,[e("div",E,[o(y,{eyebrow:"01 / 分层",title:"分层即依赖，依赖可追踪",lede:"展示、基础设施、领域、应用、核心，自上而下各司其职。模块之间只声明依赖，装配顺序由模块系统按依赖图推导。",split:""}),v((s(),t("div",w,[(s(!0),t(c,null,p(l(M),a=>(s(),t("div",{key:a.name,class:"row-cell"},[e("div",I,[e("span",W,n(a.name),1),e("span",U,n(a.en),1)]),e("div",G,[e("div",H,[(s(!0),t(c,null,p(a.items,r=>(s(),t("span",{key:r,class:"chip"},n(r),1))),128))]),e("p",O,n(a.desc),1)])]))),128))])),[[l(m)]])])]),e("section",z,[e("div",L,[o(y,{eyebrow:"02 / 能力",title:"常用的那些，框架已经备好"}),e("div",N,[(s(!0),t(c,null,p(l(P),(a,r)=>v((s(),t("div",{key:a.title,class:"cell",style:{gap:"var(--xh-space-3)"}},[e("span",q,[e("b",null,n(String(r+1).padStart(2,"0")),1)]),e("h3",X,n(a.title),1),e("ul",$,[(s(!0),t(c,null,p(a.items,f=>(s(),t("li",{key:f,class:"text-sm text-muted"},n(f),1))),128))])])),[[l(m),r*50]])),128))])])]),e("section",j,[e("div",F,[e("div",K,[i[3]||(i[3]=e("div",{class:"cell",style:{"justify-content":"center",padding:"var(--site-band-py) var(--site-pad)"}},[e("p",{class:"eyebrow"},"03 / 写法"),e("h2",{class:"h-section"},"特性标一下，端点就有了"),e("p",{class:"lede"}," 方法名前缀映射 HTTP 动词，权限码写在特性上，工作单元与事件总线的联动由框架接线。模块之间只声明依赖，装配顺序自动推导。 ")],-1)),e("div",Q,[v((s(),t("div",V,[o(g,{items:A,label:"代码示例"})])),[[l(m)]])])])])]),e("section",J,[e("div",Y,[e("div",Z,[i[4]||(i[4]=e("p",{class:"eyebrow"},"04 / 技术选型",-1)),e("div",ee,[(s(!0),t(c,null,p(l(C),a=>(s(),t("span",{key:a,class:"chip"},n(a),1))),128))])])])])],64))}});export{ne as default};
