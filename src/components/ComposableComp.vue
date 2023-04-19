<template>
	<div>
		<button id="composable">
			Click here
		</button>

		<p @click="greetin();">Movie rating is {{rate}}</p>
	</div>
</template>

<script>
	import {useLocalStorage} from '@vueuse/core'
	import {useRateReview} from '../rate_review.js'

	export default {
		setup() {
		const store = useLocalStorage('cartoon', 
			{rating: []}
		)

		// const rate = useRateReview(store, {id: 94, name: 'Cartoon'})
		// console.log("Here is rating*****")
		// // console.log(rate)
		return {store}

		},
		name: 'ComposableVue',
		data() {
			return {
				welcome: "Welcoem greeting",
				count: 0
			}
		},

		methods: {
			greetin() {
				this.count+=1
				console.log(this.count)
				useRateReview(this.store, {id:94, name: 'Cartoon'}, this.count)
			}
		}

	}
</script>



