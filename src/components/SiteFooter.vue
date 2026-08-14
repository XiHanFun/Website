<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { links, nav, products } from '../data/site'
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div>
          <div class="site-brand" style="margin-block-end: var(--xh-space-3)">
            <img src="/assets/logo.png" alt="" width="30" height="30">
            <span>曦寒</span>
          </div>
          <p class="text-sm" style="max-inline-size: 34ch">
            从后端框架、前端组件到完整中后台，一套可落地的企业级开发底座。
          </p>
        </div>

        <div>
          <div class="site-footer__title">站点</div>
          <div class="site-footer__list">
            <RouterLink v-for="item in nav" :key="item.to" :to="item.to">{{ item.label }}</RouterLink>
          </div>
        </div>

        <div>
          <div class="site-footer__title">文档与仓库</div>
          <div class="site-footer__list">
            <a v-for="p in products" :key="p.title" :href="p.doc" target="_blank" rel="noopener">
              {{ p.title }} 文档
            </a>
            <a :href="links.github" target="_blank" rel="noopener">GitHub</a>
            <a :href="links.gitee" target="_blank" rel="noopener">Gitee</a>
            <a :href="links.gitcode" target="_blank" rel="noopener">GitCode</a>
            <a :href="links.qq" target="_blank" rel="noopener">QQ 群</a>
          </div>
        </div>
      </div>

      <hr class="rule" style="margin-block: var(--xh-space-8) var(--xh-space-5)">

      <div class="row" style="justify-content: space-between">
        <span class="text-xs">© 2021-Present XiHanFun · MIT License · 曦寒懿</span>
        <span class="mono text-xs subtle">本站由 @xihan-ui/vue 构建</span>
      </div>
    </div>
  </footer>
</template>
