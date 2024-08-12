<template>
	<div>
		<h2>
			Login form
		</h2>
		<form @submit.prevent=" handleLogin ">
			<input v-model=" email " type="email" placeholder="Email" required>
			<input v-model=" password " type="password" placeholder="Password" required>
			<button type="submit">Login</button>
		</form>
	</div>
</template>

<script>
import { useuserStore } from '@/stores/userStore'
import { ref } from 'vue'
// import { useTaskStore } from '../../../pinia/src/stores/TaskStore'
export default {
	setup () {
		const userStore = useuserStore()
		// const taskStore=useTaskStore()
		const email = ref( '' )
		const password = ref( '' )

		function handleLogin() {
  if (email.value.trim() === '' || password.value.trim() === '') {
    alert('Both email and password are required.');
    return;
  }

  console.log("Attempting to log in with:", { email: email.value, password: password.value });

  try {
    userStore.loginUser(email.value, password.value);
    email.value = '';
    password.value = '';
  } catch (error) {
    console.error('Error during login:', error);
    alert('Login failed. Please check your credentials.');
  }
}


		return {
			handleLogin,
			email,
			password,
		}
	},
}
</script>