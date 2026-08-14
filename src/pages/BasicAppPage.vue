<script setup lang="ts">
import {
  XhBadge,
  XhPageHeaderRoot,
  XhPageHeaderSubtitle,
  XhPageHeaderTitle,
  XhTimelineConnector,
  XhTimelineContent,
  XhTimelineDescription,
  XhTimelineIndicator,
  XhTimelineItem,
  XhTimelineRoot,
  XhTimelineTitle,
} from '@xihan-ui/vue'
import CodeSample from '../components/CodeSample.vue'
import SectionHead from '../components/SectionHead.vue'
import { vReveal } from '../composables/reveal'
import { auditKinds, frontendStack, modules, pillars, quickStart } from '../data/basicapp'
import { products } from '../data/site'

const app = products[2]!

// 一次请求在服务端要过的三道权限门
const gates = [
  {
    title: 'RBAC · 能不能调这个接口',
    desc: '权限码挂在方法上，角色持有码才放行。权限变更走事件落审计表，谁在什么时候把哪个码给了谁都查得到。',
  },
  {
    title: 'ABAC · 能看到哪几行',
    desc: '数据范围按本人、本部门、本部门及下级、自定义、全部五档解析，落成查询过滤器拼进 SQL，不靠前端筛。',
  },
  {
    title: 'FLS · 这一行里哪几个字段能看',
    desc: '字段级安全按角色决定可读与脱敏规则，掩码在服务端完成；导出、排序、搜索同样受它门控，绕不过去。',
  },
]
</script>

<template>
  <section class="section section--tight">
    <div class="container">
      <XhPageHeaderRoot bordered size="lg">
        <XhPageHeaderTitle>XiHan.BasicApp</XhPageHeaderTitle>
        <XhPageHeaderSubtitle>
          基于 Framework 与 UI 构建的多租户中后台 · {{ app.status }}
        </XhPageHeaderSubtitle>
      </XhPageHeaderRoot>

      <p class="lede" style="margin-block-start: var(--xh-space-6)">{{ app.desc }}</p>

      <div class="row" style="margin-block-start: var(--xh-space-5)">
        <a
          v-if="app.demo"
          :href="app.demo"
          target="_blank"
          rel="noopener"
          data-scope="button"
          data-part="root"
          data-variant="solid"
        >打开在线 Demo</a>
        <a :href="app.doc" target="_blank" rel="noopener" data-scope="button" data-part="root" data-variant="outline">
          阅读文档
        </a>
        <a
          href="https://github.com/XiHanFun/XiHan.BasicApp"
          target="_blank"
          rel="noopener"
          data-scope="button"
          data-part="root"
          data-variant="ghost"
        >源码</a>
      </div>
    </div>
  </section>

  <!-- 权限三层 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="权限"
        title="权限做到字段级，越权在服务端拦"
        lede="一次请求要过三道门，任何一道不过都拿不到数据；三道全在服务端，前端只负责别把不该显示的画出来。"
      />

      <div v-reveal class="panel">
        <XhTimelineRoot>
          <XhTimelineItem v-for="g in gates" :key="g.title">
            <XhTimelineIndicator />
            <XhTimelineConnector />
            <XhTimelineContent>
              <XhTimelineTitle>{{ g.title }}</XhTimelineTitle>
              <XhTimelineDescription>{{ g.desc }}</XhTimelineDescription>
            </XhTimelineContent>
          </XhTimelineItem>
        </XhTimelineRoot>
      </div>
    </div>
  </section>

  <!-- 三支柱 -->
  <section class="section">
    <div class="container">
      <SectionHead eyebrow="三根支柱" title="权限、租户、工程能力" />
      <div class="grid" style="--cols: 1; --cols-lg: 3">
        <div v-for="(p, i) in pillars" :key="p.name" v-reveal="i * 80" class="panel stack">
          <h3 class="title-md">{{ p.name }}</h3>
          <ul class="stack" style="gap: var(--xh-space-2)">
            <li v-for="item in p.items" :key="item" class="row text-sm" style="gap: var(--xh-space-2); flex-wrap: nowrap; align-items: flex-start">
              <span style="margin-block-start: 9px; inline-size: 4px; block-size: 4px; flex-shrink: 0; border-radius: 999px; background: var(--xh-color-brand-500)" />
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="text-sm subtle" style="border-block-start: 1px solid var(--xh-border-subtle); padding-block-start: var(--xh-space-3)">
            {{ p.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 审计 -->
  <section class="section section--tight">
    <div class="container">
      <SectionHead eyebrow="审计" title="七类日志，落在库里" />
      <div v-reveal class="row">
        <XhBadge v-for="k in auditKinds" :key="k" variant="subtle" tone="neutral">{{ k }}</XhBadge>
      </div>
      <p class="text-sm subtle" style="margin-block-start: var(--xh-space-4)">
        另有链路追踪时间线与迁移记录两处独立视图，与审计日志分开呈现。
      </p>
    </div>
  </section>

  <!-- 模块 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="模块清单"
        title="按模块装配，能整块卸掉"
        lede="聊天、打印、AI 这些模块前后端都能整体卸载，卸掉之后菜单、接口与前端路由一并消失。"
      />
      <div class="grid" style="--cols: 1; --cols-sm: 2; --cols-lg: 3">
        <div v-for="(m, i) in modules" :key="m.name" v-reveal="i * 40" class="panel panel--hover">
          <div class="mono text-xs" style="color: var(--xh-fg-brand); overflow-wrap: anywhere">{{ m.name }}</div>
          <p class="text-sm subtle" style="margin-block-start: var(--xh-space-2)">{{ m.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 跑起来 -->
  <section class="section">
    <div class="container">
      <SectionHead eyebrow="跑起来" title="后端一条命令，前端一条命令" />
      <div class="grid" style="--cols: 1; --cols-lg: 2">
        <div v-reveal class="panel">
          <CodeSample title="本地启动" :code="quickStart" lang="bash" />
        </div>
        <div v-reveal="80" class="panel stack">
          <h3 class="title-md">前端技术栈</h3>
          <div class="row">
            <span v-for="t in frontendStack" :key="t" class="chip">{{ t }}</span>
          </div>
          <p class="text-sm subtle">
            前端是独立的 Vue 3 应用，与后端分离部署；本站用的 XiHan.UI 与它是两套外观，互不牵扯。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
