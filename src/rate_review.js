import {ref, onMounted, onUnmounted} from 'vue'

export function useRateReview() {
	// const rating = ref(0)
	// const review = ref(0)

	let greeting = ref(0)

	// function update(event) {
	// 	rating.value = event.rating
	// 	review.value = event.review
	// }

	// let btn = document.getElementById('composable')

	// setTimeout(() => {
	// 	onMounted(() => btn.addEventListener('click', update))
	// 	onUnmounted(() => btn.removeEventListener('click', update))
	// }, 2000)
	function update() {
		greeting.value = 'Welcome to composable!'

	}

	onMounted(() => window.addEventListener('mousemove', update))
	onUnmounted(() => window.removeEventListener('mousemove', update))	

	

	return {greeting}
}