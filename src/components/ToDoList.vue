<template>
  <div class="wrapper">
    <h2>To do list</h2>
    <div class="list">
		
      <input type="text" v-model="newTask" placeholder="add task" class="task" @keyup.enter="addTask">
      <button @click="clearTasks" class="clear">Delete all</button>
    </div>
    <div v-for="task in taskStore.tasks" :key="task.id" class="task-item">
		<!-- if id = id then show input so i can update the task -->
      <div v-if="editTaskId === task.id">
        <input v-model="editedTaskTitle" @keyup.enter="updateTask(task.id)">
        <button @click="cancelEdit">Cancel</button>
      </div>
      <div v-else>
		<!-- else.. h show edit btn that when click ..do start edit fn-->
        <h4 :class="{ completed: task.completed }" @click="Toggle(task.id)">{{ task.title }}</h4>
        <button class="edit" @click="startEdit(task.id, task.title)">Edit</button>
        <button @click="deleteTask(task.id)" class="delete">Delete</button>
      </div>
    </div>
  </div>
</template>
<!-- <script src="firebase.js"></script> -->
<script>
import { useTaskStore } from '@/stores/TaskStore'
import {ref,onMounted } from 'vue' 
export default {
	setup () {
		const taskStore = useTaskStore() //initializes the task store.
		const newTask = ref( '' ) //  Creates a reactive reference for the new task input.
    const editTaskId = ref(null); //Reactive reference to track the ID of the task being edite
    const editedTaskTitle = ref(''); // Reactive reference to hold the edited task's title.
		
		function addTask () {
			// handles the local logic related to the user interface, such as reading the input value and interacting with the store
			if ( newTask.value.trim() !== '') {
				taskStore.addTask( newTask.value )
		newTask.value='' //reset the input
	}

		}
		onMounted(() => {
			taskStore.fetchTasks();
		});
    
		function Toggle ( taskId ) {  

			taskStore.isCompleted( taskId )
		}
	
	

    function startEdit(taskId, title) {
      editTaskId.value = taskId;
      editedTaskTitle.value = title;
    }

    function cancelEdit() {
      editTaskId.value = null;
      editedTaskTitle.value = '';
    }

    function updateTask(taskId) {
      if (editedTaskTitle.value !== '') {
        taskStore.editTask(taskId, editedTaskTitle.value);
		// his line calls the editTask method from the taskStore, passing the taskId and the new title (editedTaskTitle.value).
		//  The editTask method in the store is responsible for finding the task with the given taskId and updating its title to the new value.
        cancelEdit();
      }
    }

		return { taskStore, newTask, addTask ,clearTasks:taskStore.clearTasks, deleteTask:taskStore.deleteTask, Toggle, startEdit,
      updateTask,
      cancelEdit,
      editTaskId,
      editedTaskTitle} //to make them available in the template
	}
	// fetch ('url', {
	// 	method: 'POST',
	// })
	
}
</script>

<style scoped>
.wrapper {
  border: 1px solid black;
  width: 55%;
  margin-left: 20%;
  padding: 2%;
}
.completed {
  text-decoration: line-through;
}
.clear {
  width: 20%;
  font-size: 17px;
  padding: 1.5%;
  background: red;
  border: none;
  color: white;
}
input {
  width: 30%;
  padding: 2%;
  font-size: 17px;
  border: 1px solid #e9e9e9;
}
.clear:hover {
  background: rgb(231, 4, 4);
}
.delete {
  padding: 2%;
  margin-left: 2%;
  font-size: 17px;
  background-color: red;
  border: none;
  border-radius: 7px;
  color: white;
  width: 23%;
}
.edit {
  padding: 2%;
  margin-left: 2%;
  font-size: 17px;
  background-color: green;
  border: none;
  border-radius: 7px;
  color: white;
  width: 23%;
}
.delete:hover {
  background: rgb(231, 4, 4);
}
.edit:hover {
  background-color: rgb(5, 107, 5);
}
.task-item {
  width: 50%;
  padding: 2%;
  border: 1px solid #ffeded;
  margin-left: 20%;
  color: black;
}
</style>