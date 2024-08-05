<template>
  <div>
    <nav>
    
    </nav>
    <router-view />
    <div>
      <!-- <h2>to-do-list</h2> -->
      <!-- <ToDoList /> -->
<registerForm/>
<loginForm/>

    </div>

  </div>
</template>

<script>
// import loginFormVue from './components/loginForm.vue'

import registerForm from './components/registerForm.vue'
import loginForm from './components/loginForm.vue'
export default {
  components: {
    // ToDoList
    registerForm,
    loginForm
  },
  setup() {
    
  
    
  },
}
</script>


<style>
#app {
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}
.task{
      padding: 17px;
        width: 40%;
        border: 1px solid lightgrey;
      
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
