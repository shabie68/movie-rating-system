<template>
    <div class="hello">
        <h1>Movie Rating System</h1>
  
        <table>
            <caption>All Movies</caption>
            <tr>
                <th>Title</th>
                <th>Release Year</th>
            </tr>
              
            <tr v-for="(movie, m) in movies" :key="m">
                <td>{{movie.Title}}</td>
                <td>{{movie.Year}}</td>
            </tr>
        </table>

        
        <div>
            <p><input type="search" name="search" v-model="search"></p>   

            <table>
                <caption>All Movies</caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Release Year</th>
                    </tr>    
                </thead>
                
                  
                <tr v-for="(fmovie, fm) in filterMovies" :key="fm">
                    <td>{{fmovie.Title}}</td>
                    <td>{{fmovie.Year}}</td>
                </tr>
            </table> 
        </div>
        
    </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
  },

  data() {
	return {
		movies: null,
		search: 0
	}
  },

  mounted(){
    this.loadMovies()
  },

  methods:{
	loadMovies() {
		var _this = this
		axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=8e76539a&s=active')
		.then(function(response) {_this.movies = response.data.Search;console.log(_this.movies);})	

    }
  },

  computed: {
    filterMovies() {

        if(this.movies) {
            return this.movies.filter(movie => {
                // return true if the movies should be visible
                

                return movie.Title.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
          });
        }else {
            return 'testing'
        }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

p {
    text-align: start;
}

html {
  font-family: sans-serif;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(200,200,200);
  letter-spacing: 1px;
  font-size: 0.8rem;
}

td, th {
  border: 1px solid rgb(190,190,190);
  padding: 10px 20px;
}

th {
  background-color: rgb(235,235,235);
}

td {
  text-align: center;
}

tr:nth-child(even) td {
  background-color: rgb(250,250,250);
}

tr:nth-child(odd) td {
  background-color: rgb(245,245,245);
}

caption {
  padding: 10px;
}



</style>
