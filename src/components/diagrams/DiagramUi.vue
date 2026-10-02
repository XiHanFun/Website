<script setup lang="ts">
// 无头内核里的状态机经 connect() 分发给三个适配器
const adapters = [
  { y: 40, label: 'VUE' },
  { y: 87, label: 'REACT' },
  { y: 134, label: 'WEB COMP.' },
]
</script>

<template>
  <svg class="diagram" viewBox="0 0 320 200" fill="none" role="img" aria-label="无头内核的状态机经 connect 分发给 Vue、React 与 Web Components 三个适配器">
    <defs>
      <marker id="ui-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L6 3 L0 6 Z" fill="var(--diagram-line)" />
      </marker>
    </defs>

    <rect x="20" y="36" width="136" height="128" stroke="var(--diagram-line)" stroke-dasharray="3 3" />
    <text x="30" y="52" font-size="8" letter-spacing="1">HEADLESS CORE</text>

    <path d="M66 88 C84 70 104 70 118 84" stroke="var(--diagram-line)" marker-end="url(#ui-arrow)" />
    <path d="M124 104 C124 124 104 136 86 132" stroke="var(--diagram-line)" marker-end="url(#ui-arrow)" />
    <path d="M70 128 C54 120 50 108 56 100" stroke="var(--diagram-line)" marker-end="url(#ui-arrow)" />
    <circle cx="58" cy="94" r="9" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
    <circle cx="124" cy="94" r="9" fill="var(--diagram-accent)" />
    <circle cx="78" cy="136" r="9" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
    <text x="40" y="78" font-size="7">idle</text>
    <text x="114" y="117" font-size="7">open</text>
    <text x="90" y="155" font-size="7">closed</text>

    <circle cx="156" cy="100" r="3" fill="var(--diagram-accent)" />
    <text x="164" y="96" font-size="7">connect()</text>
    <path
      v-for="a in adapters"
      :key="a.label"
      :d="`M156 100 C196 100 192 ${a.y + 13} 228 ${a.y + 13}`"
      stroke="var(--diagram-accent)"
      stroke-width="1.2"
    />
    <g v-for="a in adapters" :key="`b${a.label}`">
      <rect x="228" :y="a.y" width="78" height="26" fill="var(--diagram-fill)" stroke="var(--diagram-node)" />
      <text x="238" :y="a.y + 16" font-size="8" letter-spacing="1" class="diagram__strong">{{ a.label }}</text>
    </g>
  </svg>
</template>
