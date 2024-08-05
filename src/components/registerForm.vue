<template>
	<div>
		<form @submit.prevent=" handleSubmit ">
			<input v-model=" name " type="text" placeholder="Name" required>
			<input v-model=" email " type="email" placeholder="Email" required>
            <input v-model=" password " type="password" placeholder="password" required>
			<button type="submit">Register</button>
			<p>have an account</p>
			<button>login</button>
		</form>
	</div>
</template>

<script>

import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue' 
export default{
	setup () {
		const UserStore = useUserStore() //initializes the task store.
		const name = ref( '' ) //  Creates a reactive reference for the new task input.
		const email=ref('')
        const password   =ref('')
		// fn add users
		function handleSubmit () {
			if ( name.value.trim() !== '' && email.value.trim()!=='' && password.value.trim()!=='') {
				// userStore.addUser( { name: name.value, email: email.value }, 56, 447 ) =>in this case..if in the store i used  
				// function addUser ( user, ...otherval ) =>this means im taking other values 56,447 into another array by using ... 
				// and if i put the numbers inside the object of name,email..the ...=>means im gonna put them in the same object of the name,email
				UserStore.addUser( { name: name.value, email: email.value })
				name.value = '' //reset the input
				email.value=''
                password.value=''
			}
		}
		return {
			handleSubmit,name,email,password
		}
	}

}
</script>