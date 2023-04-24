<template>
  <!-- <BasicApp></BasicApp> -->
  <!-- <AddSearchBar></AddSearchBar> -->
  <!-- <FilterMovies></FilterMovies> -->
  <!-- <SortMovies></SortMovies> -->
  <RateMovies></RateMovies>
  <!-- <Movies /> -->
</template>

<script>
// import Movies from './components/Movies'
// import BasicApp from './components/BasicApp'
// import AddSearchBar from './components/AddSearchBar'
// import FilterMovies from './components/FilterMovies'
// import SortMovies from './components/SortMovies'
import RateMovies from './components/RateMovies'
export default {
  name: 'App',
  components: {
    // BasicApp
    // AddSearchBar
    // FilterMovies
    // SortMovies
    RateMovies
    // Movies
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
