[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.5-42b883)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff)](https://vitejs.org/)
[![XiHan.UI](https://img.shields.io/badge/XiHan.UI-1.1.0-8b5cf6)](https://ui.docs.xihanfun.com)

# XiHan.Website

曦寒（XiHanFun）官方网站源码，[www.xihanfun.com](https://www.xihanfun.com)。站点展示曦寒生态的三大产品——[XiHan.Framework](https://github.com/XiHanFun/XiHan.Framework)（后端框架）、[XiHan.UI](https://github.com/XiHanFun/XiHan.UI)（框架无关设计系统）、[XiHan.BasicApp](https://github.com/XiHanFun/XiHan.BasicApp)（多租户中后台）——并链接到各自的文档、在线 Demo 与社区入口。

站点本身是 XiHan.UI 的第一个对外消费方：**除 XiHan.UI 外不引任何 UI 库，也不引 CSS 框架**。顶栏、抽屉、卡片、标签页、表格、代码块、统计数字、首屏背景全部来自 `@xihan-ui/vue`，排版层只用 `@xihan-ui/tokens` 的设计令牌手写。

## 技术栈

- Vue 3.5（`<script setup>`）+ TypeScript 5.9 + Vue Router 4
- Vite 6 构建，`@vitejs/plugin-vue`
- [XiHan.UI](https://ui.docs.xihanfun.com) `1.1.0`
  - `@xihan-ui/vue` 组件与状态机运行时
  - `@xihan-ui/styles` 默认皮肤 · `@xihan-ui/tokens` 设计令牌与主题运行时
  - `@xihan-ui/backgrounds` WebGL2 背景 · `@xihan-ui/sound` 程序化音效
  - `@xihan-ui/markdown` 流式 Markdown · `@xihan-ui/code-highlight` 代码着色
- 包管理：pnpm 11 / Node 24

## 页面

| 路由 | 内容 |
| --- | --- |
| `/` | 首屏、三大产品、数字、快速开始、社区 |
| `/framework` | 66 模块五层架构、能力清单、代码示例、技术选型 |
| `/ui` | 18 个包与四个角色组、设计原则、三种用法、121 个组件总览、接入方式 |
| `/basicapp` | 权限三层、三根支柱、七类审计、模块清单、本地启动 |

## 目录结构

```
Website/
├── index.html               # 入口页面，含 SEO / OG / Twitter Card meta
├── src/
│   ├── main.ts               # 皮肤导入、主题运行时、挂载
│   ├── App.vue               # 站点外壳：顶栏 + 路由出口 + 页脚 + 回到顶部
│   ├── router.ts             # 四条页面路由 + 通配兜底回首页，懒加载
│   ├── theme.ts              # 主题控制器，整站共用一个实例
│   ├── highlighter.ts        # 代码着色器，整站共用一份
│   ├── components/
│   │   ├── SiteHeader.vue / SiteFooter.vue / SectionHead.vue
│   │   ├── ThemeToggle.vue       # 顶栏色彩模式循环按钮
│   │   ├── ThemeControls.vue     # 抽屉里的色彩模式分段控件
│   │   └── CodeSample.vue        # 代码块 + 复制按钮
│   ├── composables/reveal.ts     # v-reveal 滚动进场指令
│   ├── data/                     # 站点文案与清单（产品、分层、包、模块）
│   ├── pages/                    # 四个页面
│   └── styles/site.css           # 站点自有样式，收在 @layer site
├── scripts/spa-fallback.mjs   # 构建后把 index.html 复制成 404.html
├── public/                    # 静态资源，原样拷贝到 dist（含 CNAME）
├── vite.config.ts
└── .github/workflows/deploy-website.yml
```

### 样式层的两条约定

1. **站点样式收在 `@layer site`**。它在 `@xihan-ui/styles` 之后引入，所以排在 `xihan.*` 全部子层之后，站点规则天然压得住皮肤。
2. **全局元素重置一律带 `:not([data-scope])`**。站点层排在皮肤之后，裸的 `a {}` / `button {}` 会连库节点一起命中并压掉皮肤；这个否定选择器把库的部件让出去。

`main.ts` 只引 `@xihan-ui/styles` 一个入口，不再单独引一次 `tokens.css`——皮肤入口第一句就是层序声明、第二句才是令牌，顺序由它保证；抢在它前面引令牌会让 `xihan.tokens` 先注册，把层序拧了。

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建与预览

```bash
pnpm run build
```

依次跑三步：`vue-tsc --noEmit` 类型检查 → `vite build` 出 `dist/` → `scripts/spa-fallback.mjs` 生成 `dist/404.html`。

```bash
pnpm run preview
```

## 部署

推送或提交 PR 到 `main` 分支时，GitHub Actions（`.github/workflows/deploy-website.yml`）会自动安装 Node 24 与 pnpm 11、`pnpm install --frozen-lockfile`、`pnpm run build`，再通过 `JamesIves/github-pages-deploy-action` 把 `dist/` 部署到 `gh-pages` 分支。

三个与 GitHub Pages 有关的细节，缺一个站点就是坏的：

- **`public/.nojekyll`**：Pages 默认跑 Jekyll，而 Jekyll 会把 `_` 开头的文件当源文件排除在产物之外。Vite 的共享分片里有一个 `_plugin-vue_export-helper-*.js`，没有这个空文件它就会 404，懒加载的路由分片跟着整片挂掉——表现是页头页脚正常、正文空白。这个文件不能删。
- **`public/CNAME`**：自定义域名 `www.xihanfun.com` 随 `dist/` 一并发布。放在仓库根目录的那一份不会进产物。
- **`dist/404.html`**：Pages 是静态托管，直接访问 `/framework` 这类深链接会落到 404；构建后把 `index.html` 复制一份成 `404.html`，Pages 拿它兜底，路由再交回前端。

## License

[MIT](./LICENSE) © 2021-Present XiHanFun and contributors.
