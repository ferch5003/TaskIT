<template>
  <div id="app">
    <navbar/>
  </div>
</template>

<script>
import navbar from './components/NavBar/navbar.vue';

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Archivo+Narrow');
*{
  font-family: 'Archivo Narrow', sans-serif;
  list-style: none;
}
body{
  margin: 0px;
  padding: 0px;
  height: 100%;
}
</style>
