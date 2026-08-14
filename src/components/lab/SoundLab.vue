<script setup lang="ts">
import type { SoundTheme } from '@xihan-ui/sound'
import {
  BUILTIN_SOUND_NAMES,
  defaultSoundTheme,
  isAudioSupported,
  minimalSoundTheme,
  softSoundTheme,
} from '@xihan-ui/sound'
import {
  XhAlertDescription,
  XhAlertRoot,
  XhAlertTitle,
  XhButton,
  XhSliderControl,
  XhSliderLabel,
  XhSliderRange,
  XhSliderRoot,
  XhSliderThumb,
  XhSliderTrack,
  XhSwitch,
  XhToggleGroupRoot,
} from '@xihan-ui/vue'
import { getSoundPlayer } from '@xihan-ui/vue/sound'
import { onBeforeUnmount, ref, watch } from 'vue'

const player = getSoundPlayer()

const themes: Record<string, SoundTheme> = {
  default: defaultSoundTheme,
  minimal: minimalSoundTheme,
  soft: softSoundTheme,
}

const themeOptions = [
  { value: 'default', label: '清亮乐音' },
  { value: 'minimal', label: '短促干净' },
  { value: 'soft', label: '低音厚混响' },
]

const theme = ref('default')
const volume = ref([40])
const enabled = ref(true)
const last = ref<string | null>(null)

watch(theme, (next) => {
  const chosen = themes[next]
  if (chosen)
    player.setTheme(chosen)
})

watch(volume, (next) => {
  player.setVolume((next[0] ?? 0) / 100)
}, { immediate: true })

watch(enabled, (next) => {
  player.setEnabled(next)
})

function setTheme(value: string | string[] | null): void {
  const next = Array.isArray(value) ? value[0] : value
  if (next)
    theme.value = next
}

function play(name: string): void {
  // 点击本身就是用户手势，解锁与播放一起做，第一声不会被自动播放策略挡掉
  player.unlock()
  player.play(name)
  last.value = name
}

// 站点的共享播放器给整站用，离开实验室时把音量与开关还原成默认
onBeforeUnmount(() => {
  player.setTheme(defaultSoundTheme)
  player.setVolume(0.5)
  player.setEnabled(true)
})
</script>

<template>
  <div class="stack stack--lg">
    <XhAlertRoot v-if="!isAudioSupported()" tone="warning" :closable="false">
      <XhAlertTitle>这个环境没有 Web Audio</XhAlertTitle>
      <XhAlertDescription>播放调用会静默退化成空操作，不报错也不出声。</XhAlertDescription>
    </XhAlertRoot>

    <XhAlertRoot v-else tone="info" :closable="false">
      <XhAlertTitle>会真的出声，先把音量调小</XhAlertTitle>
      <XhAlertDescription>
        下面这 14 个语义名不是 14 个音频文件：每一声都是点下去那一刻用振荡器与噪声实时合成的，
        整个包比一张 mp3 还小。
      </XhAlertDescription>
    </XhAlertRoot>

    <div class="lab-controls">
      <div class="lab-field">
        <span class="lab-field__label">主题 <span class="lab-field__value">三套内置</span></span>
        <XhToggleGroupRoot
          :collection="themeOptions"
          :value="theme"
          disallow-empty
          @update:value="setTheme"
        />
      </div>

      <div class="lab-field">
        <XhSliderRoot v-model:value="volume" :min="0" :max="100" :step="5">
          <XhSliderLabel>主音量：{{ volume[0] }}%</XhSliderLabel>
          <XhSliderControl>
            <XhSliderTrack>
              <XhSliderRange />
            </XhSliderTrack>
            <XhSliderThumb :index="0" />
          </XhSliderControl>
        </XhSliderRoot>
      </div>

      <div class="lab-field">
        <span class="lab-field__label">发声开关</span>
        <div class="row">
          <XhSwitch v-model:checked="enabled" />
          <span class="text-sm muted">{{ enabled ? '开' : '关' }}</span>
        </div>
      </div>
    </div>

    <div class="panel stack">
      <div class="row" style="justify-content: space-between">
        <h3 class="title-md">14 个语义名</h3>
        <span class="mono subtle text-xs">
          {{ last ? `刚播：${last}` : '点一个试试' }}
        </span>
      </div>
      <div class="row">
        <XhButton
          v-for="name in BUILTIN_SOUND_NAMES"
          :key="name"
          variant="outline"
          size="sm"
          @click="play(name)"
        >
          {{ name }}
        </XhButton>
      </div>
    </div>
  </div>
</template>
