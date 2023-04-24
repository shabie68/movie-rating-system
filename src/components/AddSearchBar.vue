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
          </div>
        </v-container>

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
                  </v-card>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
	</div>
</template>

<script>

	import axios from 'axios'
	
	export default {
		data() {
			return {
				movies: [],
				search: ''
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