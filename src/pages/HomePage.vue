<script setup lang="ts">
import type { CodeItem } from '../components/CodeWindow.vue'
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from '@xihan-ui/icons'
import { XhIcon } from '@xihan-ui/vue'
import { RouterLink } from 'vue-router'
import CodeWindow from '../components/CodeWindow.vue'
import DiagramBasicApp from '../components/diagrams/DiagramBasicApp.vue'
import DiagramCompose from '../components/diagrams/DiagramCompose.vue'
import DiagramFramework from '../components/diagrams/DiagramFramework.vue'
import DiagramUi from '../components/diagrams/DiagramUi.vue'
import TrustGlyph from '../components/diagrams/TrustGlyph.vue'
import HalftoneFigure from '../components/HalftoneFigure.vue'
import LinkButton from '../components/LinkButton.vue'
import SectionHead from '../components/SectionHead.vue'
import { vReveal } from '../composables/reveal'
import { links, products, repos, trust } from '../data/site'

const diagrams = [DiagramFramework, DiagramUi, DiagramBasicApp]

const facts = [
  { title: 'MIT 开源', note: '全部代码公开，没有企业版' },
  { title: '三处同步托管', note: 'GitHub · Gitee · GitCode' },
  { title: '中文文档', note: '开发指南与逐包参考' },
]

const entries = [
  { step: 'A', title: '只要后端能力', text: '在现有 ASP.NET Core 项目里引用需要的 NuGet 包，模块按依赖自动装配。' },
  { step: 'B', title: '只要前端组件', text: '安装适配器与默认皮肤，Vue、React 或原生自定义元素任选其一。' },
  { step: 'C', title: '要一套能跑的中后台', text: '克隆 BasicApp，在它的权限、租户与审计之上直接写业务。' },
]

const starters: CodeItem[] = [
  {
    value: 'backend',
    label: '后端 · NuGet',
    lang: 'bash',
    code: `dotnet add package XiHan.Framework.Core
dotnet add package XiHan.Framework.Application
dotnet add package XiHan.Framework.Data
dotnet add package XiHan.Framework.Web.Api`,
  },
  {
    value: 'frontend',
    label: '前端 · npm',
    lang: 'bash',
    code: `pnpm add @xihan-ui/vue @xihan-ui/styles

# 可选：背景与音效，用到才装
pnpm add @xihan-ui/backgrounds @xihan-ui/sound`,
  },
  {
    value: 'app',
    label: '中后台 · 克隆即跑',
    lang: 'bash',
    code: `git clone https://github.com/XiHanFun/XiHan.BasicApp
cd XiHan.BasicApp/backend/src/main/XiHan.BasicApp.WebHost
dotnet run

# 另开一个终端
cd XiHan.BasicApp/frontend && pnpm install && pnpm dev`,
  },
]

const checks = [
  '后端按包引用，模块依赖由框架拓扑排序装配',
  '前端装一个适配器加一份皮肤，两行导入即可使用',
  'BasicApp 前后端各一条命令启动',
  '开发指南、逐包参考与组件文档全部是中文',
]
</script>

