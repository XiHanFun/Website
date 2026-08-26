<script setup lang="ts">
import { CheckIcon } from '@xihan-ui/icons'
import { XhClipboardIndicator, XhClipboardRoot, XhClipboardTrigger, XhCodeBlock, XhIcon } from '@xihan-ui/vue'
import { highlighter } from '../highlighter'

defineProps<{
  code: string
  lang: string
  title?: string
}>()
</script>

<template>
  <div class="code-sample">
    <div v-if="title" class="code-sample__bar">
      <span class="mono subtle text-xs">{{ title }}</span>
      <XhClipboardRoot :value="code">
        <XhClipboardTrigger>
          <XhClipboardIndicator>复制</XhClipboardIndicator>
          <XhClipboardIndicator copied><XhIcon :icon="CheckIcon" /> 已复制</XhClipboardIndicator>
        </XhClipboardTrigger>
      </XhClipboardRoot>
    </div>
    <XhCodeBlock :code="code" :lang="lang" :highlighter="highlighter" complete />
  </div>
</template>

<style scoped>
.code-sample {
  display: flex;
  flex-direction: column;
  gap: var(--xh-space-2);
  min-inline-size: 0;
}

.code-sample__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--xh-space-3);
}
</style>
