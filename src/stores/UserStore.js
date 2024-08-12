import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile ,signInWithEmailAndPassword} from 'firebase/auth';
import router from '@/router';

export const useuserStore = defineStore('userStore', () => {
  const users = ref([]);

  async function addUser(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update display name
      await updateProfile(user, {
        displayName: name
      });
  
      console.log("User created:", user);
      router.push({ name: 'ToDoList' });
    } catch (error) {
      console.error("Error creating user:", error); // Log full error object
      alert(`Registration failed: ${error.message}`);
    }
  }
  

  async function loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user);
      router.push({ name: 'ToDoList' });
    } catch (error) {
      console.error("Login error:", error.message);
      alert('Invalid login credentials.');
    }
  }

  return {
    addUser,
    users,
    loginUser,
  };
});
