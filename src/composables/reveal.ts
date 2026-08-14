import type { Directive } from 'vue'

// 元素进视口一次就标 data-revealed，样式那边接的是这个属性。
// 用一个共享的 observer：每个元素各建一个的话，长页面上会有几十个观察者同时跑。
let observer: IntersectionObserver | null = null

function ensureObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined')
    return null
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting)
          continue
        ;(entry.target as HTMLElement).dataset.revealed = 'true'
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return observer
}

/** `v-reveal` —— 滚动进视口时渐显。观察不了（如无 IntersectionObserver）就直接显示，绝不留白。 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (typeof binding.value === 'number')
      el.style.transitionDelay = `${binding.value}ms`

    const io = ensureObserver()
    if (io === null) {
      el.dataset.revealed = 'true'
      return
    }
    io.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}
