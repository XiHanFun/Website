<script setup lang="ts">
import type { IconRecord } from '@xihan-ui/icons'
import { XhButton, XhIcon } from '@xihan-ui/vue'
import { computed } from 'vue'
import { useTheme } from '../theme'

const { state, preference, setPreference } = useTheme()

/*
 * 图标记录是纯数据：坐标系 + 打在根 svg 上的呈现属性 + 图元树。
 * @xihan-ui/icons 的一等图标集里还没有日月与显示器这三枚，按同一份契约就地写。
 * stroke 取 currentColor，配色随上下文的文字色流下来。
 */
const STROKE = {
  'fill': 'none',
  'stroke': 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
} as const

const SunIcon: IconRecord = {
  name: 'sun',
  viewBox: '0 0 24 24',
  attrs: STROKE,
  nodes: [
    { tag: 'circle', attrs: { cx: '12', cy: '12', r: '4.5' } },
    { tag: 'path', attrs: { d: 'M12 2V4.5' } },
    { tag: 'path', attrs: { d: 'M12 19.5V22' } },
    { tag: 'path', attrs: { d: 'M2 12H4.5' } },
    { tag: 'path', attrs: { d: 'M19.5 12H22' } },
    { tag: 'path', attrs: { d: 'M4.93 4.93L6.7 6.7' } },
    { tag: 'path', attrs: { d: 'M17.3 17.3L19.07 19.07' } },
    { tag: 'path', attrs: { d: 'M4.93 19.07L6.7 17.3' } },
    { tag: 'path', attrs: { d: 'M17.3 6.7L19.07 4.93' } },
  ],
}

const MoonIcon: IconRecord = {
  name: 'moon',
  viewBox: '0 0 24 24',
  attrs: STROKE,
  nodes: [
    { tag: 'path', attrs: { d: 'M20.5 14.3A8.8 8.8 0 0 1 9.7 3.5A8.8 8.8 0 1 0 20.5 14.3Z' } },
  ],
}

const SystemIcon: IconRecord = {
  name: 'system',
  viewBox: '0 0 24 24',
  attrs: STROKE,
  nodes: [
    { tag: 'rect', attrs: { x: '2.5', y: '4', width: '19', height: '13', rx: '2' } },
    { tag: 'path', attrs: { d: 'M8.5 21H15.5' } },
    { tag: 'path', attrs: { d: 'M12 17V21' } },
  ],
}

/** 循环顺序：浅色 → 深色 → 跟随系统 → 浅色。 */
const CYCLE = [
  { mode: 'light', label: '浅色', icon: SunIcon },
  { mode: 'dark', label: '深色', icon: MoonIcon },
  { mode: 'system', label: '跟随系统', icon: SystemIcon },
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
