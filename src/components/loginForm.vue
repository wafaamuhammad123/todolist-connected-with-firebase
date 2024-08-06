<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import { ref } from 'vue';

export default {
  setup() {
    const UserStore = useUserStore();
    const email = ref('');
    const password = ref('');

    function handleLogin() {
      if (email.value.trim() !== '' && password.value.trim() !== '') {
        UserStore.loginUser(email.value, password.value);
        email.value = '';
        password.value = '';
      }
    }

    return {
      handleLogin,
      email,
      password,
    };
  },
};
</script>
