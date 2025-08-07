<script setup>
import { ref, useTemplateRef } from 'vue';
import FormBuilder from './components/FormBuilder.vue'

const formData = ref({
  name:undefined,
  age:undefined,
  sex:undefined
})

const formItems = ref([
  {
    label:'姓名',
    key:'name',
    type:'input',
    props:{
      placeholder:'请输入姓名',
      allowClear: true,
      style: { width: '100%' }
    }
  },
  {
    label:'年龄',
    key:'age',
    type:'number',
    props:{
      placeholder:'请输入年龄',
      allowClear: true,
      style: { width: '100%' }
    }
  },
  {
    label:'性别',
    key:'sex',
    type:'select',
    props:{
      placeholder:'请选择性别',
      allowClear: true,
      style: { width: '100%' },
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' }
      ]
    }
  }
])

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' },
  { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' }
  ],
  age: [{ required: true, message: '请输入年龄', trigger: 'blur' },
  { type: 'number', min: 1, max: 100, message: '年龄必须在 1 到 100 之间', trigger: 'blur' }
  ],
}
 const formInstance = useTemplateRef('formRef')

function onSubmit(){
  formInstance.value.validate()
  console.log('校验成功', formData.value);

}


</script>

<template>

  <FormBuilder ref="formRef" :formItems="formItems" v-model="formData" :rules="rules"/>
  <a-button @click="onSubmit">
    提交
  </a-button>
</template>

<style scoped>
</style>
