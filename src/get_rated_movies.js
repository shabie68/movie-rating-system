import {ref} from 'vue'
export function useGetRatedMovies(store) {
	console.log(store)

	// function getRatedMovies(store) {
	// 	return store.rating.forEach((_rating) => {

	// 		return _rating
	// 	})
	// }

	let get_rated_m = ref(0)
	get_rated_m = store.value.rating

	return {get_rated_m}
}