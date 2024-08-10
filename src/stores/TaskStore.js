import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([]);
  const currentuserId=ref(null);

  function setCurrentuser(userId) {
    currentuserId.value = userId;
    fetchTasks(); // Fetch tasks for the new user
  }
  
  function fetchTasks() {
    if (!currentuserId.value) {
      console.log("No current user ID set.");
      return;
    }
    tasks.value = []; 
    fetch(`https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          // Filter tasks based on current user's ID
          tasks.value = Object.entries(data)
            .filter(([key, task]) => task.userId === currentuserId.value)
            .map(([key, task]) => ({
              id: key,
              title: task.title,
            }));
        }
      })
      .catch(error => console.error(error));
  }
  
  
     
  
  function addTask(taskTitle) {
    if (!currentuserId.value) {
      console.log("No current user ID set.");
      return;
    }
  
    const id = Date.now().toString();
    const newTask = {
      id,
      title: taskTitle,
      userId: currentuserId.value
    };
  
    tasks.value.push(newTask);
  
    fetch("https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json", {
      method: 'POST',
      body: JSON.stringify(newTask),
    })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }
  
    
      function clearTasks() {
        if( !currentuserId){
          console.log("error");
        }
        else{
        tasks.value = [];
        fetch("https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json", {
          method: 'DELETE',
        }).then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete tasks from backend');
          }
        })
        .catch(error => console.error(error));
      }}
    
      function deleteTask(taskId) {
        if( !currentuserId){
          console.log("error");
        }
        else{
        tasks.value = tasks.value.filter(task => task.id !== taskId);
        fetch(`https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist/${taskId}.json`, {
          method: 'DELETE',
        }).then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete task from backend');
          }
        })
        .catch(error => console.error(error));
      }
      }
      function editTask(taskId, newTitle) {
        const task = tasks.value.find(task => task.id === taskId);
        if (task) {
          task.title = newTitle;
          fetch(`https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist/${taskId}.json`, {
            method: 'PATCH',
            body: JSON.stringify({
              title: newTitle,
            })
          }).then(response => console.log(response))
            .catch(error => console.error(error));
        }
      }
    
      function isCompleted(taskId) {
        const task = tasks.value.find(task => task.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }
    
      return {
        tasks,
        addTask,
        fetchTasks,
        clearTasks,
        deleteTask,
        editTask,
        setCurrentuser,
        isCompleted
      };
    });