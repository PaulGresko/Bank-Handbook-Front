import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import HandbookView from "@/handbook/handbookView.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/handbook/:id',
    name: 'Handbook',
    props: true,
    component: HandbookView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router