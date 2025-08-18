<script setup>
import Hello from './components/Hello.vue';
import { useCounter } from '@/store';


const {count, inc} = useCounter()
</script>

<template>
	<div class="main">

		<h1>hello</h1>
		<div><Hello/></div>
		<div>count is {{ count }}</div>
		<button @click="inc">click me </button>
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
