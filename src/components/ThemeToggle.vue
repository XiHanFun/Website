<script setup lang="ts">
import { MonitorIcon, MoonIcon, SunIcon } from '@xihan-ui/icons'
import { XhButton, XhIcon } from '@xihan-ui/vue'
import { computed } from 'vue'
import { useTheme } from '../theme'

const { state, preference, setPreference } = useTheme()

/** 循环顺序：浅色 → 深色 → 跟随系统 → 浅色。 */
const CYCLE = [
  { mode: 'light', label: '浅色', icon: SunIcon },
  { mode: 'dark', label: '深色', icon: MoonIcon },
  { mode: 'system', label: '跟随系统', icon: MonitorIcon },
] as const

// 按钮代表的是「用户的意图」而不是定型值：选了跟随系统就该显示显示器，
// 哪怕此刻系统解析出来是深色
const index = computed(() => {
  const mode = preference.value.mode ?? 'system'
  const found = CYCLE.findIndex(item => item.mode === mode)
  return found === -1 ? 2 : found
})

const current = computed(() => CYCLE[index.value]!)
const next = computed(() => CYCLE[(index.value + 1) % CYCLE.length]!)

// 跟随系统时把解析结果一并报出来，读屏用户才知道现在到底是深是浅
const name = computed(() => {
  const resolved = current.value.mode === 'system' ? `（当前${state.value?.mode === 'dark' ? '深色' : '浅色'}）` : ''
  return `主题：${current.value.label}${resolved}，点击切换到${next.value.label}`
})

function cycle(): void {
  setPreference({ mode: next.value.mode })
}
</script>

<template>
  <XhButton
    variant="ghost"
    size="sm"
    :aria-label="name"
    :title="name"
    style="--xh-button-px: 0; inline-size: var(--xh-control-h-sm)"
    @click="cycle"
  >
    <XhIcon :icon="current.icon" size="sm" />
  </XhButton>
</template>
