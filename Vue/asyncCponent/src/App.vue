<script setup lang="ts">
import { h } from "vue";
import defineAsyncComponent from "./apiAsyncComponent";

const AsyncComponent = defineAsyncComponent({
  loader:() => import('./components/HelloWorld.vue'),
  timeout:3000,
  loadingComponent: {
    render: () => h("div", "loading..."),
  },
  errorComponent: {
    render: () => h("div", "loading error"),
  },
});
</script>

<template>
  <AsyncComponent msg="app">
    <div>默认插槽</div>
  </AsyncComponent>
</template>

<style scoped></style>
