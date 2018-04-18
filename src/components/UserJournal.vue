<template>
  <div class="journal">
  <br>
  <h1>My Journal</h1>
    <div>
      <form v-on:submit.prevent="entry" class="entryForm">
	<textarea v-model="text" placeholder=""/><br/>
	<div class="buttonWrap">
	  <button class="primary" type="submit">Submit</button>
	</div>
      </form>
    </div>
    <div v-for="item in journal" class="item">
      <br><p class="idline"><span class="time">{{item.created | since}}</span></p>
      <p class="entry">{{item.entry}}</p><br><br>
    </div>
    <br>
  </div>
</template>

<script>
 import moment from 'moment';
 export default {
   name: 'UserJournal',
   data () {
     return {
       text: '',
       id: '',
     }
   },
   created: function() {
     this.$store.dispatch('getJournal');
   },
   filters: {
     since: function(datetime) {
       moment.locale('en', {
   relativeTime: {
     future: 'in %s',
     past: '%s',
     s:  'seconds',
     ss: '%ss',
     m:  '1m',
     mm: '%dm',
     h:  'h',
     hh: '%dh',
     d:  'd',
     dd: '%dd',
     M:  ' month',
     MM: '%dM',
     y:  'a year',
     yy: '%dY'
   }
       });
       return moment(datetime).fromNow();
     },
   },
   computed: {
     journal: function() {
       return this.$store.getters.journal;
     },
   },
   methods: {
     entry: function() {
       this.$store.dispatch('addEntry',{
         entry: this.text,
       }).then(entry => {
         this.text = "";
       });
     },
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: #324D5C;
}
body {
  font-family: 'Gaegu', cursive;
  font-size: 1.1em;
  float: center;
  margin: auto;
}
 .journal {
     font-family: 'Gaegu', cursive;
     width: 600px;
     align: center;
     float: center;
     margin: auto;

 }
 .entryForm {
     font-family: 'Gaegu', cursive;
     background: #eee;
     padding: 10px;
     margin-bottom: 10px;
     font-size: 1.5em;
     float:center;
     margin: auto;
 }
 .buttonWrap {
     width: 100%;
     display: flex;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
     font-family: 'Gaegu', cursive;
 }
 textarea {
     font-family: 'Gaegu', cursive;
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
     font-size: 1em;
     float:center;
     margin: auto;
 }
 .item {
     padding-top: 1%;
     padding-bottom: 1%;
     border-bottom: 5px solid #ddd;
     padding: 10px;
     float: center;
     margin: auto;
 }
 .entry {
     margin-top: 0px;
     float:center;
     margin: auto;
     font-size: 1.1em;
 }
 .idline {
     margin-bottom: 1%;
     font-size: 1.1em;
 }
 .user {
     font-weight: bold;
     font-family: 'Gaegu', cursive;
     margin-right: 10px;
     font-size: 1.1em;
 }
 .handle {
     margin-right: 10px;
     color: #666;
 }
 .time {
     float: right;
     color: #666;
 }

  @media screen and (max-width: 750px) {
  h1 {

  }
  input {
    border: 0;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .journal {
    border: 0;
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
  .textarea {
    width: 100%;
    margin-left: 0px;
    border: 0;
  }
  
  button {
   margin-left: 5px;
  }
}
</style>