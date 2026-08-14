<script setup lang="ts">
import type { ColorMode } from '@xihan-ui/tokens/runtime'
import { XhToggleGroupRoot } from '@xihan-ui/vue'
import { computed } from 'vue'
import { useTheme } from '../theme'

const { state, preference, setPreference } = useTheme()

const modes = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
  { value: 'system', label: '跟随系统' },
]

// 意图里的 'system' 与定型后的 light / dark 是两件事：分段控件显示的是前者
const current = computed(() => preference.value.mode ?? 'system')

function setMode(value: string | string[] | null): void {
  const next = Array.isArray(value) ? value[0] : value
  if (next)
    setPreference({ mode: next as ColorMode | 'system' })
}
</script>

<template>
  <XhToggleGroupRoot
    :collection="modes"
    :value="current"
    disallow-empty
    aria-label="色彩模式"
    @update:value="setMode"
  />
  <span class="mono subtle text-xs">{{ state?.mode === 'dark' ? '深色生效中' : '浅色生效中' }}</span>
</template>
