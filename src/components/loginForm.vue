<template>
	<div>
		<form @submit.prevent="handlelogin">

			<input v-model="email" type="email" placeholder="Email" required>
			<input v-model="password" type="password" placeholder="password" required>

			<button>sign in</button>
			<!-- <router-link to="/login">login</router-link> -->
            <div v-if="UserStore.currentUser">
			<p>Welcome, {{ UserStore.currentUser.name }}!</p>
		</div>
		</form>
	</div>
</template>
<script>


import { useUserStore } from '@/stores/UserStore';
import { ref, onMounted } from 'vue';
export default {
	setup() {
		const UserStore = useUserStore() //initializes the task store.
		const email = ref( '' )
		const password = ref( '' )

		function handlelogin () {
			if (  email.value.trim() !== '', password.value.trim() !== '' ) {
				// userStore.addUser( { name: name.value, email: email.value }, 56, 447 ) =>in this case..if in the store i used  
				// function addUser ( user, ...otherval ) =>this means im taking other values 56,447 into another array by using ... 
				// and if i put the numbers inside the object of name,email..the ...=>means im gonna put them in the same object of the name,email
				UserStore.loginUser( { email: email.value, password: password.value } )
				email.value = ''
				password.value = ''
			}
		}
onMounted(() => {
			UserStore.fetchUsers();
		});


		return {
			handlelogin, email, password,UserStore
		}
	},
}
</script>
