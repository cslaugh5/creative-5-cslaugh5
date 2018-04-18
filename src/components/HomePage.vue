<template>
  <div>
    <div v-if="loggedIn">
      <user-journal/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import UserJournal from './UserJournal';
 export default {
   name: 'HomePage',
   components: {WelcomePage,UserJournal},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
</style>