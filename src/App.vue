<template>

  <!-- <HelloWorld/> -->
  <!-- <ComposableComp /> -->
  <MovieRating />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MovieRating from './components/MovieRating.vue'
// import ComposableComp from './components/ComposableComp.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    MovieRating
    // ComposableComp
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
