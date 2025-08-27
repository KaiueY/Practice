<script setup lang="ts">
defineProps(['msg'])
</script>

<template>

  <div>hello,父组件的{{ msg }} </div>
  <slot></slot>
</template>

<style scoped></style>
