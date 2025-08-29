<script setup lang="ts">
defineProps<{
  list;
}>();
</script>
<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
      <slot :item="item" :index="index"> </slot>
    </li>
  </ul>
</template>

<style scoped></style>
