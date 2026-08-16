import type { Directive } from 'vue'
import { createMotionPlayer } from '@xihan-ui/animations'

// 元素进视口一次就标 data-revealed，进场动画由播放器出。
// 用一个共享的 observer：每个元素各建一个的话，长页面上会有几十个观察者同时跑。
let observer: IntersectionObserver | null = null

// 播放器也共享一份：预设表与减弱动效的判定都收在它里面
const player = createMotionPlayer()

/** 先落终态再播，播不成也已经是可见的。 */
function reveal(el: HTMLElement): void {
  el.dataset.revealed = 'true'
  void player.play(el, 'fade-up', { duration: 620 })
}

function ensureObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined')
    return null
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting)
          continue
        const el = entry.target as HTMLElement
        observer?.unobserve(el)
        const delay = Number(el.dataset.revealDelay ?? 0)
        if (delay > 0)
          setTimeout(() => reveal(el), delay)
        else
          reveal(el)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  return observer
}

/**
 * `v-reveal` —— 滚动进视口时播一次进场，传毫秒数可错开起播。
 *
 * 动效由 @xihan-ui/animations 的播放器出，减弱动效的降级归它统一兜住。
 * 观察不了（如无 IntersectionObserver）就直接显示，绝不留白。
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (typeof binding.value === 'number' && binding.value > 0)
      el.dataset.revealDelay = String(binding.value)

    const io = ensureObserver()
    if (io === null) {
      el.dataset.revealed = 'true'
      return
    }
    io.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
    player.cancel(el)
  },
}
