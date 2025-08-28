<script setup lang="ts">
import {
  // type InputProps,
  ElInput,
} from "element-plus";
import {
  getCurrentInstance,
  h,
  // useAttrs,
  useSlots,
  type ComponentInstance,
} from "vue";

// interface MyInputProps extends Partial<InputProps> {
//   kailin?: string;
// }
// const props = defineProps<Partial<MyInputProps>>();
const props = defineProps();
const slots = useSlots();
// const attrs = useAttrs();

const vm = getCurrentInstance();

const changeRef = (instance: any) => {
  console.log("vm=>", vm);
  vm!.exposed = vm!.exposeProxy = instance || {};
};
defineExpose({} as ComponentInstance<typeof ElInput>);
</script>
<template>
  <div class="my-input">
    <div>二次封装，自定义的内容</div>
    <component
      :is="h(ElInput, { ...props, ...$attrs, ref: changeRef }, slots)"
    ></component>
  </div>
</template>

<style scoped>
.my-input {
  margin: auto;
  width: 200px;
}
</style>
