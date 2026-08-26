import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { setupTheme } from './theme'

// 只引皮肤入口即可：index.css 内部已按 layers.css → tokens.css → 各皮肤的顺序引齐。
// layers.css 与 tokens.css 的第一句是同一份层序声明，谁先解析结果都一样，
// 再单独引一次 tokens.css 只是把同一份令牌表引两遍
import '@xihan-ui/styles'
// 站点自有样式排在最后，site 层因此压得住皮肤
import './styles/site.css'

setupTheme()

createApp(App).use(router).mount('#app')
