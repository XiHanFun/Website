[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.5-42b883)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vitejs.org/)

# XiHan.Website

曦寒（XiHanFun）官方网站源码，[www.xihanfun.com](https://www.xihanfun.com) 的静态站点。单页展示曦寒生态的三大产品——[XiHan.Framework](https://github.com/XiHanFun/XiHan.Framework)（后端框架）、[XiHan.UI](https://github.com/XiHanFun/XiHan.UI)（Vue 3 组件库）、[XiHan.BasicApp](https://github.com/XiHanFun/XiHan.BasicApp)（多租户中后台）——并链接到各自的文档、在线 Demo 与社区入口。

## 技术栈

- Vue 3.5（`<script setup>`）+ TypeScript 5.9
- Vite 6 构建，`@vitejs/plugin-vue`
- Tailwind CSS 3.4（`postcss` + `autoprefixer`）
- 包管理：pnpm

## 目录结构

```
Website/
├── index.html              # 入口页面，含 SEO / OG / Twitter Card meta
├── src/
│   ├── main.ts              # 应用挂载入口
│   ├── App.vue               # 唯一页面：导航、Hero、产品、架构、社区等分区
│   ├── components/
│   │   ├── SiteBackground.vue        # 背景装饰
│   │   └── FloatingCodeWindow.vue    # 首页悬浮代码块展示
│   ├── composables/
│   │   └── useScrollAnimation.ts     # 滚动进入视口的渐显动画
│   └── styles/main.css       # Tailwind 入口与全局样式
├── public/                  # 静态资源（favicon、logo 等），原样拷贝到 dist
├── vite.config.ts
├── tailwind.config.js / postcss.config.js
├── tsconfig.json / tsconfig.node.json
├── CNAME                    # GitHub Pages 自定义域名：www.xihanfun.com
└── .github/workflows/deploy-website.yml  # 构建并部署到 gh-pages 分支
```

站点内容（产品清单、架构分层、模块列表等）均写在 `src/App.vue` 内的常量中，无独立 CMS 或数据源。

## 本地开发

```bash
pnpm install
pnpm dev
```

默认由 Vite 启动开发服务器（HMR）。

## 构建与预览

```bash
pnpm run build     # vue-tsc --noEmit 类型检查 + vite build，产物输出到 dist/
pnpm run preview    # 本地预览构建产物
```

## 部署

推送或提交 PR 到 `main` 分支时，GitHub Actions（`.github/workflows/deploy-website.yml`）会自动：

1. 安装 Node.js 20 与 pnpm；
2. `pnpm install` 安装依赖；
3. `pnpm run build` 构建站点；
4. 通过 `JamesIves/github-pages-deploy-action` 将 `dist/` 目录部署到 `gh-pages` 分支。

自定义域名由仓库根目录的 `CNAME` 文件（`www.xihanfun.com`）声明，随 `dist/` 一并发布到 GitHub Pages。

## License

[MIT](./LICENSE) © 2026 摘繁华
