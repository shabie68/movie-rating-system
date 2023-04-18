import {ref, onMounted, onUnmounted} from 'vue'

export function useRateReview() {
	const rating = ref(0)
	const review = ref(0)

	function update(event) {
		rating.value = event.rating
		review.value = event.review
	}

	let btn = document.querySelector("#composable")

	onMounted(() => btn.addEventListener('click', update))
	onUnmounted(() => btn.removeEventListener('click', update))

	return {rating, review}
}