// import {ref} from 'vue'
// import {useLocalStorage} from '@vueuse/core'

export function useUpdateMovieInfo(store, movie, index, list='') {
	// let _store = ref(0)

	console.log("here is movie")
	console.log(movie)
	console.log(index)
	console.log("Here is list")
	console.log(list)
	console.log("Here is ratings**********")
	function pushR(store, movie, index, list='') {
		//store
		store.rating[index].imdbID.rating = movie[0].movie_rating
		store.rating[index].imdbID.review = movie[0].write_review
		store.rating[index].imdbID.movie_id = movie[0].imdbID
		store.rating[index].imdbID.year = movie[0].Year
		if(list) {
			store.rating[index].imdbID.list = list;
		}
		return {store}
	}

	// _store.value = pushR(store, movie, index)

	return {pushR}
}