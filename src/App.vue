<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/login"> login</router-link>
      <router-link to="/register"> register</router-link>
    </nav>
    <router-view />
    <div>
      <!-- <h2>to-do-list</h2> -->
      <!-- <ToDoList /> -->
      <!-- <register-form />
      <login-form /> -->
    </div>

  </div>
</template>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

.task {
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

<script>
// import { defineComponent } from '@vue/composition-api'
// import ToDoList from './components/ToDoList.vue'
// import registerForm from './components/registerForm.vue'
// import loginForm from './components/loginForm.vue'

export default {
  components: {
    // ToDoList
    // registerForm, loginForm
  },
  setup () {


  },
}
</script>
