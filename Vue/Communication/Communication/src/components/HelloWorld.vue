<script setup>
import { ref } from "vue";

const props = defineProps({
  msg: String,
});

const emit = defineEmits(["update:msg"]);

const handelClick = () => {
  console.log(Math.random() * 3);

  let random = Math.floor(Math.random() * 3);
  let result = ["a", "b", "c", "d"];
  emit("update:msg", result[random]);
  console.log("new value:", result[random], random);
};
</script>

<template>
  <div>
    <div>{{ props.msg }}</div>
    <button @click="handelClick">click me</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
