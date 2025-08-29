<script setup lang="ts">
import ScopeSlot from "./components/ScopeSlot.vue";
import SlotComponent from "./components/slotComponent.vue";
import HelloSlot from "./utils/helloSlot";
import MouseTracker from "./components/MouseTracker.vue";

const list = [
  { title: "标题1", value: "内容1" },
  { title: "标题2", value: "内容2" },
  { title: "标题3", value: "内容3" },
];
</script>

<template>
  <div>
    <HelloSlot v-if="false">
      <template #header="{ title }">
        <h1>{{ title }}</h1>
      </template>
      <div>渲染了默认插槽</div>
      <template #footer> 渲染了footer</template>
    </HelloSlot>
    <SlotComponent>
      <template #header> 我是父组件的header插槽数据 </template>
      <template #default> 我是父组件的默认插槽数据 </template>
      <template #footer> 我是父组件的footer插槽数据 </template>
    </SlotComponent>
    <h1 class="text-4xl text-orange-200">下面是作用域插槽</h1>
    <ScopeSlot :list="list">
      <template #="{ item, index }">
        {{ index }} - {{ item.title }} : {{ item.value }}
      </template>
    </ScopeSlot>

    <MouseTracker v-slot="{ x, y }">
      Mouse is at: {{ x }}, {{ y }}
    </MouseTracker>
  </div>
</template>

<style scoped></style>
