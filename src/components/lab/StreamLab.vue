<script setup lang="ts">
import type { RenderedBlock } from '@xihan-ui/markdown'
import { createStreamRenderer } from '@xihan-ui/markdown'
import { XhButton, XhCodeBlock, XhSliderControl, XhSliderLabel, XhSliderRange, XhSliderRoot, XhSliderThumb, XhSliderTrack, XhSwitch } from '@xihan-ui/vue'
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { highlighter } from '../../highlighter'

const script = `## 流式渲染是怎么回事

服务端一个 token 一个 token 地吐，渲染器每次拿到的是**截至当前的全文**，
返回一组带稳定 key 的块。生长中的那一块 key 恒为 \`live\`，定型块的 key 由下标与内容摘要拼成。

key 稳定是防整段重建的关键：

- 每帧换 key，用户每收到一个 token 就被重建一次节点
- 节点一重建，选区和滚动位置全丢
- 所以定型的块必须拿到一个此后不再变的 key

> 消毒收在解析器内部：\`html: false\` 加协议白名单，而不是渲染完再过一道清洗。

代码块还没闭合时默认不着色——半截代码的词法本来就不稳，引号和括号随时会配上，
每来一个 token 整块变一次色，看着比不着色更糟：

\`\`\`typescript
const renderer = createStreamRenderer()

// 幂等：同一份全文调多少次结果都一样
const blocks = renderer.render(fullText, { ended: false })
for (const block of blocks) {
  if (block.kind === 'code' && block.complete)
    highlight(block)
}
\`\`\`

块闭合之后再上高亮，就是上面这一段现在的样子。`

/*
 * 渲染器给的是已消毒的 HTML；代码块那一种是 <pre><code>转义过的正文</code></pre>。
 * 代码块要交给 XhCodeBlock 着色，就得把正文取回原样——转义只动了四个字符，
 * 逆变换是确定的（& 必须最后一个换回来，否则 &amp;lt; 会被多解一层）。
 */
const CODE_BLOCK = /^<pre><code(?: class="language-[^"]*")?>([\s\S]*)\n<\/code><\/pre>$/

function rawCodeOf(block: RenderedBlock): string {
  const body = CODE_BLOCK.exec(block.html)?.[1]
  if (body === undefined)
    return ''
  return body
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
}

const renderer = createStreamRenderer()
const blocks = shallowRef<readonly RenderedBlock[]>([])
const cursor = ref(0)
const speed = ref([28])
const running = ref(false)
const highlightWhileStreaming = ref(false)

let timer: number | null = null

function stop(): void {
  if (timer !== null) {
    clearInterval(timer)
    timer = null
  }
  running.value = false
}

function tick(): void {
  // 一次推进若干字符，否则慢到看不出这是流式
  cursor.value = Math.min(script.length, cursor.value + 3)
  const ended = cursor.value >= script.length
  blocks.value = renderer.render(script.slice(0, cursor.value), { ended })
  if (ended)
    stop()
}

function start(): void {
  stop()
  cursor.value = 0
  blocks.value = []
  running.value = true
  timer = window.setInterval(tick, Math.max(8, 120 - (speed.value[0] ?? 28)))
}

function showAll(): void {
  stop()
  cursor.value = script.length
  blocks.value = renderer.render(script, { ended: true })
}

onBeforeUnmount(() => {
  stop()
  renderer.dispose()
})

showAll()
</script>

<template>
  <div class="stack stack--lg">
    <div class="lab-controls">
      <div class="lab-field">
        <span class="lab-field__label">
          进度
          <span class="lab-field__value">{{ cursor }} / {{ script.length }} 字符</span>
        </span>
        <div class="row">
          <XhButton variant="solid" size="sm" :loading="running" @click="start">重放一遍</XhButton>
          <XhButton variant="outline" size="sm" @click="showAll">直接看全文</XhButton>
        </div>
      </div>

      <div class="lab-field">
        <XhSliderRoot v-model:value="speed" :min="4" :max="100" :step="4">
          <XhSliderLabel>吐字速度</XhSliderLabel>
          <XhSliderControl>
            <XhSliderTrack>
              <XhSliderRange />
            </XhSliderTrack>
            <XhSliderThumb :index="0" />
          </XhSliderControl>
        </XhSliderRoot>
      </div>

      <div class="lab-field">
        <span class="lab-field__label">未闭合的代码块也着色</span>
        <div class="row">
          <XhSwitch v-model:checked="highlightWhileStreaming" />
          <span class="text-sm muted">{{ highlightWhileStreaming ? '开（会看到颜色乱跳）' : '关（默认）' }}</span>
        </div>
      </div>
    </div>

    <div class="panel md-stream">
      <template v-for="block in blocks" :key="block.key">
        <XhCodeBlock
          v-if="block.kind === 'code'"
          :code="rawCodeOf(block)"
          :lang="block.lang ?? ''"
          :complete="block.complete"
          :highlighter="highlighter"
          :highlight-while-streaming="highlightWhileStreaming"
        />
        <!-- 块的 html 已在解析器内部消毒过：html: false 加协议白名单 -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-else v-html="block.html" />
      </template>
    </div>
  </div>
</template>
