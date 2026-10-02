<script setup lang="ts">
import { XhButton } from '@xihan-ui/vue'
import { useRouter } from 'vue-router'

// 链接形态的按钮：外观交给 XhButton，渲染成 <a>。
// 站内路由走 to，点击交给路由器；外链走 href，新窗口打开。
const props = withDefaults(defineProps<{
  to?: string
  href?: string
  variant?: 'solid' | 'outline' | 'subtle' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'solid',
  size: 'md',
})

const router = useRouter()

function onClick(event: MouseEvent): void {
  if (props.to === undefined)
    return
  // 新标签、新窗口这些修饰键交还给浏览器
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return
  event.preventDefault()
  void router.push(props.to)
}
</script>

<template>
  <XhButton
    as="a"
    :href="to ?? href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    :variant="variant"
    :size="size"
    @click="onClick"
  >
    <slot />
  </XhButton>
</template>
