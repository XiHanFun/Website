<script setup lang="ts">
import CodeWindow from '../components/CodeWindow.vue'
import DiagramBasicApp from '../components/diagrams/DiagramBasicApp.vue'
import LinkButton from '../components/LinkButton.vue'
import PageHero from '../components/PageHero.vue'
import SectionHead from '../components/SectionHead.vue'
import { vReveal } from '../composables/reveal'
import { auditKinds, frontendStack, modules, pillars, quickStart } from '../data/basicapp'
import { products } from '../data/site'

const app = products[2]!

// 一次请求在服务端要过的三道权限门
const gates = [
  {
    key: 'RBAC',
    title: '能不能调这个接口',
    desc: '权限码挂在方法上，角色持有码才放行。权限变更走事件落审计表，谁在什么时候把哪个码给了谁都查得到。',
  },
  {
    key: 'ABAC',
    title: '能看到哪几行',
    desc: '数据范围按本人、本部门、本部门及下级、自定义、全部五档解析，落成查询过滤器拼进 SQL，不靠前端筛。',
  },
  {
    key: 'FLS',
    title: '这一行里哪几个字段能看',
    desc: '字段级安全按角色决定可读与脱敏规则，掩码在服务端完成；导出、排序、搜索同样受它门控，绕不过去。',
  },
]
</script>

<template>
  <PageHero :product="app">
    <template #actions>
      <LinkButton v-if="app.demo" :href="app.demo" size="lg">在线体验</LinkButton>
      <LinkButton :href="app.doc" variant="outline" size="lg">阅读文档</LinkButton>
      <LinkButton :href="app.repo" variant="ghost" size="lg">源码</LinkButton>
    </template>
    <template #art>
      <DiagramBasicApp />
    </template>
  </PageHero>

  <!-- 权限三层 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead
        eyebrow="01 / 权限"
        title="权限做到字段级，越权在服务端拦"
        lede="一次请求要过三道门，任何一道不过都拿不到数据。三道门全在服务端，前端只负责别把不该显示的画出来。"
        split
      />
      <div class="cells cells--3">
        <div v-for="(g, i) in gates" :key="g.key" v-reveal="i * 60" class="cell" style="gap: var(--xh-space-3)">
          <span class="fig"><b>门 {{ i + 1 }}</b> {{ g.key }}</span>
          <h3 class="h-item">{{ g.title }}</h3>
          <p class="text-sm text-muted">{{ g.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 三根支柱 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead eyebrow="02 / 支柱" title="权限、租户、工程能力" />
      <div class="cells cells--3">
        <div v-for="(p, i) in pillars" :key="p.name" v-reveal="i * 60" class="cell">
          <h3 class="h-item">{{ p.name }}</h3>
          <p class="text-sm text-muted">{{ p.desc }}</p>
          <div class="chips" style="margin-block-start: auto">
            <span v-for="item in p.items" :key="item" class="chip">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 审计 -->
  <section class="band">
    <div class="frame frame--marked frame__pad frame__pad--tight">
      <div class="row-cell" style="padding-inline: 0; background: transparent">
        <div class="stack" style="gap: var(--xh-space-3)">
          <p class="eyebrow">03 / 审计</p>
          <h2 class="h-item">日志落在库里，按链路聚合</h2>
        </div>
        <div class="stack" style="gap: var(--xh-space-3)">
          <div class="chips">
            <span v-for="k in auditKinds" :key="k" class="chip">{{ k }}</span>
          </div>
          <p class="text-sm text-subtle">链路追踪时间线与迁移记录是两处独立视图，与审计日志分开呈现。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 模块 -->
  <section class="band">
    <div class="frame frame--marked frame__pad">
      <SectionHead
        eyebrow="04 / 模块"
        title="按模块装配，能整块卸掉"
        lede="聊天、打印、AI 这些模块前后端都能整体卸载，卸掉之后菜单、接口与前端路由一并消失。"
        split
      />
      <div class="cells cells--3">
        <div v-for="(m, i) in modules" :key="m.name" v-reveal="i * 40" class="cell" style="gap: var(--xh-space-2)">
          <span class="mono" style="color: var(--xh-fg-brand); overflow-wrap: anywhere">{{ m.name }}</span>
          <p class="text-sm text-muted">{{ m.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 跑起来 -->
  <section class="band">
    <div class="frame frame--marked">
      <div class="cells cells--2">
        <div class="cell" style="justify-content: center; padding: var(--site-band-py) var(--site-pad)">
          <p class="eyebrow">05 / 跑起来</p>
          <h2 class="h-section">后端一条命令，前端一条命令</h2>
          <div class="chips">
            <span v-for="t in frontendStack" :key="t" class="chip">{{ t }}</span>
          </div>
          <p class="text-sm text-subtle">前端是独立的 Vue 应用，与后端分离部署。</p>
        </div>
        <div class="cell code-stage" style="justify-content: center">
          <div v-reveal style="position: relative">
            <CodeWindow :items="[{ value: 'start', label: '本地启动', lang: 'bash', code: quickStart }]" label="本地启动" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
