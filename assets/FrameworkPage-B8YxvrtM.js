import{X as P}from"./highlighter-BeK-GAGa.js";import{i as D,p as M,d as T,h as A,c as R,a as w,v as B,n as E,b as r,e,f as d,w as m,g as s,t as u,y as X,k as _,F as h,r as g,o as i,j as b,q}from"./index-eptoPuX_.js";import{f as H,g as x}from"./backgrounds-DzOvKAV7.js";import{X as I,a as O,b as N}from"./page-header-B2NQZxTx.js";import{X as W}from"./tabs-C90Skctc.js";import{v as y,C as U,_ as f}from"./reveal-CNW2rGe0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const F=H("marquee",["root","content"]),S=F.build(),G="left",z=["left","right"];function L(o){return typeof o=="number"&&Number.isFinite(o)&&o>0?o:void 0}function V(o,a){const c=o.direction??G,l=o.autoFill===!0,v=L(o.speed),n={...S.root.attrs,"data-direction":c,"data-orientation":z.includes(c)?"horizontal":"vertical","data-pause-on-hover":x(o.pauseOnHover),"data-auto-fill":x(l),...v===void 0?{}:{style:`--xh-marquee-speed: ${v}`}};return{copies:l?2:1,getRootProps:()=>a.element(n),getContentProps:()=>a.element(S.content.attrs)}}const C=Symbol("xh-marquee");function K(o){M(C,o)}function j(){const o=D(C,null);if(!o)throw new Error("[xh] Marquee 部件必须用在 XhMarqueeRoot 内");return o}const Q=T({name:"XhMarqueeRoot",props:{direction:{type:String,default:void 0},speed:{type:Number,default:void 0},pauseOnHover:Boolean,autoFill:Boolean},setup(o,{slots:a}){const c=R(()=>V(o,B));return K({api:c}),()=>{var l;return A("div",c.value.getRootProps(),(l=a.default)==null?void 0:l.call(a))}}}),$=T({name:"XhMarqueeContent",setup(o,{slots:a}){const c=j();return()=>{var v,n;const l=[];if(w((v=a.default)==null?void 0:v.call(a)))for(let t=0;t<c.api.value.copies;t++){const p=t>0;l.push(A("div",{"data-xh-copy":String(t),"aria-hidden":p?"true":void 0,inert:p?!0:void 0},(n=a.default)==null?void 0:n.call(a)))}return A("div",c.api.value.getContentProps(),l)}}}),Y=[{name:"展示",en:"Presentation",desc:"动态 API、网关与灰度、SignalR 实时、gRPC、Scalar 文档、MCP 服务端",items:["Web.Api","Web.Core","Web.Gateway","Web.RealTime","Web.Grpc","Web.Docs","Web.Mcp"]},{name:"基础设施",en:"Infrastructure",desc:"SqlSugar 仓储、混合缓存 L1/L2、分布式事件总线、工作流引擎、后台作业、审计、可观测性、AI、多租户、机器人通道",items:["Data","Caching","Authentication","Authorization","EventBus","Workflow","Tasks","Auditing","Observability","AI","Bot","MultiTenancy","SearchEngines","ObjectStorage","Uow"]},{name:"领域",en:"Domain",desc:"DDD 模式、实体审计、领域事件、查询过滤",items:["Domain","Domain.Shared"]},{name:"应用",en:"Application",desc:"CRUD、DTO 映射、批量操作、自动分页",items:["Application","Application.Contracts"]},{name:"核心",en:"Core",desc:"模块系统、依赖注入、生命周期、配置选项、通用工具",items:["Core","Utils","Metadata","Analyzers"]}],Z=[{title:"动态 API",items:["[DynamicApi] 自动生成 REST","方法名映射 HTTP 动词","Scalar 文档界面"]},{title:"自研事件总线",items:["进程内与分布式事件","RabbitMQ / Kafka / Redis Broker","处理器工厂与工作单元联动"]},{title:"工作流引擎",items:["契约与实现分包","书签驱动与波次隔离","可视化设计器"]},{title:"混合缓存",items:["L1 内存 + L2 Redis","租户隔离 Key","UoW 失效联动"]},{title:"AI 集成",items:["Microsoft.Extensions.AI","Model Context Protocol","RAG 与向量检索"]},{title:"数据与事务",items:["SqlSugar 仓储","实体审计与软删除","UoW 工作单元"]},{title:"韧性与可观测",items:["OpenTelemetry / W3C 链路追踪","HTTP / DB / MQ / Redis 全链路 span","Polly 重试熔断、限流与指标导出"]},{title:"多租户",items:["库 / 表 / 字段三档隔离","租户解析与连接串路由","写路径租户守卫"]},{title:"通道与推送",items:["邮件 / 短信统一契约","Telegram / 钉钉 / 飞书 / 企微","配置全部落库，不写 appsettings"]}],J=[".NET 10","SqlSugar","Serilog","Scalar","Redis","RabbitMQ","Kafka","OpenTelemetry","Microsoft.Extensions.AI","Model Context Protocol","Polly","Elasticsearch","gRPC","SignalR"],ee=`// 继承 CRUD 基类，标一个特性，增删改查的 REST 端点就都在了
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
}`,te=`// 模块之间只声明依赖，装配顺序由模块系统按依赖图推导
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
}`,ae={class:"section section--tight"},oe={class:"container"},se={class:"lede",style:{"margin-block-start":"var(--xh-space-6)"}},ie={class:"row",style:{"margin-block-start":"var(--xh-space-5)"}},ne=["href"],re=["href"],le={class:"section"},ce={class:"container"},de={class:"panel panel--flush"},ue={class:"row",style:{gap:"var(--xh-space-2)","align-items":"baseline"}},pe={class:"title-md",style:{color:"var(--xh-fg-brand)"}},me={class:"mono subtle text-xs"},ve={class:"module-tags"},he={class:"text-sm subtle",style:{"margin-block-start":"var(--xh-space-2)"}},ge={class:"section"},_e={class:"container"},be={class:"grid",style:{"--cols":"1","--cols-sm":"2","--cols-lg":"3"}},ye={class:"row",style:{gap:"var(--xh-space-2)","margin-block-end":"var(--xh-space-3)"}},fe={class:"title-md"},Ae={class:"stack",style:{gap:"var(--xh-space-1)"}},Te={class:"section"},ke={class:"container"},xe={class:"panel"},Se={style:{"padding-block-start":"var(--xh-space-4)"}},Ce={class:"section section--tight"},Pe={class:"container"},qe=T({__name:"FrameworkPage",setup(o){const a=E[0],c=[{value:"api",label:"动态 API"},{value:"module",label:"模块装配"}],l={api:{lang:"csharp",code:ee},module:{lang:"csharp",code:te}};return(v,n)=>(i(),r(h,null,[e("section",ae,[e("div",oe,[d(s(I),{bordered:"",size:"lg"},{default:m(()=>[d(s(O),null,{default:m(()=>[...n[0]||(n[0]=[b("XiHan.Framework",-1)])]),_:1}),d(s(N),null,{default:m(()=>[b(" 基于 .NET 10 的模块化后端框架 · "+u(s(a).status),1)]),_:1})]),_:1}),e("p",se,u(s(a).desc),1),e("div",ie,[e("a",{href:s(a).doc,target:"_blank",rel:"noopener","data-scope":"button","data-part":"root","data-variant":"solid"}," 阅读文档 ",8,ne),s(a).demo?(i(),r("a",{key:0,href:s(a).demo,target:"_blank",rel:"noopener","data-scope":"button","data-part":"root","data-variant":"outline"},"在线体验",8,re)):X("",!0),n[1]||(n[1]=e("a",{href:"https://www.nuget.org/profiles/XiHanFun",target:"_blank",rel:"noopener","data-scope":"button","data-part":"root","data-variant":"ghost"},"NuGet",-1))])])]),e("section",le,[e("div",ce,[d(f,{eyebrow:"66 模块 · 五层",title:"分层即依赖，依赖可追踪",lede:"展示、基础设施、领域、应用、核心，自上而下各司其职。模块之间只声明依赖，装配顺序由模块系统按依赖图推导。"}),_((i(),r("div",de,[(i(!0),r(h,null,g(s(Y),t=>(i(),r("div",{key:t.name,class:"layer-row"},[e("div",ue,[e("span",pe,u(t.name),1),e("span",me,u(t.en),1)]),e("div",null,[e("div",ve,[(i(!0),r(h,null,g(t.items,p=>(i(),r("span",{key:p,class:"chip"},u(p),1))),128))]),e("p",he,u(t.desc),1)])]))),128))])),[[s(y)]])])]),e("section",ge,[e("div",_e,[d(f,{eyebrow:"能力清单",title:"常用的那些，框架已经备好"}),e("div",be,[(i(!0),r(h,null,g(s(Z),(t,p)=>_((i(),r("div",{key:t.title,class:"panel"},[e("div",ye,[n[2]||(n[2]=e("span",{style:{"inline-size":"5px","block-size":"5px","border-radius":"999px",background:"var(--xh-color-brand-500)"}},null,-1)),e("h3",fe,u(t.title),1)]),e("ul",Ae,[(i(!0),r(h,null,g(t.items,k=>(i(),r("li",{key:k,class:"text-sm muted"},u(k),1))),128))])])),[[s(y),p*60]])),128))])])]),e("section",Te,[e("div",ke,[d(f,{eyebrow:"写起来长什么样",title:"特性标一下，端点就有了",lede:"方法名前缀映射 HTTP 动词，DTO 与权限码写在特性上，工作单元与事件总线联动由框架接线。"}),_((i(),r("div",xe,[d(s(W),{collection:c,"default-value":"api"},{panel:m(t=>[e("div",Se,[d(U,{code:l[t.value].code,lang:l[t.value].lang},null,8,["code","lang"])])]),_:1})])),[[s(y)]])])]),e("section",Ce,[e("div",Pe,[n[3]||(n[3]=e("p",{class:"eyebrow",style:{"margin-block-end":"var(--xh-space-4)"}},"技术选型",-1)),d(s(Q),{"auto-fill":"","pause-on-hover":"",speed:40},{default:m(()=>[d(s($),null,{default:m(()=>[(i(!0),r(h,null,g(s(J),t=>(i(),q(s(P),{key:t,variant:"outline",tone:"neutral",style:{"margin-inline-end":"var(--xh-space-3)"}},{default:m(()=>[b(u(t),1)]),_:2},1024))),128))]),_:1})]),_:1})])])],64))}});export{qe as default};
