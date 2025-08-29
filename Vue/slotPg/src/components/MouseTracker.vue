<script setup lang="ts">
import { ref } from "vue";

const mouseX = ref(0);
const mouseY = ref(0);

const updateMouse = (e: MouseEvent) => {
  console.log(e);

  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};
document.addEventListener("mousemove", updateMouse);
</script>
<template>
  <div>
    <slot :x="mouseX" :y="mouseY"> </slot>
  </div>
</template>

<style scoped></style>
