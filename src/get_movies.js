import {ref} from 'vue'

export function useGetMovies(store) {

	let all_movies = ref([])

	function get_movies(store) {

		store.rating.forEach((rating) => {

			let mmovie = JSON.parse(JSON.stringify(rating.imdbID))
			if(mmovie.list) {
				if(mmovie.list.list_name) {
					console.log(mmovie)
					all_movies.value.push(mmovie)
				}
			}
		})

		return all_movies.value
	}

	return {store,get_movies}
}