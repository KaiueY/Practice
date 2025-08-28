<script setup lang="ts">
import { ref } from "vue";
import MyInput from "./components/MyInput/index.vue";
import { message } from "./utils/message";

const inputRef = ref();
const messages = ref("hellow world");
const value1 = ref(0);
setTimeout(() => {
  console.log("inputRef==>", inputRef);
  inputRef.value.clear();
}, 1000);

const handleClick = () => {
  message.notify({
    title: "通知标题",
    message: "右下角通知",
    position: "bottom-right",
  });
  message.info("信息");
  message.success("成功");
};
</script>

<template>
  <div class="w-full h-screen items-center content-center flex flex-col">
    <MyInput
      ref="inputRef"
      v-model="messages"
    >
    <template #prepend>
      头部插槽
      </template>
      <template #append>
        <el-button @click="handleClick">click</el-button>
      </template>
    </MyInput>
    <div class="slider-demo-block">
      <span class="demonstration">Default value</span>
      <el-slider v-model="value1" />
    </div>
  </div>
</template>

<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
  /* width: 300px; */
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin-bottom: 0;
  margin-right: 12px;
    overflow: hidden;
  /* text-overflow: ellipsis; */
  white-space: nowrap;
}
</style>
