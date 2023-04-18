<!-- <script setup>
import { useRateReview } from '../rate_review.js'

const { x, y } = useRateReview()
console.log("here is review and rating****")
console.log(x)
console.log(y)
</script> -->


<template>
    <div class="hello">
        <h1>Movie Rating System</h1>

        <div>
          <v-responsive
            class="mx-auto"
            max-width="344"
          >
            <v-text-field
              type="search"
              v-model="search"
              label="Search movies"
              @change="loadMovies()"

            >
              
            </v-text-field>
          </v-responsive> 



          <div class="mignon-movies">
            <v-container class="bg-surface-variant">
              <v-row no-gutters>
                <v-col
                  v-for="(movie, m) in movies"
                  :key="m"
                  cols="12"
                  sm="4"
                >
                  <v-sheet class="ma-2 pa-2">
                    


                       <v-card
                        class="mx-auto"
                        color="purple"
                        elevation="10"
                        width="360"
                      >
                        <div class="d-flex justify-between">
                          
                          <v-card-title class="flex-grow-1 flex-column align-start">
                            <div class="text-h5">
                              {{movie.Title}}
                            </div>
                            <div class="text-h6 font-weight-thin">{{movie.director}}</div>

                            <div class="text-h6 font-weight-thin">{{movie.Year}}</div>

                            <div class="text-h6 font-weight-thin">Ratings:{{movie.ratings }}</div>
                          </v-card-title>

                          <v-img
                            contain
                            height="125px"
                            :src="movie.Poster"
                            style="flex-basis: 125px"
                            class="flex-grow-0"
                          ></v-img>
                        </div>

                        <v-divider></v-divider>

                        <v-card-actions class="pa-4">
                          Rate this album

                          <v-spacer></v-spacer>

                          <span class="text-grey-lighten-2 text-caption me-2">
                            
                          </span>

                          <v-rating
                            v-model="movie.movie_rating"
                            color="white"
                            active-color="yellow-accent-4"
                            half-increments
                            hover
                            size="18"
                            @change="updateRating(movie.imdbID)"
                            ></v-rating>

                            <v-responsive
                            class="mx-auto"
                            max-width="344"
                          >
                            <v-text-field
                              label="write_review"
                              hide-details="auto"
                              v-model="movie.write_review"
                            ></v-text-field>
                            <button @click="updateRating(movie.imdbID, 'review')">
                              Write Review
                            </button>

                            <button id="composable">
                                Write composible
                            </button>
                          </v-responsive>
                        </v-card-actions>
                      </v-card>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
  
        <!-- <table>
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
                -->
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

        <!-- <p>Here is sort movie {{store_movie}}</p> -->
    </div>
</template>

<script>

import axios from 'axios'
import { useLocalStorage } from '@vueuse/core'
import { useRateReview } from '../rate_review.js'

