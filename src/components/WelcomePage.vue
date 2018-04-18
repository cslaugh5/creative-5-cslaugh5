<template>
  <div class="column">
    <img src="/static/images/books.png"/>
    <h1>Online Journal</h1>
    <h2>Keep record of your daily adventures.</h2>
    <form v-on:submit.prevent="register">
      <p>Create an account.</p>
      <input class="narrow" v-model="username" placeholder="User Name">
      <input class="wide" v-model="name" placeholder="First and Last Name"><br/>
      <input class="narrow" v-model="email" placeholder="Email Address">
      <input class="narrow" type="password" v-model="password" placeholder="Password">
      <button class="alternate" type="submit">Register</button>
    </form>
    <p class="error">{{registerError}}</p>
  </div>
</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register',{
   username: this.username,
         email: this.email,
         password: this.password,
   name: this.name,
       });
     }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 body {
     font-family: 'Gaegu', cursive;
     background-color: #47B29D
 }
 img {
     padding-left: 2%;
     padding-top: 2%;
     width: 100px;
 }

 h1 {
     margin-bottom: 0px;
     margin-left: 2%;
     font-family: 'Gaegu', cursive;
     color: #324D5C;
 }
 h2 {
     margin-top: 0px;
     margin-left: 2%;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
    font-family: 'Gaegu', cursive;
    color: #324D5C;
 }
 p {
    font-family: 'Gaegu', cursive;
    margin-left: 2%;
    font-size: 1.1em;
    color: #324D5C;
 }
 input {
 margin-left: 2%;
 font-size: 1em;
 font-family: 'Gaegu', cursive;
 color: #324D5C;
 margin-bottom: 2%;
 }
 .narrow {
     width: 170px;
 }
 .wide {
     width: 370px;
 }
 button {
 font-family: 'Gaegu', cursive;
 background-color: #E37B40;
 color: #324D5C
 }

 @media screen and (max-width: 750px) {
  input {
    border: 0;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .narrow {
    border: 0;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .wide {
    width: 100%;
    margin-left: 0px;
    border: 0;
  }
  
  button {
   margin-left: 5px;
  }
}


</style>