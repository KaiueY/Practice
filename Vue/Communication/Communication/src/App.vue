<script setup>
import { ref,provide } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Child1 from "./components/Child1.vue";
import Child2 from "./components/Child2.vue";
import Child3 from "./components/Child3.vue";

const msg1 = ref("1");
const msg2 = "define-emit";
const msg3 = "kkkkkkk";

const handleClick = (value) => {
  console.log({ value });
};

const fn = () =>{
	console.log('这是父组件provide的方法');	
}
const symbol =Symbol()
provide(symbol,{a:fn,b:'kailin'})

</script>

<template>
  <div>
    value:{{ msg1 }}
    <HelloWorld v-model:msg1="msg1" />
    <Child1 :message="msg2" />
    <Child2 :message="msg3" @handleClick="handleClick" />
	<Child3  :symbol="symbol"/>
  </div>
</template>

<style scoped></style>
