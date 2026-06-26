import { onMounted, onUnmounted, ref, watch } from 'vue'

/**
 * 进入视口即揭示一次（latch），向上滚动不回退。
 * 返回 el（挂到目标元素）与 visible（用于切换 reveal-init / reveal-in）。
 */
export function useScrollAnimation(threshold = 0.12) {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  let obs: IntersectionObserver | null = null

  function observe() {
    if (!el.value || obs) return
    obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.value = true
          obs?.disconnect()
          obs = null
        }
      },
      { threshold },
    )
    obs.observe(el.value)
  }

  watch(el, (val) => {
    if (val) observe()
  })

  onMounted(() => {
    if (el.value) observe()
  })

  onUnmounted(() => {
    obs?.disconnect()
  })

  return { el, visible }
}
