import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTaskStore } from '@/stores/TaskStore';
export const useUserStore = defineStore('userStore', () => {
  const users = ref([]);
  const currentUser = ref(null);
  const router = useRouter();
  const taskStore = useTaskStore();

  function addUser(user) {
    const id = Date.now();
    users.value.push({ id, ...user });

    fetch('https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
      method: 'POST',
      body: JSON.stringify({ id, ...user }),
    })
      .then(response => response.json())
      .then(data => console.log('User added:', data))
      .catch(error => console.error('Add user error:', error));
  }
  function loginUser(email, password) {
    console.log('Attempting to log in with:', { email, password });
  
    fetch('https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched users data:', data);
  
        const usersArray = Object.entries(data).map(([id, user]) => ({ id, ...user }));
  
        console.log('Converted users array:', usersArray);
  
        const user = usersArray.find(user => user.email === email && user.password === password);
        if (user) {
          currentUser.value = user;
          taskStore.setCurrentuser(user.id); // Set the current user in task store
          router.push('/todolist');  // Navigate to the TodoList page
          console.log('User logged in:', user);
        } else {
          console.error('Invalid credentials');
        }
      })
      .catch(error => console.error('Login error:', error));
  }
  

  return {
    addUser,
    users,
    loginUser,
    currentUser,

  };
});