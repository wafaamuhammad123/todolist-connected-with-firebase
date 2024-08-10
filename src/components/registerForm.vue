<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="name" type="text" placeholder="Name" required>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/UserStore';
import { ref } from 'vue';

export default {
  setup() {
    const UserStore = useUserStore();
    const name = ref('');
    const email = ref('');
    const password = ref('');

    function handleSubmit() {
      if (name.value.trim() !== '' && email.value.trim() !== '' && password.value.trim() !== '') {
        UserStore.addUser({ name: name.value, email: email.value, password: password.value });
        name.value = '';
        email.value = '';
        password.value = '';
      }
    }

    return {
      handleSubmit,
      name,
      email,
      password,
    };
  },
};
</script>