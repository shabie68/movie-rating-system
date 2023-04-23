<template>
    <div id="movie-site">
        <v-row id="header">
          <v-col
            cols="4"
            >
              <div>
                <h1>Mignon Technology!</h1>
                  <img src="assets/images/logo.jpg" />
              </div>
          </v-col>
          
          <v-col
            cols="4"
          >
            <v-responsive
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
          </v-col>

          <v-spacer />

          <v-col
          >
            <v-btn
              color="info"
            >
              Sign In
            </v-btn>
          </v-col>  

          <v-col

          >
            <v-btn color="info">Register</v-btn>
          </v-col>
        </v-row>

        <v-divider />
        <v-container>
          <div class="mignon-movies">

            <h2>
              All Movies
            </h2>
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
                          <div>
                            <p>
                              <v-checkbox
                                v-model="movie.list_movie"
                                label="Select"
                                @click="createCustomList(movie.imdbID)"
                                id="movie.imdbID"
                              ></v-checkbox>
                            </p>
                          </div>
                          <span>
                            Rate this album  
                          </span>
                          

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

                          </v-responsive>
                        </v-card-actions>
                      </v-card>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-container>
    </div>
</template>

<script>

import axios from 'axios'
import { useLocalStorage } from '@vueuse/core'
import { useMovieRating } from '../movie_rating.js'
import {useUpdateMovieInfo} from '../update_movie_info.js'
import {useGetMovies} from '../get_movies.js'
import {useGetRatedMovies} from '../get_rated_movies.js'
import {useTest} from '../test.js'
import {ref} from 'vue'


