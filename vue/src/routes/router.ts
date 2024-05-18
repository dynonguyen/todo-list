import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import ComingSoon from '~/components/ComingSoon.vue'
import MainLayout from '~/components/layouts/MainLayout.vue'
import { PATH } from '~/constants/path'

// -----------------------------
const TodoList = () => import('~/features/todo-list/TodoList.vue')

// -----------------------------
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: PATH.TODO, component: TodoList },
      { path: PATH.CATEGORY, component: ComingSoon },
      { path: PATH.CALENDAR, component: ComingSoon },
      { path: PATH.FOCUS, component: ComingSoon },
      { path: '/:*', name: 'NotFound', redirect: PATH.TODO }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
