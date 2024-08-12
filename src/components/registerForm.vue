<template>
  <div>
    <h2>Register Form</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { useuserStore } from '@/stores/userStore';
import { ref } from 'vue';

export default {
  setup() {
    const userStore = useuserStore();
    const name = ref('');
    const email = ref('');
    const password = ref('');

    async function handleSubmit() {
      if (name.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
        alert('All fields are required.');
        return;
      }

      if (password.value.length < 6) {
        alert('Password should be at least 6 characters long.');
        return;
      }

      try {
        await userStore.addUser(name.value, email.value, password.value);
        name.value = '';
        email.value = '';
        password.value = '';
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
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
