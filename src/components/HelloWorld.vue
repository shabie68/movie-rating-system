<template>
    <div class="hello">
        <h1>Movie Rating System</h1>
  
        <table>
            <p><input type="search" name="search" v-model="search" @change="loadMovies()" placeholder="search by title"></p>
            <caption>All Movies</caption>

            <thead>
                <tr>
                  <th>Title</th>
                  <th>Release Year</th>
                  <th>Genre</th>
                  <th>Ratings</th>
                  <th>Rate movie</th>
                </tr>  
            </thead>
            
              
            <tr v-for="(movie, m) in movies" :key="m">
                <td>{{movie.Title}}</td>
                <td>{{movie.Year}}</td>
                <td>{{movie.genre}}</td>
                <td>{{movie.ratings}}</td>
                <td>
                  
                  
                </td>
            </tr>
        </table>
               
        <table>
          <p><input type="search" name="filter_movie" v-model="filter_movie" @change="filterMovies()" placeholder="search by title"></p>
            <caption>Filter Movies</caption>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release Year</th>
                </tr>    
            </thead>
            
              
            <tr v-for="(fmovie, fm) in all_filter_movies" :key="fm">
                <td>{{fmovie.Title}}</td>
                <td>{{fmovie.Year}}</td>
            </tr>
        </table> 


        <select v-model="sort_movies" @change="sortMovies()">
          <option value="rating" selected>Rating</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
        </select>

        <table>
            <caption>Filter Movies</caption>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release Year</th>
                </tr>    
            </thead>

            <tr v-for="(fmovie, fm) in all_filter_movies" :key="fm">
                <td>{{fmovie.Title}}</td>
                <td>{{fmovie.Year}}</td>
            </tr>
        </table> 
        
        <v-rating
          v-model="movie_rating"
          bg-color="orange-lighten-1"
          color="blue"
        ></v-rating>
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
    movie_rating: 3,
    search: '',
    filter_movie: '',
    all_filter_movies: [],
    sort_movies: 'rating',
    sorted_movies: [],
    years: [],
    rating: [],

	}
  },

  methods:{

  loadMovies() {

    var _this = this
    // let search_by_year = Number(this.search)
    // let url = search_by_year ? `http://www.omdbapi.com/?i=tt3896198&apikey=8e76539a&s=${_this.search}&y=${search_by_year}` : `http://www.omdbapi.com/?i=tt3896198&apikey=8e76539a&s=${_this.search}`
    let _search = _this.search.split(',')

    axios.get(`http://www.omdbapi.com/?apikey=8e76539a&s=${_search[0]}&y=${_search[1]}`)
    .then(function(response) {
      if(response.data.Response == "True") {
        _this.displayMovieList(response.data.Search);
      }
    })  

    },

    displayMovieList(movies) {
      
      this.movies = movies;
      this.movies.forEach((movie, index) => {
        let __year = movie.Year.split('–')
        __year.filter(n => n)

        this.movies[index]['Year'] = __year[1] ? __year[1] : __year[0]
        this.years.push(__year[1] ? __year[1] : __year[0])
        if(movie.Ratings) {
          this.rating.push(movie.Ratings)
        }
        this.single_movie(movie, index)
                
      })

      setTimeout(() => {
        this.sortMovies()
      }, 4000)
      
    },

    single_movie(movie, index) {

      let _this = this
      let _rating = 0;

      axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=8e76539a`)
      .then((response) => {
        _this.movies[index]['genre'] = response.data.Genre

        if(response.data.Ratings) {
          response.data.Ratings.forEach((rating) => {

            let __rating = Number(rating.Value.split("/")[0].replace('%', ''))
            if(__rating > 10) {
              _rating+=Number(__rating)/10
            }else {
              _rating+=Number(rating.Value.split("/")[0])
            }

            _this.movies[index]['ratings'] = (_rating/(response.data.Ratings.length)).toFixed(2)
            _this.rating.push((_rating/(response.data.Ratings.length)).toFixed(2))  

          })  
        }
       
        

      })
    },

    filterMovies() {
      this.movies.forEach((movie, index) => {
        if(this.movies[index]['genre'].includes(this.filter_movie)) {
          this.all_filter_movies.push(movie)
        }
      })
    },

    sortMovies() {

      if(this.sort_movies == 'rating') {
        
        this.movies.sort((a, b) => {
          if (a.ratings !== b.ratings) return a.ratings - b.ratings;
            return this.rating.indexOf(a.ratings) - this.rating.indexOf(b.ratings)
          });
      }else if(this.sort_movies == 'year') {

        this.movies.sort((a, b) => {
          if (a.Year !== b.Year) return a.Year - b.Year;
          return this.years.indexOf(a.Year) - this.years.indexOf(b.Year)
        });
      }
      else {
        this.movies.sort((a, b) => a.Title.toLowerCase() > b.Title.toLowerCase() ? 1 : -1);
      }
    }
  },
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
