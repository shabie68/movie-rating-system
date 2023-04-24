<template>
	<div>
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
		}
	}
</script>