export default {
  setup(){

    // const { x, y } = useRateReview()
    let  test_rating = ref(0)
    let test_review = ref('')
    let test_id = ref('')
    let test = useTest(test_rating, test_review, test_id)

    const store = useLocalStorage('movie',
      {rating: []}
    )


    let test_movie = ref(null)

    let movie_information = useMovieRating(store, test_movie)

    let index = ref(0)
    let update_movie_information = useUpdateMovieInfo(store, test_movie, index)

    let get_all_movies = useGetMovies(store)
    let get_rated_movies = useGetRatedMovies(store)

    return {store, test, movie_information, update_movie_information, get_all_movies, get_rated_movies}
  },
  name: 'HelloWorld',
  props: {
  },

  created() {

    this.showCustomList()
    this.showSuggestedMovies()
  },

  data() {
	return {
		movies: null,
    movie_rating: 3,
    custom_movie_selector: '',
    t_: '',
    list_name: '',
    search: '',
    filter_movie: '',
    all_filter_movies: [],
    sort_movies: 'rating',
    sorted_movies: [],
    years: [],
    rating: [],
    custom_list_names: [],
    custom_movie_list: [],
    suggested_movies: [],

	}
  },


  methods:{

  testing() {
    console.log("here is testing ***")
    this.test.update_rating+=1
    console.log(this.test)
    console.log(this.test)
  },
  loadMovies() {

    var _this = this
    // let search_by_year = Number(this.search)
    // let url = search_by_year ? `http://www.omdbapi.com/?i=tt3896198&apikey=8e76539a&s=${_this.search}&y=${search_by_year}` : `http://www.omdbapi.com/?i=tt3896198&apikey=8e76539a&s=${_this.search}`
    let _search = _this.search.split(',')
    console.log("Here is search")
    console.log(_search.length)


    // axios.get(`http://www.omdbapi.com/?apikey=8e76539a&s=${_search[0]}&y=${_search[1]}`)
    axios.get(`http://www.omdbapi.com/?apikey=8e76539a${_search.length>1 ? '&s='+_search[0]+'&y='+_search[1] : '&s='+_search[0]}`)
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
        _this.movies[index]['list_name'] = null;
        _this.movies[index]['list_movie'] = null;

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
        // const found = _this.store.rating.find(element => element['imdbID'].id == _this.movies[index]['imdbID']);

        //later uncomment this because we are using compsoable
        // if(!found) {
        //   _this.store.rating.push({imdbID: {id: _this.movies[index]['imdbID'], rating: 0, review: _this.movies[index]['write_review']}}) 
           
        // }

        // useMovieRating(_this.store, _this.movies[index])

        const found = _this.store.rating.find(element => element['imdbID'].id == _this.movies[index]['imdbID']);
        if(!found) {
          this.movie_information.pushR(_this.store, _this.movies[index])  
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

      //later uncomment it because of usage compsoable
      // this.store.rating.forEach((_rating, index) => {
      //   if(this.store.rating[index].imdbID.id == id) {
      //     // this.store.rating[index].imdbID.rating = this.movie_rating
      //     this.store.rating[index].imdbID.rating = _movie[0].movie_rating
      //     this.store.rating[index].imdbID.review = _movie[0].write_review
      //     this.store.rating[index].imdbID.movie_id = _movie[0].imdbID
      //     // this.movie_rating = this.store.rating[index].imdbID.rating 
      //   }
      // })

      this.store.rating.forEach((_rating, index) => {
        if(this.store.rating[index].imdbID.id == id) {
          // this.store.rating[index].imdbID.rating = _movie[0].movie_rating
          // this.store.rating[index].imdbID.review = _movie[0].write_review
          // this.store.rating[index].imdbID.movie_id = _movie[0].imdbID

          // useUpdateMovieInfo(this.store, _movie, index)
          console.log("Here is movies*******")
          console.log(_movie)
          this.update_movie_information.pushR(this.store, _movie, index)
        }
      })
    },

    createCustomList(id) {
      let _movie = this.movies.filter((movie) => {
        return movie.imdbID == id;
      })

      _movie = JSON.stringify(_movie)

      if(_movie) { 
        _movie = JSON.parse(_movie)
      }

      //later uncomment it because of usage compsoable
      // this.store.rating.forEach((_rating, index) => {
      //   if(this.store.rating[index].imdbID.id == id) {
      //     // this.store.rating[index].imdbID.rating = this.movie_rating
      //     this.store.rating[index].imdbID.rating = _movie[0].movie_rating
      //     this.store.rating[index].imdbID.review = _movie[0].write_review
      //     this.store.rating[index].imdbID.movie_id = _movie[0].imdbID
      //     // this.movie_rating = this.store.rating[index].imdbID.rating 
      //   }
      // })

      this.store.rating.forEach((_rating, index) => {
        if(this.store.rating[index].imdbID.id == id) {
          // this.store.rating[index].imdbID.rating = _movie[0].movie_rating
          // this.store.rating[index].imdbID.review = _movie[0].write_review
          // this.store.rating[index].imdbID.movie_id = _movie[0].imdbID

          // useUpdateMovieInfo(this.store, _movie, index)
          _movie[0]['list_name'] = this.list_name
          _movie[0]['list_id'] = this.list_name+'-'+id
          let _list_name = this.list_name.replace(/\s/g, '')
          this.update_movie_information.pushR(this.store, _movie, index, {list_name: this.list_name, list_id:this.list_name+'-'+id, nick_name: _list_name, movie_title: _movie[0].Title, movie_director: _movie[0].director, movie_img: _movie[0].Poster, relase_year: _movie[0].Year, img: _movie[0].Poster})
        }
      })
    },

    showCustomList(){

      let _movies = JSON.parse(JSON.stringify(this.get_all_movies.get_movies(this.store)))
      let all_lists = [];
      _movies.forEach((movie) => {
        if(!all_lists.includes(movie.list.nick_name)) {

          all_lists.push(movie.list.nick_name)
          this.custom_list_names.push(movie.list.nick_name)
        }
      })

      let sing = [];
      all_lists.forEach((gen) => {
        sing[gen] = [];
        this.custom_movie_list[gen] = [];
        // _movies.forEach((movie, index) =>{
        //   if(movie.list.nick_name == gen) {

        //     sing[gen][index] = movie
        //     this.custom_movie_list[gen][index] = movie
        //   }
        // })

        let genre_movie = _movies.filter((movie) => {
          return movie.list.nick_name == gen
        })
        // sing[gen][index] = genre_movie
        this.custom_movie_list[gen] = genre_movie
      })
    },

    showMovieList() {
      console.log("Here is movies")
      console.log(this.custom_movie_list)
      this.custom_movie_list['hollowen'].forEach((movie) => {
        console.log(movie.list)
      })
      
    },

    //show suggested movies for 
    showSuggestedMovies() {
      let _this = this
      console.log("Hre is rated")
      console.log(_this.get_rated_movies.get_rated_m)
      _this.get_rated_movies.get_rated_m.forEach((rating) => {
        let search = ''
        if(rating.imdbID.rating >= 1 && rating.imdbID.rating < 2) {
          search = 'adventure'
        }
        else if(rating.imdbID.rating >= 2 && rating.imdbID.rating < 3) {
          search = 'bold'
        }
        else if(rating.imdbID.rating >= 3 && rating.imdbID.rating < 4) {
          search = 'comedy'
        }
        else if(rating.imdbID.rating >= 4 && rating.imdbID.rating < 5) {
          search = 'drama'
        }
        else {
          search = 'elephant'
        }

        let idx = 0;
        axios.get(`http://www.omdbapi.com/?&apikey=8e76539a&s=${search}&y=${rating.imdbID.year}`)
        .then(function(response) {
          if(response.data.Response == "True") {

            let index = parseInt(rating.imdbID.rating)
            if(!_this.suggested_movies.includes(response.data.Search)) {

              if(response.data.Search) {
                idx+=1
                
                if(idx<=index && response.data.Search[idx]) {
                  
                  _this.suggested_movies.push(response.data.Search[idx])   
                }
                
              }  
            }
          }
        })  
      })     
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

#movie-site {
  text-align: start;
  padding: 0 24px 24px 24px;
}

#header {
  display: flex;
}

#header .v-responsive {
  margin-left: auto

}




</style>
