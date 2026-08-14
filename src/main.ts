import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { setupTheme } from './theme'

// 只引皮肤入口：它自己第一句就是层序声明、第二句才是令牌，顺序由它保证。
// 在这之前再单独引一次 tokens.css 反而会让 xihan.tokens 抢在 xihan.reset 前面注册，把层序拧了
import '@xihan-ui/styles'
// 站点自有样式排在最后，site 层因此压得住皮肤
import './styles/site.css'

setupTheme()

createApp(App).use(router).mount('#app')
