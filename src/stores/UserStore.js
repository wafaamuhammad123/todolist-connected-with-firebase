
import {
	defineStore
} from 'pinia' //to define a new store
import {
	ref
} from 'vue'
export const useUserStore = defineStore( 'UserStore', () => { //fn define and returns the store

	const users = ref( [] ) //has users data
	const currentUser= ref(null)

	// function addUser ( user, ...otherval ) {
		function addUser( user ) {
		const id = Date.now() // date.now=> to generate unique IDs to each user
		users.value.push( {
			id,
			...user, 
		
		} )
		fetch( 'https://todolist-2e670-default-rtdb.firebaseio.com/users.json', {
			method: 'POST',
			body: JSON.stringify( {
				id,user
			})
		} ).then( response => console.log( response ) )
			.catch( error => console.error( error ) )
		.then(data=> console.log(data))
	}


    function fetchUsers(){
  fetch('https://todolist-2e670-default-rtdb.firebaseio.com/users.json')
  .then(response => response.json())
  .then(data => {
    console.log("Fetched Users:", data); // Log fetched data
    if (data) {
      users.value = Object.keys(data).map(key => ({
        id: key,
        ...data[key], //to convert the data obj to arr has list of users
      }));
    }
  })
  .catch(error => console.error("Fetch Users Error:", error)); // Log errors
    }
   

    
	function loginUser ( email, password ) {
        const user = users.value.find(user => user.email === email && user.password === password);
        // console.log(user);
    if(user){
        console.log("success");
    }
    else{
        console.log("invalid");
    }
	}
	return {
		addUser,users,loginUser,fetchUsers,currentUser
	}
})