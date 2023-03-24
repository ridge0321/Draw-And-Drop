// Vue-Routerによるルータのインスタンス作成
import { createRouter, createWebHashHistory } from 'vue-router'

// 各画面のコンポーネントをimport
import top from './components/top.vue'
import createJar from './components/create-jar.vue'
import buildingJar from './components/building-jar.vue'
import result from './components/result.vue'

const routes = [
  {
    path: '/',
    name: 'top',
    component: top
  },
  {
    path: '/create-jar',
    name: 'createJar',
    component: createJar
  },
  {
    path: '/building-jar',
    name: 'buildingJar',
    component: buildingJar
  },
  {
    path: '/result',
    name: 'result',
    component: result
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router