<template>
  <div id="app">
    <app-header/>
    <main>
    <router-view></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
 import AppHeader from './components/AppHeader';
 import AppFooter from './components/AppFooter.vue';
 export default {
   name: 'App',
   components: { AppHeader, AppFooter }
 }
</script>

<style>
 /* https://color.adobe.com/CS04-color-theme-1994456/?showPublished=true */
 main {
    background-color: #47B29D;
 }
 body {
     font-size: 18px;
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
 }
 button {
     color: #fff;
     min-width: 100px;
     line-height: 1em;
     border: none;
     border-radius: 5px;
     color: white;
     padding: 10px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 1.2rem;
     margin: 4px 2px;
 }
 button.primary {
     background-color: #F35537;
 }
 button.alternate {
     background-color: #77C4D3;
 }
 button:focus {
     outline: none;
 }
 button:hover {
     box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
 }
 button:active {
     transform: translateY(4px);
 }
 input {
     height: 20px;
     padding: 10px;
 }
 .flexWrapper {
     display:flex;
 }
 .flexRight {
     margin-left: auto;
 }
 .error {
     color: #F35537;
 }
 .column {
     width: 800px;
 }


 @media only screen and (min-width: 600px) {
   main {
    width: 100%;
   }
 }
</style>