import { LocalStorage, SessionStorage } from 'quasar'

const isAuthenticated = async (to, from) => {
  const isAuthenticated = LocalStorage.getItem('token') || SessionStorage.getItem('token')
  if (!isAuthenticated && to.name !== 'homepage') {
    return { name: 'homepage' }
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'homepage', component: () => import('pages/IndexPage.vue') },
      { path: 'login', name: 'login', component: () => import('src/components/auth/LoginPage.vue') },
      { path: 'register', name: 'register', component: () => import('src/components/auth/RegisterPage.vue') },
      { path: 'tuto', name: 'tuto', component: () => import('src/pages/TutoPage.vue') },
      { path: 'tuto/:id', name: 'tuto-params', component: () => import('src/pages/TutoPage.vue') }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/ListLayout.vue'),
    children: [
      { path: '', name: 'dashboard', component: () => import('src/components/dashboard/DashboardPage.vue') },
      { path: '/newList', name: 'newlist', component: () => import('src/components/dashboard/NewList.vue') },
      { path: '/editList/:id', name: 'editlist', component: () => import('src/components/dashboard/EditList.vue') },
      { path: '/view/:id', name: 'viewlist', component: () => import('src/components/dashboard/ViewList.vue') },
      { path: 'newTask/:id', name: 'newtask', component: () => import('src/components/dashboard/NewTask.vue') },
      { path: '/editTask/:id', name: 'edittask', component: () => import('src/components/dashboard/EditTask.vue') }
    ],
    beforeEnter: isAuthenticated
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
