import { createRouter, createWebHistory } from 'vue-router';
import ToDoList from '@/components/ToDoList.vue';
import registerForm from '@/components/registerForm.vue';
import loginForm from '@/components/loginForm.vue';

const routes = [
  { path: '/', redirect: '/todolist' }, // Redirect root to ToDoList
  { path: '/todolist', component: ToDoList },
  { path: '/register', component: registerForm },
  { path: '/login', component: loginForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
