<template>
	<div>

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
                @change="searchMovies()"

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



        <v-divider></v-divider>
        <v-container>
          <div class="mignon-movies"> 
            <h1>
              <span class="text-primary">Some guidelines when searching movies. You have 3 options available
              </span>
            </h1>
            <p>
              
              <br>
              <ul>
                <li>
                  <span class="text-success">By title**</span> 
                  <p class="text-info">
                    Just type title of the movie or type first 2 or 3 words of the title<br>
                    i.e Search term** "Bold" will show the movies that have bold in their title<br>
                    You can also type "Bo" to search movies begin with "Bo"
                  </p>
                </li>

                <li>
                  <span class="text-success">
                    By year**
                  </span>
                   <p class="text-info">
                     You can also search just type the year of release. i.e 2021 will load movies that release in 2021
                   </p>
                </li>

                <li>
                  <span class="text-success">
                     By title and year***** 
                  </span>
                  <p class="text-info">
                    Want to search the movies where title = "some title" and year = "some year". Will load the movies for some title that are released in some year. Just enter values as follow<br>
                    1st value = title separated by comma with no spaces and then type year<br>
                    i.e <b>Bold,2020</b> will load movies having title Bold and that are released in 2020
                  </p>
                 
                </li>
              </ul>
            </p>

            <v-divider></v-divider>

          </div>
        </v-container>

        <v-row id="movie-body">
          <v-col
            col="4"
          >
            <h2>
              All Movies
            </h2>
          </v-col>

          <v-col
                col="4"
              >
              <v-select
                max-width="344"
                label="Sort Movies"
                :items="sort_items"
                v-model="sort_movies"
                @update:modelValue="sortMovies()"
              ></v-select>
            </v-col>
        </v-row>

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
                        <div>
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
                        </div>


                      </div>

                      <v-divider></v-divider>
                      <div>
                        <v-responsive
                          class="mx-auto"
                          max-width="344"
                        >
                          <v-text-field
                            label="write_review"
                            hide-details="auto"
                            v-model="movie.write_review"
                          ></v-text-field>
                          

                        </v-responsive>

                        <v-btn 
                          color="info"
                          @click="updateRating(movie.imdbID, 'review')"
                        >
                            Write Review
                        </v-btn>
                    </div>
                    </v-card-actions>
                  </v-card>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
	</div>
</template>

<script>

	import axios from 'axios'
  import { useLocalStorage } from '@vueuse/core'

	export default {

      setup(){


        const store = useLocalStorage('movie',
          {rating: []}
        )

        return {store}
      },
		data() {
			return {
				movies: [],
				search: '',
        sort_items: ['rating', 'year', 'title'],
        rating: [],
        years: [],
        sort_movies: 'rating',
        movie_rating: 3
			}
		},

		created() {
			this.loadMovies()
		},

		methods: {
			loadMovies() {
				var _this = this

				axios.get('http://www.omdbapi.com/?apikey=8e76539a&s=movie')
				.then(function(response) {
					if(response.data.Response == "True") {
					_this.setMovies(response.data.Search);
					}
				}) 
			},

			setMovies(movies) {
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

			searchMovies() {

				var _this = this
				let _search = _this.search.split(',')

				axios.get(`http://www.omdbapi.com/?apikey=8e76539a${_search.length>1 ? '&s='+_search[0]+'&y='+_search[1] : '&s='+_search[0]}`)
				.then(function(response) {
					if(response.data.Response == "True") {

					_this.setMovies(response.data.Search);
					}
				})  
			},

      sortMovies() {
        console.log("Here is ratings***")
        console.log(this.movies)

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

      single_movie(movie, index) {

        let _this = this

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

          if(load_rating_movie.length > 0 ) {
            this.store.rating.forEach((_rating, _index) => {
                if(this.store.rating[_index].imdbID.id == load_rating_movie[0].imdbID.movie_id) {
                _this.movies[index]['movie_rating'] = load_rating_movie[0].imdbID.rating ?load_rating_movie[0].imdbID.rating : 0

                _this.movies[index]['write_review'] = load_rating_movie[0].imdbID.review ? load_rating_movie[0].imdbID.review: ''
              }
            })
          }

          const found = _this.store.rating.find(element => element['imdbID'].id == _this.movies[index]['imdbID']);
          if(!found) {
            _this.store.rating.push({imdbID: {id: _this.movies[index]['imdbID'], rating: 0,review: _this.movies[index]['write_review']}}) 
             
          } 
          this.setRatings(response.data.Ratings, index)     
        })
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
            })

            let total_ratings = __ratings__.length

            __ratings__ = __ratings__[total_ratings-1]

            total_ratings += _movie_rating.movie_rating > 0 ? 1 : 0
            __ratings__+= _movie_rating.movie_rating > 0 ? _movie_rating.movie_rating*2 : _movie_rating.movie_rating 

            let avg_rating = (__ratings__)/total_ratings.toFixed(2)
            _movie_rating['ratings'] = avg_rating/2
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
            this.store.rating[index].imdbID.rating = _movie[0].movie_rating
            this.store.rating[index].imdbID.review = _movie[0].write_review
            this.store.rating[index].imdbID.movie_id = _movie[0].imdbID
          }
        })
      },
		}
	}
</script>


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

.v-card-actions {
  display: block;
}

#movie-body {
  padding: 16px
}

#custom-movie-list {
  padding: 10 0px 10 0px
}



</style>
