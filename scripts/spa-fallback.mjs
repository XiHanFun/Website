// GitHub Pages 只认静态文件，直接访问 /framework 这样的深链接会落到 404。
// 把构建产物的 index.html 复制一份成 404.html，Pages 拿它兜底，路由再由前端接管。
import { copyFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = join(dirname(dirname(fileURLToPath(import.meta.url))), 'dist')

await copyFile(join(dist, 'index.html'), join(dist, '404.html'))
console.log('[spa-fallback] dist/404.html 已生成')
