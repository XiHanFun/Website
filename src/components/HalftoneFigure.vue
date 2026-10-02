<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useTheme } from '../theme'

// 首屏点阵：按灰度源图逐格取样，亮度即墨量，墨量决定圆点半径。
// 整块画布另铺一层极淡的环境点，人像从点阵里显出来。
// 首次显影自上而下扫一遍；之后只在尺寸或主题变化时静态重画，没有常驻动画。
const props = withDefaults(defineProps<{
  src?: string
  /** 点距（CSS 像素） */
  step?: number
}>(), {
  src: '/assets/figure.jpg',
  step: 6,
})

const canvas = ref<HTMLCanvasElement | null>(null)
const { state } = useTheme()

let samples: ImageData | null = null
let observer: ResizeObserver | null = null
let frame = 0
let revealed = false

async function loadSamples(): Promise<void> {
  const img = new Image()
  img.decoding = 'async'
  img.src = props.src
  await img.decode()
  const off = document.createElement('canvas')
  off.width = img.naturalWidth
  off.height = img.naturalHeight
  const ctx = off.getContext('2d', { willReadFrequently: true })
  if (ctx === null)
    return
  ctx.drawImage(img, 0, 0)
  samples = ctx.getImageData(0, 0, off.width, off.height)
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || document.documentElement.dataset.motion === 'reduce'
}

/** progress 为显影进度 0..1；扫描线以上的点画全，扫描线附近渐出。 */
function paint(progress: number): void {
  const el = canvas.value
  if (el === null || samples === null)
    return
  const width = el.clientWidth
  const height = el.clientHeight
  if (width === 0 || height === 0)
    return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  if (el.width !== Math.round(width * dpr) || el.height !== Math.round(height * dpr)) {
    el.width = Math.round(width * dpr)
    el.height = Math.round(height * dpr)
  }
  const ctx = el.getContext('2d')
  if (ctx === null)
    return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = getComputedStyle(el).color

  const { width: sw, height: sh, data } = samples
  // 人像按高度贴底放置，水平略偏右，给左上角的图编号留白
  const scale = Math.min((width * 0.92) / sw, (height * 0.96) / sh)
  const fw = sw * scale
  const fh = sh * scale
  const ox = (width - fw) / 2 + width * 0.06
  const oy = height - fh

  const step = props.step
  const rMax = step * 0.48
  const scanY = progress * (height + step * 12)
  const TAU = Math.PI * 2

  for (let y = step / 2; y < height; y += step) {
    const reveal = Math.min(1, Math.max(0, (scanY - y) / (step * 12)))
    if (reveal <= 0)
      break
    for (let x = step / 2; x < width; x += step) {
      let ink = 0
      const fx = x - ox
      const fy = y - oy
      if (fx >= 0 && fy >= 0 && fx < fw && fy < fh) {
        const sx = Math.min(sw - 1, Math.floor(fx / scale))
        const sy = Math.min(sh - 1, Math.floor(fy / scale))
        ink = data[(sy * sw + sx) * 4]! / 255
      }
      if (ink > 0.06) {
        // 光从左上打来：越靠右下越暗；源图里发髻偏暗、衣摆偏亮，一并带进明暗
        const light = 1 - 0.55 * ((fx / fw) * 0.45 + (fy / fh) * 0.55)
        const tone = Math.min(1, Math.max(0, (ink - 0.55) / 0.45))
        const shade = light * (0.5 + 0.5 * tone)
        // 下摆淡出到地面
        const fade = Math.min(1, (fh - fy) / (fh * 0.22))
        const r = rMax * (0.12 + 0.88 * shade ** 1.3) * fade * reveal
        if (r < 0.35)
          continue
        ctx.globalAlpha = (0.25 + 0.75 * shade) * fade
        ctx.beginPath()
        ctx.arc(x, y, r, 0, TAU)
        ctx.fill()
      }
      else {
        ctx.globalAlpha = 0.16 * reveal
        ctx.fillRect(x - 0.5, y - 0.5, 1, 1)
      }
    }
  }
  ctx.globalAlpha = 1
}

function schedule(): void {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => paint(1))
}

function playReveal(): void {
  if (prefersReducedMotion()) {
    paint(1)
    revealed = true
    return
  }
  const duration = 1200
  const start = performance.now()
  const tick = (now: number): void => {
    const t = Math.min(1, (now - start) / duration)
    // ease-out-quart
    paint(1 - (1 - t) ** 4)
    if (t < 1)
      frame = requestAnimationFrame(tick)
    else
      revealed = true
  }
  frame = requestAnimationFrame(tick)
}

onMounted(async () => {
  try {
    await loadSamples()
  }
  catch {
    // 源图取不到就只留网格底，不影响首屏文字
    return
  }
  playReveal()
  observer = new ResizeObserver(() => {
    if (revealed)
      schedule()
  })
  if (canvas.value !== null)
    observer.observe(canvas.value)
})

watch(() => state.value?.mode, () => {
  if (revealed)
    schedule()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <canvas ref="canvas" class="halftone" aria-hidden="true" />
</template>

