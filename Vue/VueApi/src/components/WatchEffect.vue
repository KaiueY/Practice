<template>
  <div>
    <h1>Watch Api Test</h1>
    <p>watch和watchEffect的区别</p>
    <span>{{ count }}</span>
    <button @click="handleClick">count++</button>
    <button @click="handleDoubleClick">count+2</button>

    <div>
      <p>Bob:</p>
      <span>{{ Bob.name }}</span>
      <span>{{ Bob.age }}</span>
      <button @click="BobChange">Bob变Bobo</button>
    </div>
  </div>
  <div>
    结论：WatchEffect会在每次响应式数据变化时执行，无论响应式依赖有多深的层次，都可以准确的监听到
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const count = ref(0);
const Bob = ref({ name: "Bob", age: 20 });

const handleClick = () => {
  count.value++;
};
const handleDoubleClick = () => {
  handleClick();
  handleClick();
};
const handleCountChange = () => {
  console.log(`count changed from ${{ count }}`);
  console.log(count.value);
};

const BobChange = () => {
  Bob.value.name = "Bobo";
  Bob.value.age++;
};

const BobDes = () => {
  console.log(
    `My name is ${Bob.value.name}, and I am ${Bob.value.age} years old.`
  );
};

const runBobDes = () => {
  console.log("runBobDes");

  BobDes();
};
const BobSay = () => {
  console.log("BobSay");

  runBobDes();
};

watchEffect(() => {
  BobSay();
  handleCountChange();
});
</script>

<style scoped></style>
