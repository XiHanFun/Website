// 主题运行时：五个轴（色彩模式 / 品牌 / 密度 / 对比度 / 书写方向）写到 <html> 上，
// 皮肤按属性选择器命中。整站共用这一个控制器，实验室里的主题台改的也是它。
import type { ThemeController, ThemePreference, ThemeState } from '@xihan-ui/tokens/runtime'
import { createThemeController } from '@xihan-ui/tokens/runtime'
import { readonly, shallowRef } from 'vue'

const STORAGE_KEY = 'xihanfun-site-theme'

let controller: ThemeController | null = null

/** 已定型的五维状态，'system' 在这里已经解析成 light 或 dark。 */
const state = shallowRef<ThemeState | null>(null)
/**
 * 用户提交的意图，'system' 原样保留。
 *
 * 必须自己存一份而不是每次现读 controller.getPreference()：那个方法不是响应式源，
 * 包在 computed 里也不会有依赖，算过一次就永久缓存，分段控件会一直钉在首帧那个值上。
 */
const preference = shallowRef<Readonly<ThemePreference>>({})

function requireController(): ThemeController {
  if (controller === null)
    throw new Error('主题控制器还没建；setupTheme 必须先于任何组件调用')
  return controller
}

/** 快照当前的意图与定型状态。写路径与环境变化两条路都要走它。 */
function sync(): void {
  const c = requireController()
  preference.value = { ...c.getPreference() }
  state.value = c.getState()
}

function hasStoredPreference(): boolean {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) !== null
  }
  catch {
    // 隐私模式下读 localStorage 会抛，当作没存过
    return false
  }
}

/** 建控制器并把状态接进响应式。在 createApp 之前调用一次。 */
export function setupTheme(): ThemeController {
  // 控制器里是 {...已存偏好, ...initial}，initial 恒压过存档。
  // 所以站点默认的深色只在用户还没选过时才塞进去，否则每次刷新都会把用户的选择顶掉
  controller = createThemeController({
    storageKey: STORAGE_KEY,
    initial: hasStoredPreference() ? undefined : { mode: 'dark' },
  })
  sync()
  // 只在定型状态变了才回调（比如系统色彩模式翻面）；意图变化由 setThemePreference 自己同步
  controller.subscribe(() => sync())
  return controller
}

/** 改主题的唯一入口：写完当场把意图与状态同步回响应式。 */
export function setThemePreference(patch: ThemePreference): void {
  requireController().setPreference(patch)
  sync()
}

export function useTheme(): {
  state: Readonly<typeof state>
  preference: Readonly<typeof preference>
  setPreference: typeof setThemePreference
} {
  return {
    state: readonly(state) as Readonly<typeof state>,
    preference: readonly(preference) as Readonly<typeof preference>,
    setPreference: setThemePreference,
  }
}
