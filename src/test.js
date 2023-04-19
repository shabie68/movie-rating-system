
// import {useLocalStorage} from '@vueuse/core'
import {ref} from 'vue'
export function useTest(rating, review,id) {

		console.log(rating)
		console.log(review)
		console.log(id)

	let update_rating = ref(0)
	let update_review = ref('')
	let update_id = ref(0)

	function pushR(rating, review, id) {
		//store
		console.log("here is review")
		console.log(review)
		update_rating.value
		update_review = review.value
		update_id = id.value
		console.log(rating)
		console.log(review)
		console.log(id)

		console.log(update_rating)
		console.log(update_review)
		console.log(update_id)
	}
	// let btn = document.getElementById('composable')

	// setTimeout(() => {
	// 	onMounted(() => btn.addEventListener('click', update))
	// 	onUnmounted(() => btn.removeEventListener('click', update))
	// }, 2000)


	// onMounted(() => window.addEventListener('mousemove', pushR))
	// onUnmounted(() => window.removeEventListener('mousemove', pushR))	
	pushR(update_rating,update_review,update_id)
	console.log("Here is update")
	console.log(update_rating)
	return {update_rating,update_review,pushR}
}