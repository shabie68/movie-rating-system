import {ref} from 'vue'
// import {useLocalStorage} from '@vueuse/core'

export function useUpdateMovieInfo(store, movie, index) {
	let _store = ref(0)

	console.log("here is movie")
	console.log(movie)
	function pushR(store, movie, index) {
		//store
		store.rating[index].imdbID.rating = movie[0].movie_rating
		store.rating[index].imdbID.review = movie[0].write_review
		store.rating[index].imdbID.movie_id = movie[0].imdbID
		return {store}
	}

	_store.value = pushR(store, movie, index)

	return {_store}
}