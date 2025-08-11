<template>
    <a-form ref="formRef" :rules="rules" :model="modelValue">
        <a-form-item
        v-for="item in formItems"
        :key="item.key"
        :label="item.label"
         :name="item.key"
        >
          <component 
          :is="componentMap[item.type]" 
          v-bind="getProps(item)" 
          v-model:value="modelValue[item.key]"
          ></component>
        </a-form-item>
    </a-form>
</template>

<script setup>
import { Input, InputNumber, Select } from 'ant-design-vue';
import { useTemplateRef } from 'vue';
import { omit } from 'lodash-es';

const modelValue = defineModel()

const componentMap = {
    input: Input,
    number: InputNumber,
    select:Select
}

const formInstance = useTemplateRef('formRef')

const rootProps = ['label', 'key', 'type', ]
defineExpose({
    validate(...args){
        return formInstance.value.validate(...args)
    }
})
const props = defineProps(['formItems', 'rules'])

function getProps(item){
    if(item.props) return item.props;
    return omit(item,rootProps)
}

</script>

<style lang="scss" scoped>

</style>