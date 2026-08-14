<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  lede?: string
}>()
</script>

<template>
  <div class="stack" style="gap: var(--xh-space-4); margin-block-end: var(--xh-space-8)">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 class="title-lg">{{ title }}</h2>
    <p v-if="lede" class="lede">{{ lede }}</p>
  </div>
</template>
