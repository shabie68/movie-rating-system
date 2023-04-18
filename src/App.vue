<template>

  <!-- <HelloWorld/> -->
  <ComposableComp />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ComposableComp from './components/ComposableComp.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    ComposableComp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
