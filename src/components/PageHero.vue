<script setup lang="ts">
import type { Product } from '../data/site'
import { computed } from 'vue'

// 产品页首屏：左侧图编号、产品名、定位句与说明，右侧放该产品的线描示意图
const props = defineProps<{
  product: Product
}>()

// 「XiHan」与后缀分两截，后缀着品牌色
const suffix = computed(() => props.product.title.replace(/^XiHan/, ''))
</script>

<template>
  <section class="band" style="border-block-start: 0">
    <div class="frame">
      <div class="page-hero">
        <div class="page-hero__copy">
          <p class="fig"><b>FIG.{{ product.fig }}</b> {{ product.subtitle }} · {{ product.status }}</p>
          <h1 class="page-hero__title">XiHan<span>{{ suffix }}</span></h1>
          <p class="h-item">{{ product.tagline }}</p>
          <p class="lede">{{ product.desc }}</p>
          <div class="row">
            <slot name="actions" />
          </div>
        </div>
        <div class="page-hero__art">
          <div class="diagram-frame" style="inline-size: 100%; max-inline-size: 460px">
            <slot name="art" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
