<script setup>
const props = defineProps({
	message:String
})
</script>
<template>
  <div>
	<button @click="()=>console.log('--',props.message)"
	>click</button>
	<div>{{ props }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
