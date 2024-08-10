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
  
    fetch(`https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist/${currentuserId.value}.json`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          tasks.value = Object.keys(data).map(key => ({
            id: key,
            title: data[key].title,
          }));
        }
      })
      .catch(error => console.error(error));
  }
  
     
  
    function addTask(task) {
      if( !currentuserId){
        console.log("error");
      }
      else{
        const id = Date.now().toString();
      tasks.value.push({
        id,
        title: task,
      });
      fetch("https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json", {
        method: 'POST',
        body: JSON.stringify({
          id,
          title: task,
        })
      }).then(response => console.log(response))
        .catch(error => console.error(error));
    }
       
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