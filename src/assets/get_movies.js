

export function useGetMovies(store) {
	// let _store = ref(0)


	function get_movies(store) {
		//store

		// store.rating[index].imdbID.rating = movie[0].movie_rating
		// store.rating[index].imdbID.review = movie[0].write_review
		// store.rating[index].imdbID.movie_id = movie[0].imdbID
		// if(list) {
		// 	store.rating[index].imdbID.list = list;
		// }
		// return {store}
		this.store.rating.forEach((rating) => {
			this.rating.filter((movie) => {
				return movie.list_name!=''
			})
		})


	}

	return {get_movies}
}