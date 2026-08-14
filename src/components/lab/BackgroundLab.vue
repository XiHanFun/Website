<script setup lang="ts">
import type { BackgroundQuality, ParamSpec, ParamValue } from '@xihan-ui/backgrounds'
import { defaultParams, effectNames, getEffect, registerBuiltinEffects } from '@xihan-ui/backgrounds'
import {
  XhButton,
  XhSelectRoot,
  XhSliderControl,
  XhSliderRange,
  XhSliderRoot,
  XhSliderThumb,
  XhSliderTrack,
  XhSwitch,
  XhToggleGroupRoot,
} from '@xihan-ui/vue'
import { XhBackground } from '@xihan-ui/vue/backgrounds'
import { computed, ref, watch } from 'vue'

// 内置效果不自动注册：不点这一下，14 个效果一个都进不了产物
registerBuiltinEffects()

const names = effectNames()

const effectOptions = names.map(name => ({ value: name, label: name }))
const qualityOptions = [
  { value: 'auto', label: '自动' },
  { value: 'high', label: '高' },
  { value: 'balanced', label: '均衡' },
  { value: 'eco', label: '省电' },
]

const effect = ref<string[]>(['aurora'])
const quality = ref<BackgroundQuality>('balanced')
const playing = ref(true)

const currentName = computed(() => effect.value[0] ?? 'aurora')
const specs = computed(() => getEffect(currentName.value)?.params ?? {})
const params = ref<Record<string, ParamValue>>({ ...defaultParams(specs.value) })

// 换效果就整份换参数：上一份里的键在新效果里未必存在，留着只会喂进去被丢掉
watch(currentName, () => {
  params.value = { ...defaultParams(specs.value) }
})

function isNumber(spec: ParamSpec): spec is Extract<ParamSpec, { kind: 'number' }> {
  return spec.kind === 'number'
}

function isColor(spec: ParamSpec): spec is Extract<ParamSpec, { kind: 'color' }> {
  return spec.kind === 'color'
}

function isBoolean(spec: ParamSpec): spec is Extract<ParamSpec, { kind: 'boolean' }> {
  return spec.kind === 'boolean'
}

function isEnum(spec: ParamSpec): spec is Extract<ParamSpec, { kind: 'enum' }> {
  return spec.kind === 'enum'
}

function numberOf(key: string): number[] {
  const value = params.value[key]
  return [typeof value === 'number' ? value : 0]
}

function setNumber(key: string, value: number[]): void {
  params.value = { ...params.value, [key]: value[0] ?? 0 }
}

function setColor(key: string, event: Event): void {
  const input = event.target as HTMLInputElement
  params.value = { ...params.value, [key]: input.value }
}

function setBoolean(key: string, value: boolean): void {
  params.value = { ...params.value, [key]: value }
}

function setEnum(key: string, value: string | string[] | null): void {
  const next = Array.isArray(value) ? value[0] : value
  if (next !== null && next !== undefined)
    params.value = { ...params.value, [key]: next }
}

function reset(): void {
  params.value = { ...defaultParams(specs.value) }
}

function setQuality(value: string | string[] | null): void {
  const next = Array.isArray(value) ? value[0] : value
  if (next)
    quality.value = next as BackgroundQuality
}
</script>

<template>
  <div class="stack stack--lg">
    <div class="lab-canvas">
      <XhBackground
        class="bg-fill"
        :effect="currentName"
        :params="params"
        :quality="quality"
        :autoplay="playing"
      />
    </div>

    <div class="lab-controls">
      <div class="lab-field">
        <span class="lab-field__label">效果 <span class="lab-field__value">{{ names.length }} 种</span></span>
        <XhSelectRoot v-model:value="effect" :collection="effectOptions" placeholder="选一个效果" />
      </div>

      <div class="lab-field">
        <span class="lab-field__label">画质档位</span>
        <XhToggleGroupRoot
          :collection="qualityOptions"
          :value="quality"
          disallow-empty
          @update:value="setQuality"
        />
      </div>

      <div class="lab-field">
        <span class="lab-field__label">播放</span>
        <div class="row">
          <XhSwitch v-model:checked="playing" />
          <XhButton variant="ghost" size="sm" @click="reset">重置参数</XhButton>
        </div>
      </div>
    </div>

    <div class="panel stack">
      <div class="row" style="justify-content: space-between">
        <h3 class="title-md">参数面板</h3>
        <span class="mono subtle text-xs">下面这些控件按效果自带的参数规格生成，不是手写的</span>
      </div>

      <div class="lab-controls">
        <div v-for="(spec, key) in specs" :key="key" class="lab-field">
          <span class="lab-field__label">
            {{ spec.label }}
            <span class="lab-field__value">{{ key }} = {{ params[key] }}</span>
          </span>

          <XhSliderRoot
            v-if="isNumber(spec)"
            :value="numberOf(key)"
            :min="spec.min"
            :max="spec.max"
            :step="spec.step"
            @update:value="(v: number[]) => setNumber(key, v)"
          >
            <XhSliderControl>
              <XhSliderTrack>
                <XhSliderRange />
              </XhSliderTrack>
              <XhSliderThumb :index="0" />
            </XhSliderControl>
          </XhSliderRoot>

          <input
            v-else-if="isColor(spec)"
            type="color"
            class="lab-color"
            :value="params[key]"
            @input="(e) => setColor(key, e)"
          >

          <XhSwitch
            v-else-if="isBoolean(spec)"
            :checked="params[key] === true"
            @update:checked="(v: boolean) => setBoolean(key, v)"
          />

          <XhToggleGroupRoot
            v-else-if="isEnum(spec)"
            :collection="spec.values.map((v) => ({ value: v, label: v }))"
            :value="String(params[key])"
            disallow-empty
            @update:value="(v) => setEnum(key, v)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 原生取色器：库里的 color-picker 是完整浮层，参数面板里用不着那么重 */
.lab-color {
  inline-size: 100%;
  block-size: 32px;
  padding: 2px;
  border: 1px solid var(--xh-border-default);
  border-radius: var(--xh-radius-md);
  background: var(--xh-bg-surface);
  cursor: pointer;
}
</style>
