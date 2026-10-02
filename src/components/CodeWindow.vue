<script setup lang="ts">
import { CheckIcon, CopyIcon } from '@xihan-ui/icons'
import {
  XhClipboardCopyTrigger,
  XhClipboardIndicator,
  XhClipboardRoot,
  XhCodeViewCode,
  XhCodeViewPre,
  XhCodeViewRoot,
  XhIcon,
  XhTabsContent,
  XhTabsIndicator,
  XhTabsList,
  XhTabsRoot,
  XhTabsTrigger,
} from '@xihan-ui/vue'
import { computed, ref } from 'vue'
import { highlighter } from '../highlighter'

export interface CodeItem {
  value: string
  label: string
  lang: string
  code: string
}

// 代码窗：窗体栏放页签与复制，下面是代码视图。只有一段时栏里显示它的标题，不出页签。
const props = defineProps<{
  items: CodeItem[]
  /** 页签组的可访问名 */
  label: string
}>()

const active = ref(props.items[0]!.value)
const current = computed(() => props.items.find(item => item.value === active.value) ?? props.items[0]!)

function select(value: string | null): void {
  if (value !== null)
    active.value = value
}

// 复制按钮压成安静形态：无边无底，只在悬停时换底色
const quietCopy = {
  '--xh-clipboard-copy-trigger-border': 'transparent',
  '--xh-clipboard-copy-trigger-border-hover': 'transparent',
  '--xh-clipboard-copy-trigger-bg': 'transparent',
  '--xh-clipboard-copy-trigger-h': 'var(--xh-control-h-sm)',
  '--xh-clipboard-copy-trigger-px': 'var(--xh-control-px-sm)',
  '--xh-clipboard-copy-trigger-font-size': 'var(--xh-text-caption-size)',
}
</script>

<template>
  <XhTabsRoot v-if="items.length > 1" class="code-window" :value="active" size="sm" @update:value="select">
    <div class="code-window__bar">
      <span class="code-window__lights" aria-hidden="true"><i /><i /><i /></span>
      <XhTabsList :aria-label="label" style="flex: 1; min-inline-size: 0">
        <XhTabsTrigger v-for="item in items" :key="item.value" :value="item.value">{{ item.label }}</XhTabsTrigger>
        <XhTabsIndicator />
      </XhTabsList>
      <XhClipboardRoot :value="current.code" :timeout="1500" :style="quietCopy">
        <XhClipboardCopyTrigger>
          <XhClipboardIndicator><XhIcon :icon="CopyIcon" /> 复制</XhClipboardIndicator>
          <XhClipboardIndicator copied><XhIcon :icon="CheckIcon" /> 已复制</XhClipboardIndicator>
        </XhClipboardCopyTrigger>
      </XhClipboardRoot>
    </div>
    <XhTabsContent v-for="item in items" :key="item.value" :value="item.value" class="code-window__body">
      <XhCodeViewRoot :code="item.code" :lang="item.lang" :highlighter="highlighter" complete>
        <XhCodeViewPre>
          <XhCodeViewCode />
        </XhCodeViewPre>
      </XhCodeViewRoot>
    </XhTabsContent>
  </XhTabsRoot>

  <div v-else class="code-window">
    <div class="code-window__bar">
      <span class="code-window__lights" aria-hidden="true"><i /><i /><i /></span>
      <span class="mono text-subtle" style="flex: 1">{{ current.label }}</span>
      <XhClipboardRoot :value="current.code" :timeout="1500" :style="quietCopy">
        <XhClipboardCopyTrigger>
          <XhClipboardIndicator><XhIcon :icon="CopyIcon" /> 复制</XhClipboardIndicator>
          <XhClipboardIndicator copied><XhIcon :icon="CheckIcon" /> 已复制</XhClipboardIndicator>
        </XhClipboardCopyTrigger>
      </XhClipboardRoot>
    </div>
    <div class="code-window__body">
      <XhCodeViewRoot :code="current.code" :lang="current.lang" :highlighter="highlighter" :filename="current.label" complete>
        <XhCodeViewPre>
          <XhCodeViewCode />
        </XhCodeViewPre>
      </XhCodeViewRoot>
    </div>
  </div>
</template>
