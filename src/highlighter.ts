// 自研的粗粒度词法着色器，整站共用一份。认不出的语言返回 null，代码块自动退回纯文本。
import { createHighlighter } from '@xihan-ui/code-highlight'

export const highlighter = createHighlighter()
