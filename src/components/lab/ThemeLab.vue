<script setup lang="ts">
import type { Contrast, Density, Direction } from '@xihan-ui/tokens/runtime'
import { brandId, registerBrand } from '@xihan-ui/tokens/runtime'
import {
  XhAlertDescription,
  XhAlertRoot,
  XhAlertTitle,
  XhBadge,
  XhButton,
  XhCheckbox,
  XhProgress,
  XhSelectRoot,
  XhSliderControl,
  XhSliderRange,
  XhSliderRoot,
  XhSliderThumb,
  XhSliderTrack,
  XhSwitch,
  XhTextFieldInput,
  XhTextFieldLabel,
  XhTextFieldRoot,
  XhToggleGroupRoot,
} from '@xihan-ui/vue'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { useTheme } from '../../theme'

const { state, preference, setPreference } = useTheme()

const axes = {
  mode: [
    { value: 'light', label: '浅色' },
    { value: 'dark', label: '深色' },
    { value: 'system', label: '跟随系统' },
  ],
  density: [
    { value: 'comfortable', label: '宽松' },
    { value: 'compact', label: '紧凑' },
  ],
  contrast: [
    { value: 'base', label: '基线' },
    { value: 'more', label: '高对比' },
    { value: 'system', label: '跟随系统' },
  ],
  dir: [
    { value: 'ltr', label: '从左到右' },
    { value: 'rtl', label: '从右到左' },
  ],
}

function first(value: string | string[] | null): string | null {
  return Array.isArray(value) ? (value[0] ?? null) : value
}

function setMode(value: string | string[] | null): void {
  const next = first(value)
  if (next)
    setPreference({ mode: next as 'light' | 'dark' | 'system' })
}

function setDensity(value: string | string[] | null): void {
  const next = first(value)
  if (next)
    setPreference({ density: next as Density })
}

function setContrast(value: string | string[] | null): void {
  const next = first(value)
  if (next)
    setPreference({ contrast: next as Contrast | 'system' })
}

function setDir(value: string | string[] | null): void {
  const next = first(value)
  if (next)
    setPreference({ dir: next as Direction })
}

// 品牌轴：一枚种子色派生出 11 档 brand 原语，注册成 [data-brand='lab'] 取值块
const seeds = [
  { value: '', label: '内置 xihan' },
  { value: '#e0533d', label: '曦红' },
  { value: '#12a594', label: '青竹' },
  { value: '#8b5cf6', label: '紫棠' },
  { value: '#d97706', label: '琥珀' },
  { value: '#0ea5e9', label: '天青' },
]

const seed = ref<string[]>([''])
const disposeBrand = shallowRef<(() => void) | null>(null)

watch(seed, (next) => {
  const value = next[0] ?? ''
  disposeBrand.value?.()
  disposeBrand.value = null

  if (value === '') {
    setPreference({ brand: brandId('xihan') })
    return
  }
  disposeBrand.value = registerBrand('lab', value)
  setPreference({ brand: brandId('lab') })
})

onBeforeUnmount(() => {
  disposeBrand.value?.()
  setPreference({ brand: brandId('xihan') })
})

// 预览区里的活控件
const wifi = ref(true)
const agree = ref<boolean | 'indeterminate'>(true)
const level = ref([62])
</script>

<template>
  <div class="stack stack--lg">
    <div class="lab-controls">
      <div class="lab-field">
        <span class="lab-field__label">色彩模式 <span class="lab-field__value">data-theme</span></span>
        <XhToggleGroupRoot
          :collection="axes.mode"
          :value="preference.mode ?? 'system'"
          disallow-empty
          @update:value="setMode"
        />
      </div>

      <div class="lab-field">
        <span class="lab-field__label">密度 <span class="lab-field__value">data-density</span></span>
        <XhToggleGroupRoot
          :collection="axes.density"
          :value="preference.density ?? 'comfortable'"
          disallow-empty
          @update:value="setDensity"
        />
      </div>

      <div class="lab-field">
        <span class="lab-field__label">对比度 <span class="lab-field__value">data-contrast</span></span>
        <XhToggleGroupRoot
          :collection="axes.contrast"
          :value="preference.contrast ?? 'base'"
          disallow-empty
          @update:value="setContrast"
        />
      </div>

      <div class="lab-field">
        <span class="lab-field__label">书写方向 <span class="lab-field__value">dir</span></span>
        <XhToggleGroupRoot
          :collection="axes.dir"
          :value="preference.dir ?? 'ltr'"
          disallow-empty
          @update:value="setDir"
        />
      </div>

      <div class="lab-field">
        <span class="lab-field__label">品牌种子 <span class="lab-field__value">data-brand</span></span>
        <XhSelectRoot v-model:value="seed" :collection="seeds" placeholder="选一枚种子色" />
      </div>
    </div>

    <XhAlertRoot tone="info" :closable="false">
      <XhAlertTitle>五个属性写在 &lt;html&gt; 上</XhAlertTitle>
      <XhAlertDescription>
        当前定型状态：data-theme={{ state?.mode }} · data-brand={{ state?.brand }} ·
        data-density={{ state?.density }} · data-contrast={{ state?.contrast }} · dir={{ state?.dir }}。
        品牌轴只取种子的色相与彩度，明度曲线沿用基线，所以换任何种子都不会把对比度换坏。
      </XhAlertDescription>
    </XhAlertRoot>

    <div class="panel stack" style="gap: var(--xh-space-5)">
      <div class="row" style="justify-content: space-between">
        <h3 class="title-md">预览</h3>
        <span class="mono subtle text-xs">改上面任意一个轴，这一片会当场跟着变</span>
      </div>

      <div class="row">
        <XhButton variant="solid">主要操作</XhButton>
        <XhButton variant="outline">次要操作</XhButton>
        <XhButton variant="subtle" tone="success">成功</XhButton>
        <XhButton variant="subtle" tone="danger">危险</XhButton>
        <XhButton variant="ghost" loading>载入中</XhButton>
      </div>

      <div class="row">
        <XhBadge variant="solid">solid</XhBadge>
        <XhBadge variant="subtle" tone="success">subtle</XhBadge>
        <XhBadge variant="outline" tone="warning">outline</XhBadge>
      </div>

      <div class="grid" style="--cols: 1; --cols-sm: 2">
        <XhTextFieldRoot default-value="曦寒" placeholder="请输入" clearable>
          <XhTextFieldLabel>项目名</XhTextFieldLabel>
          <XhTextFieldInput />
        </XhTextFieldRoot>

        <div class="stack" style="gap: var(--xh-space-3); justify-content: center">
          <label class="row" style="gap: var(--xh-space-2)">
            <XhSwitch v-model:checked="wifi" />
            <span class="text-sm">启用离线模式</span>
          </label>
          <label class="row" style="gap: var(--xh-space-2)">
            <XhCheckbox v-model:checked="agree" />
            <span class="text-sm">同意开源协议</span>
          </label>
        </div>
      </div>

      <XhSliderRoot v-model:value="level" :min="0" :max="100">
        <XhSliderControl>
          <XhSliderTrack>
            <XhSliderRange />
          </XhSliderTrack>
          <XhSliderThumb :index="0" />
        </XhSliderControl>
      </XhSliderRoot>

      <XhProgress :value="level[0]" />
    </div>
  </div>
</template>
