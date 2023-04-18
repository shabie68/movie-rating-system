<script setup>
	import {useRateReview} from '.././rate_review.js'
	const rate = useRateReview()
	console.log(rate)
	// export default {
	// 	setup() {
	// 		const x  = useRateReview()
	// 		console.log(x)
	// 	},
	// 	name: 'ComposableVue',
	// 	data() {
	// 		return {

	// 		}
	// 	},

	// }
</script>


<template>
	<div>
		<button id="composable">
			Click here
		</button>

		<p>Movie rating is {{rate}}</p>
	</div>
</template>

<script>
	export default {
		setup() {
			const x  = useRateReview()
			console.log(x.greeting._value)
		},
		name: 'ComposableVue',
		data() {
			return {

			}
		},

	}
</script>



