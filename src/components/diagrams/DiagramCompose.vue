<template>
  <!-- 组合方式：BasicApp 的后端引用 Framework（NuGet），前端引用 UI（npm），前后端经动态 API 对接 -->
  <svg class="diagram" viewBox="0 0 960 300" fill="none" role="img" aria-label="XiHan.BasicApp 的后端引用 XiHan.Framework，前端引用 XiHan.UI，前后端通过动态 API 对接">
    <defs>
      <marker id="cp-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--diagram-accent)" />
      </marker>
    </defs>

    <rect x="40" y="20" width="880" height="118" stroke="var(--diagram-line)" stroke-dasharray="4 4" />
    <text x="58" y="42" font-size="11" letter-spacing="2">XIHAN.BASICAPP · 基础应用</text>

    <rect x="64" y="58" width="380" height="58" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
    <text x="82" y="84" font-size="14" class="diagram__strong">后端</text>
    <text x="82" y="104" font-size="10">应用服务 · 动态 API · 多租户 · 审计</text>

    <rect x="516" y="58" width="380" height="58" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
    <text x="534" y="84" font-size="14" class="diagram__strong">前端</text>
    <text x="534" y="104" font-size="10">Schema 页面 · 权限感知 · 主题 · 国际化</text>

    <line x1="444" y1="87" x2="516" y2="87" stroke="var(--diagram-line)" stroke-dasharray="3 3" />
    <text x="458" y="80" font-size="9">REST</text>

    <line x1="254" y1="116" x2="254" y2="190" stroke="var(--diagram-accent)" stroke-width="1.5" marker-end="url(#cp-arrow)" />
    <text x="264" y="158" font-size="9">NuGet</text>
    <line x1="706" y1="116" x2="706" y2="190" stroke="var(--diagram-accent)" stroke-width="1.5" marker-end="url(#cp-arrow)" />
    <text x="716" y="158" font-size="9">npm</text>

    <rect x="64" y="196" width="380" height="76" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
    <text x="82" y="228" font-size="16" class="diagram__strong">XiHan.Framework</text>
    <text x="82" y="252" font-size="10">后端基座 · .NET 现代模块化开发框架</text>

    <rect x="516" y="196" width="380" height="76" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
    <text x="534" y="228" font-size="16" class="diagram__strong">XiHan.UI</text>
    <text x="534" y="252" font-size="10">前端基座 · 框架无关 Headless UI 组件库</text>

    <g stroke="var(--diagram-faint)">
      <line x1="20" y1="20" x2="20" y2="272" />
      <line x1="16" y1="20" x2="24" y2="20" />
      <line x1="16" y1="138" x2="24" y2="138" />
      <line x1="16" y1="196" x2="24" y2="196" />
      <line x1="16" y1="272" x2="24" y2="272" />
    </g>
    <text x="40" y="292" font-size="9" letter-spacing="1">APPLICATION</text>
    <text x="840" y="292" font-size="9" letter-spacing="1">FOUNDATION</text>
  </svg>
</template>
