import{i as P,p as D,d as A,h as y,c as M,a as R,v as w,x as B,e as r,f as e,j as c,l as p,k as o,z as u,C as E,q as _,F as h,r as g,y as n,m as x,A as X}from"./index-CVwDFtDR.js";import{q,s as k}from"./backgrounds-CP2HDdOA.js";import{X as H,a as I,b as O}from"./page-header-CVVE0K1X.js";import{X as N}from"./tabs-BK_fT2nM.js";import{v as b,C as W,a as U,X as F,_ as f}from"./reveal-BB0jeTxn.js";const z=q("marquee",["root","content"]),C=z.build(),G="left",L=["left","right"];function V(s){return typeof s=="number"&&Number.isFinite(s)&&s>0?s:void 0}function K(s,a){const d=s.direction??G,l=s.autoFill===!0,v=V(s.speed),i={...C.root.attrs,"data-direction":d,"data-orientation":L.includes(d)?"horizontal":"vertical","data-pause-on-hover":k(s.pauseOnHover),"data-auto-fill":k(l),...v===void 0?{}:{style:`--xh-marquee-speed: ${v}`}};return{copies:l?2:1,getRootProps:()=>a.element(i),getContentProps:()=>a.element(C.content.attrs)}}const S=Symbol.for("xh-marquee");function j(s){D(S,s)}function Q(){const s=P(S,null);if(!s)throw new Error("[xh] Marquee 部件必须用在 XhMarqueeRoot 内");return s}const $=A({name:"XhMarqueeRoot",props:{direction:{type:String,default:void 0},speed:{type:Number,default:void 0},pauseOnHover:Boolean,autoFill:Boolean},setup(s,{slots:a}){const d=M(()=>K(s,w));return j({api:d}),()=>{var l;return y("div",d.value.getRootProps(),(l=a.default)==null?void 0:l.call(a))}}}),Y=A({name:"XhMarqueeContent",setup(s,{slots:a}){const d=Q();return()=>{var v,i;const l=[];if(R((v=a.default)==null?void 0:v.call(a)))for(let t=0;t<d.api.value.copies;t++){const m=t>0;l.push(y("div",{"data-xh-copy":String(t),"aria-hidden":m?"true":void 0,inert:m?!0:void 0},(i=a.default)==null?void 0:i.call(a)))}return y("div",d.api.value.getContentProps(),l)}}}),Z=[{name:"展示",en:"Presentation",desc:"动态 API、网关与灰度、SignalR 实时、gRPC、Scalar 文档、MCP 服务端",items:["Web.Api","Web.Core","Web.Gateway","Web.RealTime","Web.Grpc","Web.Docs","Web.Mcp"]},{name:"基础设施",en:"Infrastructure",desc:"SqlSugar 仓储、混合缓存 L1/L2、分布式事件总线、工作流引擎、后台作业、审计、可观测性、AI、多租户、机器人通道",items:["Data","Caching","Authentication","Authorization","EventBus","Workflow","Tasks","Auditing","Observability","AI","Bot","MultiTenancy","SearchEngines","ObjectStorage","Uow"]},{name:"领域",en:"Domain",desc:"DDD 模式、实体审计、领域事件、查询过滤",items:["Domain","Domain.Shared"]},{name:"应用",en:"Application",desc:"CRUD、DTO 映射、批量操作、自动分页",items:["Application","Application.Contracts"]},{name:"核心",en:"Core",desc:"模块系统、依赖注入、生命周期、配置选项、通用工具",items:["Core","Utils","Metadata","Analyzers"]}],J=[{title:"动态 API",items:["[DynamicApi] 自动生成 REST","方法名映射 HTTP 动词","Scalar 文档界面"]},{title:"自研事件总线",items:["进程内与分布式事件","RabbitMQ / Kafka / Redis Broker","处理器工厂与工作单元联动"]},{title:"工作流引擎",items:["契约与实现分包","书签驱动与波次隔离","可视化设计器"]},{title:"混合缓存",items:["L1 内存 + L2 Redis","租户隔离 Key","UoW 失效联动"]},{title:"AI 集成",items:["Microsoft.Extensions.AI","Model Context Protocol","RAG 与向量检索"]},{title:"数据与事务",items:["SqlSugar 仓储","实体审计与软删除","UoW 工作单元"]},{title:"韧性与可观测",items:["OpenTelemetry / W3C 链路追踪","HTTP / DB / MQ / Redis 全链路 span","Polly 重试熔断、限流与指标导出"]},{title:"多租户",items:["库 / 表 / 字段三档隔离","租户解析与连接串路由","写路径租户守卫"]},{title:"通道与推送",items:["邮件 / 短信统一契约","Telegram / 钉钉 / 飞书 / 企微","配置全部落库，不写 appsettings"]}],ee=[".NET 10","SqlSugar","Serilog","Scalar","Redis","RabbitMQ","Kafka","OpenTelemetry","Microsoft.Extensions.AI","Model Context Protocol","Polly","Elasticsearch","gRPC","SignalR"],te=`// 继承 CRUD 基类，标一个特性，增删改查的 REST 端点就都在了
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
}`,ae=`// 模块之间只声明依赖，装配顺序由模块系统按依赖图推导
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
}`,oe={class:"section section--tight"},se={class:"container"},ne={class:"lede",style:{"margin-block-start":"var(--xh-space-6)"}},ie={class:"row",style:{"margin-block-start":"var(--xh-space-5)"}},re=["href"],le=["href"],ce={class:"section"},de={class:"container"},ue={class:"panel panel--flush"},pe={class:"row",style:{gap:"var(--xh-space-2)","align-items":"baseline"}},me={class:"title-md",style:{color:"var(--xh-fg-brand)"}},ve={class:"mono subtle text-xs"},he={class:"module-tags"},ge={class:"text-sm subtle",style:{"margin-block-start":"var(--xh-space-2)"}},_e={class:"section"},be={class:"container"},fe={class:"grid",style:{"--cols":"1","--cols-sm":"2","--cols-lg":"3"}},ye={class:"row",style:{gap:"var(--xh-space-2)","margin-block-end":"var(--xh-space-3)"}},Ae={class:"title-md"},Te={class:"stack",style:{gap:"var(--xh-space-1)"}},xe={class:"section"},ke={class:"container"},Ce={class:"panel"},Se={class:"section section--tight"},Pe={class:"container"},Ee=A({__name:"FrameworkPage",setup(s){const a=B[0],d=[{value:"api",label:"动态 API"},{value:"module",label:"模块装配"}],l={api:{lang:"csharp",code:te},module:{lang:"csharp",code:ae}};return(v,i)=>(n(),r(h,null,[e("section",oe,[e("div",se,[c(o(H),{bordered:"",size:"lg"},{default:p(()=>[c(o(I),null,{default:p(()=>[...i[0]||(i[0]=[e("h1",null,"XiHan.Framework",-1)])]),_:1}),c(o(O),null,{default:p(()=>[x(" 基于 .NET 10 的模块化后端框架 · "+u(o(a).status),1)]),_:1})]),_:1}),e("p",ne,u(o(a).desc),1),e("div",ie,[e("a",{href:o(a).doc,target:"_blank",rel:"noopener","data-scope":"button","data-part":"root","data-variant":"solid"}," 阅读文档 ",8,re),o(a).demo?(n(),r("a",{key:0,href:o(a).demo,target:"_blank",rel:"noopener","data-scope":"button","data-part":"root","data-variant":"outline"},"在线体验",8,le)):E("",!0),i[1]||(i[1]=e("a",{href:"https://www.nuget.org/profiles/XiHanFun",target:"_blank",rel:"noopener","data-scope":"button","data-part":"root","data-variant":"ghost"},"NuGet",-1))])])]),e("section",ce,[e("div",de,[c(f,{eyebrow:"66 模块 · 五层",title:"分层即依赖，依赖可追踪",lede:"展示、基础设施、领域、应用、核心，自上而下各司其职。模块之间只声明依赖，装配顺序由模块系统按依赖图推导。"}),_((n(),r("div",ue,[(n(!0),r(h,null,g(o(Z),t=>(n(),r("div",{key:t.name,class:"layer-row"},[e("div",pe,[e("span",me,u(t.name),1),e("span",ve,u(t.en),1)]),e("div",null,[e("div",he,[(n(!0),r(h,null,g(t.items,m=>(n(),r("span",{key:m,class:"chip"},u(m),1))),128))]),e("p",ge,u(t.desc),1)])]))),128))])),[[o(b)]])])]),e("section",_e,[e("div",be,[c(f,{eyebrow:"能力清单",title:"常用的那些，框架已经备好"}),e("div",fe,[(n(!0),r(h,null,g(o(J),(t,m)=>_((n(),r("div",{key:t.title,class:"panel"},[e("div",ye,[i[2]||(i[2]=e("span",{style:{"inline-size":"5px","block-size":"5px","border-radius":"999px",background:"var(--xh-fg-brand)"}},null,-1)),e("h3",Ae,u(t.title),1)]),e("ul",Te,[(n(!0),r(h,null,g(t.items,T=>(n(),r("li",{key:T,class:"text-sm muted"},u(T),1))),128))])])),[[o(b),m*60]])),128))])])]),e("section",xe,[e("div",ke,[c(f,{eyebrow:"写起来长什么样",title:"特性标一下，端点就有了",lede:"方法名前缀映射 HTTP 动词，DTO 与权限码写在特性上，工作单元与事件总线联动由框架接线。"}),_((n(),r("div",Ce,[c(o(N),{collection:d,"default-value":"api"},{panel:p(t=>[c(W,{code:l[t.value].code,lang:l[t.value].lang},null,8,["code","lang"])]),_:1})])),[[o(b)]])])]),e("section",Se,[e("div",Pe,[i[3]||(i[3]=e("p",{class:"eyebrow",style:{"margin-block-end":"var(--xh-space-4)"}},"技术选型",-1)),c(o($),{"auto-fill":"","pause-on-hover":"",speed:40},{default:p(()=>[c(o(Y),null,{default:p(()=>[(n(!0),r(h,null,g(o(ee),t=>(n(),X(o(F),{key:t,variant:"outline",tone:"neutral",style:{"margin-inline-end":"var(--xh-space-3)"}},{default:p(()=>[c(o(U),null,{default:p(()=>[x(u(t),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})])])],64))}});export{Ee as default};
