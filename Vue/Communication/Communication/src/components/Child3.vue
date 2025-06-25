<script setup>
import {inject} from 'vue'
const props = defineProps({
	symbol:Symbol
})
const bar = inject(props.symbol)
console.log(bar);



</script>
<template>
  <div>
	<button @click="console.log({props})"
	>clickkkkk</button>
	<div>{{ props }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
