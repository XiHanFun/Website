<script setup lang="ts">
defineProps<{
  title?: string
  code: string
  floatOffset?: number
}>()
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-xl border border-line/50 animate-float"
    style="background: linear-gradient(180deg, rgb(var(--c-surface-2) / 0.92), rgb(var(--c-surface) / 0.9))"
    :style="{ '--float-offset': `${floatOffset ?? -12}px` }"
  >
    <div class="flex items-center gap-2 border-b border-line/40 px-4 py-2.5">
      <span class="h-2 w-2 shrink-0 rounded-full bg-cyan/80 shadow-[0_0_10px_rgb(var(--c-cyan)/0.7)]" />
      <span v-if="title" class="font-mono text-[11px] tracking-wide text-ink2">{{ title }}</span>
      <span class="ml-auto font-mono text-[10px] text-ink3">~</span>
    </div>
    <pre class="overflow-x-auto px-4 py-3.5 font-mono text-[11px] leading-relaxed text-ink2 sm:text-xs"><code>{{ code }}</code></pre>
    <div class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style="box-shadow: inset 0 0 0 1px rgb(var(--c-cyan) / 0.28)" />
  </div>
</template>
