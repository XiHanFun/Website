<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { links, products, repos } from '../data/site'

const docs = [
  { label: '生态文档', href: links.docs },
  { label: 'Framework 文档', href: links.frameworkDocs },
  { label: 'UI 文档', href: links.uiDocs },
  { label: 'BasicApp 文档', href: links.basicappDocs },
]

const packages = [
  { label: 'NuGet', href: links.nuget },
  { label: 'npm', href: links.npm },
  { label: 'BasicApp 在线体验', href: links.basicappDemo },
]
</script>

<template>
  <footer class="site-footer band">
    <div class="frame frame--marked">
      <div class="site-footer__grid">
        <div class="stack" style="gap: var(--xh-space-4)">
          <div class="site-brand">
            <img src="/assets/logo.png" alt="" width="28" height="28">
            <span>曦寒懿</span>
          </div>
          <p class="text-sm text-muted" style="max-inline-size: 30ch">
            从后端基座、前端基座到基础应用，一套用心维护的 .NET + Vue 开源底座。
          </p>
        </div>

        <nav aria-label="产品">
          <p class="site-footer__title">产品</p>
          <div class="site-footer__list">
            <RouterLink v-for="p in products" :key="p.route" :to="p.route">{{ p.title }}</RouterLink>
          </div>
        </nav>

        <nav aria-label="文档">
          <p class="site-footer__title">文档</p>
          <div class="site-footer__list">
            <a v-for="d in docs" :key="d.href" :href="d.href" target="_blank" rel="noopener">{{ d.label }}</a>
          </div>
        </nav>

        <nav aria-label="社区">
          <p class="site-footer__title">社区</p>
          <div class="site-footer__list">
            <a v-for="r in repos" :key="r.href" :href="r.href" target="_blank" rel="noopener">{{ r.label }}</a>
            <a :href="links.qq" target="_blank" rel="noopener">QQ 群</a>
          </div>
        </nav>

        <nav aria-label="分发">
          <p class="site-footer__title">分发</p>
          <div class="site-footer__list">
            <a v-for="p in packages" :key="p.href" :href="p.href" target="_blank" rel="noopener">{{ p.label }}</a>
          </div>
        </nav>
      </div>

      <div class="site-footer__base" style="border-block-start: var(--xh-stroke-thin) solid var(--site-line)">
        <span>© 2021-Present XiHanFun · MIT License</span>
        <span class="mono">本站由 XiHan.UI 构建</span>
      </div>
    </div>
  </footer>
</template>
