<script setup lang="ts">
// 纯 CSS 冷极光 + 技术网格，替代原 canvas 粒子/网格：更轻、更克制、更贴「寒夜微光」。
</script>

<template>
  <div class="absolute inset-0 overflow-hidden">
    <!-- 冷极光：缓慢漂移的大块径向光晕 -->
    <div
      class="absolute left-1/2 -top-[20vh] h-[78vh] w-[120vw] -translate-x-1/2 rounded-full blur-[130px] opacity-60 animate-drift"
      style="background: radial-gradient(closest-side, rgb(var(--c-cyan) / 0.2), transparent 72%)"
    />
    <div
      class="absolute -left-[18vw] top-[28vh] h-[64vh] w-[68vw] rounded-full blur-[130px] opacity-50 animate-drift-2"
      style="background: radial-gradient(closest-side, rgb(var(--c-violet) / 0.18), transparent 72%)"
    />
    <div
      class="absolute bottom-[6vh] right-[-10vw] h-[56vh] w-[58vw] rounded-full blur-[130px] opacity-35 animate-drift"
      style="background: radial-gradient(closest-side, rgb(var(--c-cyan) / 0.12), transparent 72%)"
    />

    <!-- 技术网格：径向遮罩，向边缘淡出 -->
    <div
      class="absolute inset-0 grid-mask opacity-50"
      style="
        background-image:
          linear-gradient(rgb(var(--c-line) / 0.55) 1px, transparent 1px),
          linear-gradient(90deg, rgb(var(--c-line) / 0.55) 1px, transparent 1px);
        background-size: 64px 64px;
      "
    />

    <!-- 收口到底色 -->
    <div class="absolute inset-0" style="background: linear-gradient(180deg, transparent 38%, rgb(var(--c-base)) 96%)" />
  </div>
</template>
