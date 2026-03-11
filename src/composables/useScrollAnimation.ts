import { onMounted, onUnmounted, ref, watch } from 'vue'

export function useScrollAnimation(threshold = 0.15) {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  let obs: IntersectionObserver | null = null

  function observe() {
    if (!el.value || obs) return
    obs = new IntersectionObserver(
      ([e]) => {
        visible.value = e.isIntersecting
      },
      { threshold }
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
