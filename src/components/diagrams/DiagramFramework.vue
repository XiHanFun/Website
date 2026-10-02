<script setup lang="ts">
// 五层模块依赖图：上层只依赖下层，高亮一条从 Web 到 Core 的装配链
const layers = [
  { y: 32, label: 'WEB' },
  { y: 68, label: 'INFRA' },
  { y: 104, label: 'DOMAIN' },
  { y: 140, label: 'APP' },
  { y: 176, label: 'CORE' },
]

const nodes: [number, number][] = [
  [110, 32], [170, 32], [230, 32], [290, 32],
  [95, 68], [145, 68], [195, 68], [245, 68], [295, 68],
  [150, 104], [240, 104],
  [130, 140], [220, 140],
  [175, 176],
]

const edges: [number, number, number, number][] = [
  [110, 32, 95, 68], [110, 32, 145, 68], [170, 32, 145, 68], [230, 32, 245, 68], [290, 32, 295, 68], [230, 32, 195, 68],
  [95, 68, 150, 104], [145, 68, 150, 104], [245, 68, 240, 104], [295, 68, 240, 104],
  [150, 104, 130, 140], [150, 104, 220, 140],
  [130, 140, 175, 176],
]

const chain: [number, number][] = [[170, 32], [195, 68], [240, 104], [220, 140], [175, 176]]
const chainPath = chain.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join(' ')
</script>

<template>
  <svg class="diagram" viewBox="0 0 320 200" fill="none" role="img" aria-label="模块依赖图：展示、基础设施、领域、应用、核心五层，上层依赖下层">
    <g v-for="l in layers" :key="l.label">
      <line x1="64" :y1="l.y" x2="312" :y2="l.y" stroke="var(--diagram-faint)" stroke-dasharray="2 4" />
      <text x="8" :y="l.y + 3" font-size="8" letter-spacing="1">{{ l.label }}</text>
    </g>
    <line v-for="(e, i) in edges" :key="i" :x1="e[0]" :y1="e[1]" :x2="e[2]" :y2="e[3]" stroke="var(--diagram-line)" />
    <path :d="chainPath" stroke="var(--diagram-accent)" stroke-width="1.5" />
    <rect
      v-for="(n, i) in nodes"
      :key="`n${i}`"
      :x="n[0] - 3.5"
      :y="n[1] - 3.5"
      width="7"
      height="7"
      fill="var(--diagram-fill)"
      stroke="var(--diagram-node)"
    />
    <rect v-for="(n, i) in chain" :key="`c${i}`" :x="n[0] - 3.5" :y="n[1] - 3.5" width="7" height="7" fill="var(--diagram-accent)" />
    <text x="178" y="22" font-size="8">[DependsOn]</text>
    <text x="184" y="192" font-size="8">TOPO-SORT</text>
  </svg>
</template>
