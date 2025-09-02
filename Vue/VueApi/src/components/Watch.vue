<script setup>
import { ref, watch } from "vue";

const count = ref(0);
const obj = ref({ a: 1, b: 2 });
const userId = ref(1);

const getUserInfo = () => {
  setTimeout(() => {
    console.log("Fetching user info for userId:", ++userId.value);
  }, 2000);
};

const handleObj = () => {
  obj.value.a++;
  obj.value.b++;
};
const handleCount = () => {
  count.value++;
};

watch(
  [count, obj],
  ([oldCount, oldObj], [newCount, newObj]) => {
    console.log("Count changed:", oldCount, newCount);
    console.log("Object changed:", oldObj, newObj);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<template>
  <div>
    <button @click="handleCount">Log Count</button>
    <button @click="handleObj">Log Object</button>
    <button @click="getUserInfo">Log User Info</button>
  </div>
</template>
