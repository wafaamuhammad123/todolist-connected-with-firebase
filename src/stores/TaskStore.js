import {
	defineStore
} from 'pinia' //to define a new store
import {
	ref
} from 'vue'
// import {
// 	collection,
// 	addDoc,
// 	getDocs,
// 	deleteDoc,
// 	doc,
// 	updateDoc
// } from 'firebase/firestore';
// import {
// 	db
// } from '@/firebase';
export const useTaskStore = defineStore( 'taskStore', () => { //fn define and returns the store

	const tasks = ref( [] )

//now i want to save the tasks in the ui after refreshing
// =>fetch tasks from firebase when comp is mounted.. then update the array
//tell him after adding data..push it to the backend
// add the fn that fetches data from firebase..then call it when comp is mounted
function fetchTasks() {
	fetch("https://todolist-2e670-default-rtdb.firebaseio.com/todolist.json")
		.then(response => response.json())
		.then(data => {
			if (data) {
				tasks.value = Object.keys(data).map(key => ({
					id: key,
					title: data[key].title,
					// completed: data[key].completed || false
				}));
			}
		})
		.catch(error => console.error(error));
}


	function addTask( task ) {
		// handles the logic of adding a task to the list of tasks
		//function that takes a task string, creates a task object with a unique id and title, and adds it to the tasks array.
		const id = Date.now()
		tasks.value.push( {
			id,
			title: task,
			// completed: false
		} )
		fetch( "https://todolist-2e670-default-rtdb.firebaseio.com/todolist.json", {
				method: 'POST',
				// headers: {
				// 	'content-Type': 'application/json'
				// },
				body: JSON.stringify( {
					id,
					title: task,
					// completed: false
					// took the obj we pushed in view..to be pushed in bkend
				} )
			} ).then( response => console.log( response ) )
			.catch( error => console.error( error ) )
			.then( data => console.log( data ) )
	}

	function clearTasks() {
		tasks.value = []
	}
// need to send delete req to firebase
	function deleteTask( taskId ) {
		tasks.value = tasks.value.filter( task => task.id !== taskId )
		fetch( "https://todolist-2e670-default-rtdb.firebaseio.com/todolist.json", {
			method: 'DELETE',
			// headers: {
			// 	'content-Type': 'application/json'
			// },
			
		} ).then(response => {
			if (!response.ok) {
				throw new Error('Failed to delete task from backend');
			}
		})
		.catch(error => console.error(error));
}
	function isCompleted( taskId ) {
		//find the task.id=>line through
		const task = tasks.value.find( task => task.id === taskId );
		if ( task ) {
			task.completed = !task.completed
		}

	}
	return {
		tasks,
		addTask,
		fetchTasks,
		clearTasks,
		deleteTask,
		isCompleted
	}


} )