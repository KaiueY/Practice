import { ref, effectScope } from 'vue'
export const useCounter = defineStore(() => {
	const count = ref(0)

	function inc() {
		count.value++
	}

	return {
		count,
		inc
	}
})
function defineStore(fn) {
	let state
	return () => {
		if (state) return state
		const scope = effectScope(true)

		return (state = scope.run(fn))
	}
}
export default useCounter