import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/views/Home.vue'
// import About from '@/views/About.vue'
// import registerForm from '@/components/registerForm.vue'
// import loginForm from '@/components/loginForm.vue'

const routes = [
  // { path: '/', component: Home },
  // { path: '/about', component: About },
  // { path: '/register', component: registerForm },
  // { path: '/login', component: loginForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
