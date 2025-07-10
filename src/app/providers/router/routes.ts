import type { RouteRecordRaw } from 'vue-router'
import { DefaultLayout } from '@/app/layouts'

export const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/users',
  },
  {
    path: '/users',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/users/list'),
        name: 'UserListPage',
      },
      {
        path: 'create',
        component: () => import('@/pages/users/create'),
        name: 'UserCreatePage',
      },
      {
        path: ':id/edit',
        component: () => import('@/pages/users/edit'),
        name: 'UserEditPage',
      },
      {
        path: ':id',
        component: () => import('@/pages/users/profile'),
        name: 'UserProfilePage',
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/not-found'),
    name: 'NotFoundPage',
  },
] as const
