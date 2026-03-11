<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animId = 0

function draw() {
  if (!canvas.value || !ctx) return
  const c = canvas.value
  const w = c.width
  const h = c.height
  ctx.clearRect(0, 0, w, h)

  const centerX = w / 2
  const centerY = h / 2
  const t = Date.now() * 0.0003

  // 透视网格线 - 紫/青霓虹
  ctx.lineWidth = 1
  const gridSpacing = 80
  const lineCount = 25

  for (let i = -lineCount; i <= lineCount; i++) {
    const offset = (t * 50 + i * 30) % 120
    const alpha = 0.03 + 0.04 * Math.sin(t + i * 0.3)
    ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
    ctx.beginPath()
    ctx.moveTo(centerX - w, centerY + i * gridSpacing - offset)
    ctx.lineTo(centerX + w * 2, centerY + i * gridSpacing - offset)
    ctx.stroke()

    ctx.strokeStyle = `rgba(168, 85, 247, ${alpha * 0.8})`
    ctx.beginPath()
    ctx.moveTo(centerX + i * gridSpacing - offset, centerY - h)
    ctx.lineTo(centerX + i * gridSpacing - offset, centerY + h * 2)
    ctx.stroke()
  }

  // 中心光晕
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, w * 0.6)
  gradient.addColorStop(0, 'rgba(34, 211, 238, 0.03)')
  gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)')
  gradient.addColorStop(1, 'transparent')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  animId = requestAnimationFrame(draw)
}

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

function cleanup() {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animId)
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  draw()
})

onUnmounted(cleanup)
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full" />
</template>
