import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginForm from '@/components/loginForm.vue'
import ToDoList from '@/components/ToDoList.vue'
import RegisterForm from '@/components/registerForm.vue'
import { useuserStore } from '@/stores/userStore'
// const userstore = useuserStore()
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    {
      path: '/login',
      name: 'login',
      component: loginForm
  },
      {
        path: '/todolist',
        name: 'ToDoList',
        component: ToDoList,
        meta: { requiresAuth: true }
  },
        {
          path: '/register',
          name: 'register',
          component: RegisterForm
        },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const userStore = useuserStore(); // Access the user store to check if the user is logged in
  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.currentUser) {
    // If the route requires authentication and the user is not logged in
    next('/login'); // Redirect to the login page
  } else {
    next(); // Proceed to the next route
  }
});


export default router
