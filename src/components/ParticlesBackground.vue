<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
const particles: { x: number; y: number; z: number; vx: number; vy: number; size: number; alpha: number }[] = []
let animId = 0

function init() {
  particles.length = 0
  const count = 80
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: (Math.random() - 0.5) * 0.0002,
      size: 1 + Math.random() * 2,
      alpha: 0.3 + Math.random() * 0.5,
    })
  }
}

function draw() {
  if (!canvas.value) return
  const c = canvas.value
  const ctx = c.getContext('2d')
  if (!ctx) return

  const w = c.width
  const h = c.height
  ctx.clearRect(0, 0, w, h)

  particles.forEach((p) => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < -1.2 || p.x > 1.2) p.vx *= -1
    if (p.y < -1.2 || p.y > 1.2) p.vy *= -1

    const sx = (p.x * 0.5 + 0.5) * w
    const sy = (p.y * 0.5 + 0.5) * h
    const scale = 0.5 + p.z * 0.5
    const r = p.size * scale

    const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 4)
    gradient.addColorStop(0, `rgba(139, 92, 246, ${p.alpha})`)
    gradient.addColorStop(0.3, `rgba(34, 211, 238, ${p.alpha * 0.5})`)
    gradient.addColorStop(1, 'transparent')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(sx, sy, r * 4, 0, Math.PI * 2)
    ctx.fill()
  })

  animId = requestAnimationFrame(draw)
}

function resize() {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

onMounted(() => {
  if (!canvas.value) return
  resize()
  window.addEventListener('resize', resize)
  init()
  draw()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animId)
})
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>