<template>
  <!-- 首屏 -->
  <section class="band" style="border-block-start: 0">
    <div class="frame">
      <div class="hero">
        <div class="hero__copy">
          <p class="eyebrow">XiHanFun · 曦寒懿开源生态</p>
          <h1 class="h-display">企业级 .NET + Vue<br>开源开发底座</h1>
          <p class="lede">
            后端基座 XiHan.Framework、前端基座 XiHan.UI、基础应用 XiHan.BasicApp。
            三个仓库各自独立发布，组合起来就是一套开箱即用的中后台。
          </p>
          <div class="row">
            <LinkButton :href="links.docs" size="lg">阅读文档</LinkButton>
            <LinkButton :href="links.basicappDemo" variant="outline" size="lg">在线体验</LinkButton>
            <LinkButton :href="links.github" variant="ghost" size="lg">开源组织</LinkButton>
          </div>
        </div>

        <div class="hero__art">
          <div class="hero__art-grid" aria-hidden="true" />
          <HalftoneFigure />
        </div>
      </div>

      <div class="hero__facts">
        <div v-for="f in facts" :key="f.title" class="hero__fact">
          <strong>{{ f.title }}</strong>
          <span>{{ f.note }}</span>
        </div>
      </div>
    </div>
  </section>

  <div class="band"><div class="frame frame--marked hatch" /></div>

  <!-- 三个产品 -->
  <section class="band">
    <div class="frame frame--marked">
      <div class="frame__pad" style="padding-block-end: 0">
        <SectionHead
          eyebrow="01 / 产品"
          title="三个仓库，各管一层"
          lede="后端基座、前端基座与基础应用各自独立发布，可以单独引用，也能组合成一套完整的中后台。"
          split
        />
      </div>

      <div class="cells cells--3" style="border-block-start: var(--xh-stroke-thin) solid var(--site-line)">
        <article v-for="(p, i) in products" :key="p.route" v-reveal="i * 80" class="cell">
          <div class="row" style="justify-content: space-between">
            <span class="fig">{{ p.subtitle }}</span>
            <span class="fig">{{ p.status }}</span>
          </div>
          <div class="diagram-frame">
            <component :is="diagrams[i]" />
          </div>
          <h3 class="h-product">{{ p.title }}</h3>
          <p class="text-sm text-muted" style="flex: 1">{{ p.summary }}</p>
          <div class="links">
            <RouterLink :to="p.route" class="link-arrow">了解详情 <XhIcon :icon="ArrowRightIcon" /></RouterLink>
            <a :href="p.doc" target="_blank" rel="noopener" class="link-arrow">文档 <XhIcon :icon="ArrowUpRightIcon" /></a>
            <a v-if="p.demo" :href="p.demo" target="_blank" rel="noopener" class="link-arrow">在线体验 <XhIcon :icon="ArrowUpRightIcon" /></a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- 组合方式 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead
        eyebrow="02 / 组合"
        title="从任意一层开始"
        lede="BasicApp 的后端引用 Framework，前端引用 UI。你可以只取其中一层，也可以从完整的中后台起步。"
      />

      <div v-reveal style="overflow-x: auto">
        <div style="min-inline-size: 720px">
          <DiagramCompose />
        </div>
      </div>

      <div class="cells cells--3" style="margin-block-start: clamp(32px, 4vw, 48px)">
        <div v-for="e in entries" :key="e.step" class="cell" style="gap: var(--xh-space-3)">
          <span class="fig"><b>入口 {{ e.step }}</b></span>
          <h3 class="h-item">{{ e.title }}</h3>
          <p class="text-sm text-muted">{{ e.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 为什么能放心采用 -->
  <section class="band drench" data-theme="dark">
    <div class="frame frame--marked frame__pad">
      <SectionHead
        eyebrow="03 / 可信"
        title="为什么能放心采用"
        lede="下面每一条都能在对应仓库的源码与文档里查到，不是宣传口径。"
        split
      />
      <div class="cells cells--3">
        <div v-for="(t, i) in trust" :key="t.kind" v-reveal="i * 60" class="cell" style="gap: var(--xh-space-3)">
          <TrustGlyph :kind="t.kind" />
          <h3 class="h-item">{{ t.title }}</h3>
          <p class="text-sm text-muted">{{ t.text }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 上手 -->
  <section class="band">
    <div class="frame frame--marked">
      <div class="cells cells--2" style="background: var(--site-line)">
        <div class="cell" style="justify-content: center; padding: var(--site-band-py) var(--site-pad)">
          <p class="eyebrow">04 / 上手</p>
          <h2 class="h-section">几行命令就能开始</h2>
          <ul class="checklist">
            <li v-for="c in checks" :key="c">
              <XhIcon :icon="CheckIcon" />
              <span class="text-sm">{{ c }}</span>
            </li>
          </ul>
          <div class="row" style="margin-block-start: var(--xh-space-2)">
            <LinkButton :href="links.docs" variant="outline">查看上手指南</LinkButton>
          </div>
        </div>
        <div class="cell code-stage" style="justify-content: center">
          <div v-reveal style="position: relative">
            <CodeWindow :items="starters" label="上手方式" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="band"><div class="frame frame--marked hatch" /></div>

  <!-- 行动 -->
  <section class="band">
    <div class="frame frame--marked">
      <div class="cells cells--2">
        <div class="cta-card cta-card--brand">
          <div class="stack" style="gap: var(--xh-space-3)">
            <span class="fig"><b>05</b> 开始构建</span>
            <h2 class="h-section">把它放进你的候选清单</h2>
            <p class="text-sm text-muted" style="max-inline-size: 40ch">
              文档覆盖从上手到逐包参考的全部内容，源码与示例都在仓库里。
            </p>
          </div>
          <div class="row">
            <LinkButton :href="links.docs">阅读文档</LinkButton>
            <LinkButton :href="links.github" variant="ghost">浏览源码</LinkButton>
          </div>
        </div>
        <div class="cta-card cta-card--teal">
          <div class="stack" style="gap: var(--xh-space-3)">
            <span class="fig"><b>06</b> 社区</span>
            <h2 class="h-section">问题与想法，都欢迎</h2>
            <p class="text-sm text-muted" style="max-inline-size: 40ch">
              三处镜像同步维护，Issue 与 PR 在哪一处提都收得到；也可以直接来群里聊。
            </p>
          </div>
          <div class="row">
            <LinkButton :href="links.qq" variant="outline">加入 QQ 群</LinkButton>
            <LinkButton v-for="r in repos.filter(x => x.label !== 'GitHub')" :key="r.label" :href="r.href" variant="ghost">
              {{ r.label }}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
