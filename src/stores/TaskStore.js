import {
	defineStore
} from 'pinia' //to define a new store
import {
	ref
} from 'vue'
// import { useuserStore } from './userStore'
export const useTaskStore = defineStore( 'taskStore', () => { //fn define and returns the store

	const tasks = ref( [] )
	// wanna hold the current user to fetch his tasks
	const currentUserId = ref( null )

	function setCurrentuserId( userId ) {
		console.log( "userrr", userId );
		currentUserId.value = userId
		// console.log( " user used todo", userId );
		fetchTasks()

	}
	//now i want to save the tasks in the ui after refreshing
	// =>fetch tasks from firebase when comp is mounted.. then update the array
	//tell him after adding data..push it to the backend
	// add the fn that fetches data from firebase..then call it when comp is mounted
	function fetchTasks() {
		if ( !currentUserId.value ) {

			console.log( "no current user" );
		} else {
			fetch( "https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json" )
				.then( response => response.json() )
				.then( data => {
					if ( data ) {
						// 
						tasks.value = Object.keys( data )
							//need filter to login and see his own tasks
							.filter( key => data[ key ].userId === currentUserId.value ) //based 3l id
							// .filter( task => task.userId === currentUserId.value ) //based 3l id
							.map( key => ( { //map aligns with how l data structured in firebase
								//=> returns an array of the keys in the data object. Each key represents an task's  ID * firebase
								// w h map 3la each key and creates a new object l kol task
								//obj.val=> extracts the values from the data object returned from Firebase, which are the individual user entries.
								//map.entry=>processes each entry to extract the nested user object, resulting in an array of user objects.

								id: key,
								title: data[ key ].title,
								// userId :data[key].userId
								userId: currentUserId.value
							} ) );
					}
				} )
				.catch( error => console.error( error ) );
		}
	}



	function addTask( task ) {
		if ( !currentUserId.value ) {
			console.log( "no current user" );
		} else {
			// Generate a unique ID for the task
			const id = Date.now();

			// Create a new task object 
			const newTask = {
				id,
				title: task,
				userId: currentUserId.value, //to ensure that this task is linked to logged-in user.
			
			};

			// Add the task to the local tasks array
			tasks.value.push( newTask );//added to new obj to update ui

			// Send the task to Firebase to save it in the backend
			fetch( "https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json", {
					method: 'POST',
					body: JSON.stringify( newTask )
				} )
				.then( response => console.log( response ) )
				.catch( error => console.error( error ) );
		}
	}


	function clearTasks() {
		if ( !currentUserId.value ) {
			console.log( "no current user" );
		} else {
			tasks.value = []
			fetch( "https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist.json", {
					method: 'DELETE',
					// headers: {
					// 	'content-Type': 'application/json'
					// },

				} ).then( response => {
					if ( !response.ok ) {
						throw new Error( 'Failed to delete task from backend' );
					}
				} )
				.catch( error => console.error( error ) );
		}

	}

	// need to send delete req to firebase
	function deleteTask( taskId ) {

		tasks.value = tasks.value.filter( task => task.id !== taskId ) //h remove task d with its id from the arr
		console.log( taskId );
		fetch( `https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist/${taskId}.json`, {
				method: 'DELETE',
				// headers: {
				// 	'content-Type': 'application/json'
				// },

			} ).then( response => {
				if ( !response.ok ) {
					throw new Error( 'Failed to delete task from backend' );
				}
			} )
			.catch( error => console.error( error ) );
	}

	//ana 3uza eh= >add edit fl ui..update it fl local then send http req to update in firebase
	function editTask( taskId, newTitle ) {
		if ( !currentUserId.value ) {
			console.log( "no current user" );
		} else {
			const task = tasks.value.find( task => task.id === taskId );

			if ( task ) {
				task.title = newTitle;
				console.log( newTitle );
				fetch( `https://todolist-23978-default-rtdb.asia-southeast1.firebasedatabase.app/todolist/${taskId}.json`, {
						method: 'PATCH',
						// headers: {
						// 	'Content-Type': 'application/json'
						// },
						body: JSON.stringify( {
							title: newTitle

						} )
					} )

					.then( response => console.log( response ) )
					.catch( error => console.error( error ) );
			}
		}


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
		isCompleted,
		deleteTask,
		editTask,
		setCurrentuserId
	}


} )