<script setup lang="ts">
// 可信度一节的小线描，每种对应一条能在产品仓库里查到的事实
defineProps<{
  kind: 'modules' | 'permission' | 'tenants' | 'trace' | 'a11y' | 'open'
}>()
</script>

<template>
  <svg class="diagram" viewBox="0 0 160 72" fill="none" aria-hidden="true" style="max-inline-size: 220px">
    <!-- 模块：按需挑出的几块 -->
    <g v-if="kind === 'modules'">
      <rect v-for="(x, i) in [8, 40, 72, 104, 136]" :key="`t${i}`" :x="x" y="10" width="20" height="20" :stroke="i % 2 === 0 ? 'var(--diagram-accent)' : 'var(--diagram-faint)'" :fill="i % 2 === 0 ? 'var(--diagram-fill)' : 'none'" />
      <rect v-for="(x, i) in [24, 56, 88, 120]" :key="`b${i}`" :x="x" y="42" width="20" height="20" :stroke="i === 1 ? 'var(--diagram-accent)' : 'var(--diagram-faint)'" :fill="i === 1 ? 'var(--diagram-fill)' : 'none'" />
      <path d="M18 30 L66 42 M82 30 L66 42 M146 30 L66 42" stroke="var(--diagram-line)" />
    </g>

    <!-- 权限：三层叠加，最后一层把字段遮住 -->
    <g v-else-if="kind === 'permission'">
      <rect x="20" y="8" width="120" height="14" stroke="var(--diagram-line)" />
      <rect x="28" y="28" width="104" height="14" stroke="var(--diagram-line)" />
      <rect x="36" y="48" width="88" height="16" fill="var(--diagram-fill)" stroke="var(--diagram-accent)" />
      <text x="26" y="18" font-size="7">RBAC</text>
      <text x="34" y="38" font-size="7">ABAC</text>
      <text x="44" y="59" font-size="8">FLS ••••</text>
    </g>

    <!-- 多租户：各租户互不相通，同坐在一层平台上 -->
    <g v-else-if="kind === 'tenants'">
      <rect v-for="(x, i) in [14, 62, 110]" :key="i" :x="x" y="10" width="36" height="30" :stroke="i === 1 ? 'var(--diagram-accent)' : 'var(--diagram-line)'" fill="var(--diagram-fill)" />
      <line x1="56" y1="8" x2="56" y2="42" stroke="var(--diagram-faint)" stroke-dasharray="2 3" />
      <line x1="104" y1="8" x2="104" y2="42" stroke="var(--diagram-faint)" stroke-dasharray="2 3" />
      <rect x="8" y="50" width="144" height="14" stroke="var(--diagram-line)" />
      <text x="14" y="60" font-size="7">PLATFORM · TENANT 0</text>
    </g>

    <!-- 链路：一条请求的瀑布图 -->
    <g v-else-if="kind === 'trace'">
      <line x1="8" y1="64" x2="152" y2="64" stroke="var(--diagram-faint)" />
      <rect x="8" y="8" width="140" height="7" fill="var(--diagram-accent)" />
      <rect x="20" y="21" width="70" height="7" stroke="var(--diagram-line)" />
      <rect x="40" y="34" width="44" height="7" stroke="var(--diagram-line)" />
      <rect x="96" y="21" width="48" height="7" stroke="var(--diagram-line)" />
      <rect x="104" y="34" width="22" height="7" stroke="var(--diagram-line)" />
      <text x="8" y="56" font-size="7">TRACE · SPAN</text>
    </g>

    <!-- 无障碍：键盘可达，焦点可见 -->
    <g v-else-if="kind === 'a11y'">
      <rect x="10" y="22" width="34" height="26" stroke="var(--diagram-line)" />
      <rect x="54" y="22" width="34" height="26" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
      <rect x="50" y="18" width="42" height="34" stroke="var(--diagram-accent)" stroke-width="1.5" />
      <rect x="102" y="22" width="48" height="26" stroke="var(--diagram-line)" />
      <text x="18" y="39" font-size="8">Tab</text>
      <text x="64" y="39" font-size="8">↵</text>
      <text x="110" y="39" font-size="8">Esc</text>
      <text x="10" y="66" font-size="7">W3C APG</text>
    </g>

    <!-- 开源：主干与分支 -->
    <g v-else>
      <line x1="8" y1="36" x2="152" y2="36" stroke="var(--diagram-line)" />
      <path d="M40 36 C56 36 56 14 74 14 L118 14 C134 14 134 36 150 36" stroke="var(--diagram-accent)" />
      <path d="M70 36 C84 36 84 58 100 58 L128 58" stroke="var(--diagram-line)" />
      <circle v-for="x in [24, 40, 96, 150]" :key="x" :cx="x" cy="36" r="4" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
      <circle cx="96" cy="14" r="4" fill="var(--diagram-accent)" />
      <circle cx="128" cy="58" r="4" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
      <text x="8" y="66" font-size="7">MIT</text>
    </g>
  </svg>
</template>
