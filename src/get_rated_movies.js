import {ref} from 'vue'
export function useGetRatedMovies(store) {
	console.log(store)

	// function getRatedMovies(store) {
	// 	return store.rating.forEach((_rating) => {

	// 		return _rating
	// 	})
	// }

	let get_rated_m = ref(0)
	get_rated_m = store.value.rating.filter((_rating) => {
		return _rating.imdbID.rating > 0;
	})

	return {get_rated_m}
}