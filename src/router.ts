import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./pages/HomePage.vue'), meta: { title: '曦寒 · 企业级 .NET + Vue 开源底座' } },
    { path: '/framework', name: 'framework', component: () => import('./pages/FrameworkPage.vue'), meta: { title: 'XiHan.Framework · 曦寒' } },
    { path: '/ui', name: 'ui', component: () => import('./pages/UiPage.vue'), meta: { title: 'XiHan.UI · 曦寒' } },
    { path: '/basicapp', name: 'basicapp', component: () => import('./pages/BasicAppPage.vue'), meta: { title: 'XiHan.BasicApp · 曦寒' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition)
      return savedPosition
    if (to.hash)
      return { el: to.hash, top: 80 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta.title
  if (typeof title === 'string')
    document.title = title
})
