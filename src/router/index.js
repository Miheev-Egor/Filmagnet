import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../stores/views/MainPage.vue'
import searchmovie from "@/stores/views/searchmovie.vue"
import films from "@/stores/views/films.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/search',
      name: 'searchmovie',
      component: searchmovie
    },
    {
      path: '/films',
      name: 'films',
      component: films,
    },
  ],
})

export default router
