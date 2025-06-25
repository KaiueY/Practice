<script setup>
const props = defineProps({
	message:String
})
const emit = defineEmits(['handleClick'])



</script>
<template>
  <div>
	<button @click="emit('handleClick',[props.message,'kailin'])"
	>clickkkkk</button>
	<div>{{ props }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
