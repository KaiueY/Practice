<script setup vapor>
import {ref} from 'vue'
import { useCounter } from '@/store'
	const {count, inc} = useCounter()
</script>

<template>
  <div class="main">
	  <div>count is {{ count }}</div>
	  <button @click="inc">click me count well add</button>
  </div>
</template>

<style scoped>
.main{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

</style>
