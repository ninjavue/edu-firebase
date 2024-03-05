import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/LoginView.vue')
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import(/* webpackChunkName: "sign-up" */ '../views/auth/RegisterView.vue')
  },
  {
    path: '/',
    name: '',
    component: () => import(/* webpackChunkName: " " */ '../views/client/ClientView.vue'),
    children: [
      {
        path: 'home',
        name: '',
        component: () => import(/* webpackChunkName: "home" */ '../views/client/HomeView.vue')
      },
      {
        path: 'courses',
        name: 'courses',
        component: () => import(/* webpackChunkName: "courses" */ '../views/client/CoursesView.vue')
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import(/* webpackChunkName: "projects" */ '../views/client/ProjectsView.vue')
      },
      {
        path: 'source-code',
        name: 'source-code',
        component: () => import(/* webpackChunkName: "source-code" */ '../views/client/SourceCode.vue')
      },
    ]
  },
  // Admen panel router
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/AdminView.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import(/* webpackChunkName: "home" */ '../views/admin/HomeView.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import(/* webpackChunkName: "users" */ '../views/admin/UsersList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
