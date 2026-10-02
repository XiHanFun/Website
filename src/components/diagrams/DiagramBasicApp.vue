<script setup lang="ts">
// 一次请求穿过三道权限门：RBAC 定能不能调，ABAC 筛掉看不到的行，FLS 把不该看的列脱敏
const gates = [
  { x: 74, label: 'RBAC' },
  { x: 120, label: 'ABAC' },
  { x: 166, label: 'FLS' },
]

const rows = [52, 74, 96, 118, 140]
const hiddenRows = new Set([74, 118])
</script>

<template>
  <svg class="diagram" viewBox="0 0 320 200" fill="none" role="img" aria-label="一次请求依次通过 RBAC、ABAC 与字段级安全三道服务端权限门，看不到的行被过滤，敏感列被脱敏">
    <defs>
      <marker id="ba-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--diagram-accent)" />
      </marker>
    </defs>

    <text x="10" y="92" font-size="7" letter-spacing="1">REQUEST</text>
    <g v-for="g in gates" :key="g.label">
      <line :x1="g.x" y1="40" :x2="g.x" y2="160" stroke="var(--diagram-line)" />
      <line :x1="g.x - 5" y1="40" :x2="g.x + 5" y2="40" stroke="var(--diagram-node)" />
      <line :x1="g.x - 5" y1="160" :x2="g.x + 5" y2="160" stroke="var(--diagram-node)" />
      <text :x="g.x - 11" y="30" font-size="7" letter-spacing="0.5">{{ g.label }}</text>
      <rect :x="g.x - 3" y="97" width="6" height="6" fill="var(--diagram-accent)" />
    </g>
    <line x1="10" y1="100" x2="208" y2="100" stroke="var(--diagram-accent)" stroke-width="1.5" marker-end="url(#ba-arrow)" />

    <rect x="214" y="40" width="96" height="120" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
    <line x1="214" y1="62" x2="310" y2="62" stroke="var(--diagram-line)" />
    <rect x="222" y="49" width="18" height="3" fill="var(--diagram-accent)" />
    <rect x="252" y="49" width="20" height="3" fill="var(--diagram-accent)" />
    <rect x="284" y="49" width="16" height="3" fill="var(--diagram-accent)" />
    <g v-for="y in rows.slice(1)" :key="y" :opacity="hiddenRows.has(y) ? 0.25 : 1">
      <line x1="214" :y1="y + 10" x2="310" :y2="y + 10" stroke="var(--diagram-faint)" />
      <rect x="222" :y="y + 2" width="20" height="3" fill="var(--diagram-line)" />
      <rect x="252" :y="y + 2" width="16" height="3" fill="var(--diagram-line)" />
      <text x="283" :y="y + 7" font-size="8">***</text>
    </g>
    <text x="214" y="176" font-size="7" letter-spacing="0.5">ROW FILTER · FIELD MASK</text>
  </svg>
</template>
