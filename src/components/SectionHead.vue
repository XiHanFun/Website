<script setup lang="ts">
// 节标题：编号 + 标题 + 导语。split 时导语与标题左右并排。
defineProps<{
  eyebrow: string
  title: string
  lede?: string
  split?: boolean
}>()
</script>

<template>
  <header class="section-head" :class="{ 'section-head--split': split }">
    <div class="stack" style="gap: var(--xh-space-4)">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 class="h-section">{{ title }}</h2>
    </div>
    <p v-if="lede" class="lede">{{ lede }}</p>
  </header>
</template>
