<script setup vapor>
import { useCounter } from '@/store'
	const {count, inc} = useCounter()
</script>

<template>
  <div >
	  <div>count is {{ count }}</div>
	  <button @click="inc">click me count well add</button>
  </div>
</template>

<style scoped>


</style>
