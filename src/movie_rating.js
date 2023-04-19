import {ref} from 'vue'
// import {useLocalStorage} from '@vueuse/core'

export function useMovieRating(store, movie) {
	let _store = ref(0)

	function pushR(store, movie) {
		//store
		store.rating.push(
			{
				imdbID: 
					{
						id: movie['imdbID'], 
						rating: 0,
						review: movie['write_review'],
					}
			}
		) 
		return {store}
	}

	_store.value = pushR(store, movie)

	return {_store}
}