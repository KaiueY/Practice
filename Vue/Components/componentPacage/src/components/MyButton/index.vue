<template>
  <el-button  v-bind="omit(attrs, ['onClick'])" :loading="loading" @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
import { ref, useAttrs, type ComponentInstance } from "vue"
import omit from "lodash-es/omit"
import { ElButton, } from "element-plus"
// 关闭自动透传属性
defineOptions({
  inheritAttrs: false
})

const attrs = useAttrs()
console.log({ attrs })

const loading = ref(false)

const handleClick = async () => {
  try {
    loading.value = true
    await attrs.onClick?.()
  } finally {
    loading.value = false
  }
}
defineExpose({} as ComponentInstance<typeof ElButton>);
</script>

<style scoped></style>