export default {
  setup(){

    const { x, y } = useRateReview()

    //don't touch it
    const store = useLocalStorage('movie',
      {rating: []}
    )
    return {store, x, y}
  },
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
      }, 2000)
    },

    single_movie(movie, index) {

      let _this = this
      // let _rating = 0;

      axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=8e76539a`)
      .then((response) => {
        _this.movies[index]['genre'] = response.data.Genre
        _this.movies[index]['director'] = response.data.Director
        _this.movies[index]['poster'] = response.data.Poster
        _this.movies[index]['imdbID'] = response.data.imdbID
        _this.movies[index]['all_ratings'] = response.data.Ratings
        _this.movies[index]['movie_rating'] = null;
        _this.movies[index]['write_review'] = null;

        let load_rating_movie = this.store.rating.filter((_rate) => {
          return _rate.imdbID.movie_id == _this.movies[index].imdbID
        })

        load_rating_movie = JSON.parse(JSON.stringify(load_rating_movie))

        // console.log(load_rating_movie)
        if(load_rating_movie.length > 0 ) {
          this.store.rating.forEach((_rating, _index) => {
          
            // if(this.store.rating[_index].imdbID.id == _this.movies[index].imdbID) {
              if(this.store.rating[_index].imdbID.id == load_rating_movie[0].imdbID.movie_id) {
                console.log("Inside***")
                console.log(load_rating_movie[0].imdbID.rating)

              // _this.movies[index]['movie_rating'] = this.store.rating[index].imdbID.rating ?this.store.rating[index].imdbID.rating : 0;

              // _this.movies[index]['write_review'] = this.store.rating[index].imdbID.review ? this.store.rating[index].imdbID.review: ''



              _this.movies[index]['movie_rating'] = load_rating_movie[0].imdbID.rating ?load_rating_movie[0].imdbID.rating : 0


              _this.movies[index]['write_review'] = load_rating_movie[0].imdbID.review ? load_rating_movie[0].imdbID.review: ''

              console.log("Here ****")
              console.log("Here is the movie")
              console.log(_this.movies[index])
            }
          })
        }
      //   this.store.rating.forEach((_rating, _index) => {
          
      //   if(this.store.rating[_index].imdbID.id == _this.movies[index].imdbID) {

      //     _this.movies[index]['movie_rating'] = this.store.rating[index].imdbID.rating ?this.store.rating[index].imdbID.rating : 0;

      //     _this.movies[index]['write_review'] = this.store.rating[index].imdbID.review ? this.store.rating[index].imdbID.review: ''
      //   }
      // })


        // _this.store.rating.push({title: _this.movies[index]['imdbID'], value: 0})
        const found = _this.store.rating.find(element => element['imdbID'].id == _this.movies[index]['imdbID']);
        if(!found) {
          _this.store.rating.push({imdbID: {id: _this.movies[index]['imdbID'], rating: 0, review: _this.movies[index]['write_review']}}) 
           
        }   
        
        // _this.store.rating['imdbID'] = {id: _this.movies[index]['imdbID'], rating: 0}

        // _this.store.rating['imdbID']['rating'] = 0

        // if(response.data.Ratings) {
        //   response.data.Ratings.forEach((rating) => {

        //     let __rating = Number(rating.Value.split("/")[0].replace('%', ''))
        //     if(__rating > 10) {
        //       _rating+=Number(__rating)/10
        //     }else {
        //       _rating+=Number(rating.Value.split("/")[0])
        //     }

        //     _this.movies[index]['ratings'] = (_rating/(response.data.Ratings.length)).toFixed(2)

        //     _this.rating.push((_rating/(response.data.Ratings.length)).toFixed(2))  

        //   })  
        // }
       
        this.setRatings(response.data.Ratings, index)
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
    },

    setRatings(ratings, index, values = '') {

      let _rating = 0;

      let _movie_rating = !values ? this.movies[index] : values[0]
      if(ratings.length > 0) {
          let __ratings__ = ratings.map((rating) => {

            

            let __rating = Number(rating.Value.split("/")[0].replace('%', ''))
            if(__rating > 10) {
              _rating+=Number(__rating)/10
            }else {
              _rating+=Number(rating.Value.split("/")[0])
            }
            return _rating
            // if(!values) {
            //   this.movies[index]['ratings'] = (_rating/(ratings.length)).toFixed(2)
            // }
            // else {
            //   values[0].ratings = (_rating/(ratings.length)).toFixed(2)
            // }

            // _rating+=(_movie_rating.movie_rating*2)

            // let avg_rating = _movie_rating.movie_rating  > 0 ? (_rating/(ratings.length+1)) : (_rating/(ratings.length)) 

            // console.log("here is rating")
            // console.log(_rating)
            // // _rating+=_movie_rating.movie_rating > 0 ? _movie_rating.movie_rating : 0;
            // let avg_rating = _movie_rating.movie_rating  > 0 ? (_rating/(ratings.length+1)) : (_rating/(ratings.length)) 
            

            // // _movie_rating['ratings'] = (_rating/(ratings.length)).toFixed(2)
            // console.log("here is avg ratings****")
            // console.log(avg_rating)
            // //convert avg ratings to be on scale of 5
            // _movie_rating['ratings'] = (avg_rating).toFixed(2)
            // this.rating.push(_movie_rating)

            // this.rating.push((_rating/(ratings.length)).toFixed(2))  
            

          })

          let total_ratings = __ratings__.length
          //add user rating to it

          __ratings__ = __ratings__[total_ratings-1]

          total_ratings += _movie_rating.movie_rating > 0 ? 1 : 0
          __ratings__+= _movie_rating.movie_rating > 0 ? _movie_rating.movie_rating*2 : _movie_rating.movie_rating 

          console.log(_movie_rating)
          console.log(__ratings__)
          let avg_rating = (__ratings__)/total_ratings.toFixed(2)

          _movie_rating['ratings'] = avg_rating/2
          // this.rating.push(_movie_rating)
          
      }else {
        _movie_rating['ratings'] = _movie_rating.movie_rating
      }
    },

    updateRating(id, action="rating"){
      
      let _movie = this.movies.filter((movie) => {
        return movie.imdbID == id;
      })

      _movie = JSON.stringify(_movie)

      if(_movie) { 
        _movie = JSON.parse(_movie)
        if(action ==='rating') {
          if(_movie[0].all_ratings) {
            this.setRatings(_movie[0].all_ratings,'', _movie)
          }  
        }
        
        
      }

      this.store.rating.forEach((_rating, index) => {
        if(this.store.rating[index].imdbID.id == id) {
          // this.store.rating[index].imdbID.rating = this.movie_rating
          this.store.rating[index].imdbID.rating = _movie[0].movie_rating
          this.store.rating[index].imdbID.review = _movie[0].write_review
          this.store.rating[index].imdbID.movie_id = _movie[0].imdbID
          // this.movie_rating = this.store.rating[index].imdbID.rating 
        }
      })

      // let _movie = this.movies.filter((movie) => {
      //   return movie.imdbID == id;
      // })

      
    },


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
