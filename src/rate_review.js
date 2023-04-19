import {ref} from 'vue'
// import {useLocalStorage} from '@vueuse/core'

export function useRateReview(store, movie, count) {
	let _store = ref(0)

	function pushR(store, movie, count) {
		//store
		store.rating.push(
			{
				imdbID: 
					{
						id: movie['id'], 
						rating: 0,
						total_movies: count, 
						review: movie['name'],

						
					}
			}
		) 

		return {store}
	}
	// let btn = document.getElementById('composable')

	// setTimeout(() => {
	// 	onMounted(() => btn.addEventListener('click', update))
	// 	onUnmounted(() => btn.removeEventListener('click', update))
	// }, 2000)


	// onMounted(() => window.addEventListener('mousemove', pushR))
	// onUnmounted(() => window.removeEventListener('mousemove', pushR))	
	_store.value = pushR(store, movie, count)


	return {_store}
}