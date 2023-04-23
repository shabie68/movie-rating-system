<template>

  <!-- <HelloWorld/> -->
  <!-- <ComposableComp /> -->
  <!-- <MovieRating /> -->
  <ResponsiveMovie />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import MovieRating from './components/MovieRating.vue'
// import ComposableComp from './components/ComposableComp.vue'
import ResponsiveMovie from './components/ResponsiveSite'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // MovieRating
    // ComposableComp
    ResponsiveMovie
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
