<script setup lang="ts">
import HelloSlot from './utils/helloSlot';
</script>

<template>
  <HelloSlot>
    <template #header="{ title }">
      <h1>{{ title }}</h1>
    </template>
    <div>渲染了默认插槽</div>
    <template #footer> 渲染了footer</template>
  </HelloSlot>
</template>

<style scoped>

</style>
