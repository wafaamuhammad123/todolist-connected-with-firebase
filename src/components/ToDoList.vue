<template>
	<div class="wrapper">
		<h2>
			To do list
		</h2>

		<div class="list">
			<input type="text" v-model="newTask" placeholder="add task" class="task"
				@keyup.enter="addTask">
			<button @click=" clearTasks" class="clear">delete all</button>
		</div>

		<!-- store the list of tasks -->
		<h4 class="task2" v-for="task in taskStore.tasks" :class=" { completed: task.completed } "
			@click="Toggle( task.id )"  :key="task.id">{{task.title}}
			<button @click="deleteTask(task.id)" class="delete">delete</button>
		</h4>

		<!-- const task = tasks.value.find(t => t.id === taskId); -->
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

		return { taskStore, newTask, addTask ,clearTasks:taskStore.clearTasks, deleteTask:taskStore.deleteTask, Toggle} //to make them available in the template
	}
	// fetch ('url', {
	// 	method: 'POST',
	// })
	
}
</script>

<style scoped>
.wrapper{
			border: 1px solid black;
					width: 55%;
						margin-left: 20%;
					padding: 2%;
			
}
.completed {
	text-decoration: line-through;
}
.delete {
			padding: 2%;
				margin-left: 2%;
				font-size: 17px;
}
.task2 {
		width: 50%;
			padding: 2%;
			/* border: 1px solid #ffeded; */
			background-color: #ffce93;
			margin-left: 20%;
			color: white;
}
</style>