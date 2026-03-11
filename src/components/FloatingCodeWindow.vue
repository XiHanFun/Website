<script setup lang="ts">
defineProps<{
  title?: string
  code: string
  delay?: number
  floatOffset?: number
}>()
</script>

<template>
  <div
    class="floating-code-window group relative overflow-hidden"
    :style="{ animationDelay: `${delay ?? 0}ms`, '--float-offset': `${floatOffset ?? 0}px` }"
  >
    <div class="absolute inset-0 rounded-lg sm:rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-600/30 group-hover:border-cyan-500/40 transition-all duration-300" />
    <div class="relative p-3 sm:p-4">
      <div v-if="title" class="flex items-center gap-2 mb-2 sm:mb-3">
        <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400/90 shrink-0" />
        <span class="text-cyan-300 text-[10px] sm:text-xs font-medium">{{ title }}</span>
      </div>
      <pre class="font-mono text-[10px] sm:text-xs text-slate-300 overflow-x-auto leading-relaxed"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>
