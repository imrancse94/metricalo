import { createRouter, createWebHistory } from 'vue-router'
import PostList from '@/views/PostList.vue'

const routes = [
  {
    path: '/',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/post/:id',
    name: 'postDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/PostDetail.vue')
  },
  {
    path: '/post/add',
    name: 'AddPost',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AddPost.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
