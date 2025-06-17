<script setup lang="ts">
import { ref } from 'vue';
import MyInput from './components/MyInput/index.vue'
import { message } from '@/utils/message';

const inputRef = ref()
const messages = ref('hellow world')
setTimeout(()=>{
    console.log('inputRef==>',inputRef);
    inputRef.value.clear()
},1000)

const handleClick =() =>{
    message.notify({
  title: '通知标题',
  message: '右下角通知',
  position: 'bottom-right'
});
message.notify({
  title: '通知标题',
  message: '右下角通知',
  position: 'bottom-left'
});
message.notify({
  title: '通知标题',
  message: '右下角通知',
  position: 'top-right'
});
message.notify({
  title: '通知标题',
  message: '右下角通知',
  position: 'top-left'
});
}
</script>

<template>
    <MyInput ref="inputRef" kailin="hello" v-model="messages">
        <template #append>
            <el-button @click="handleClick">click</el-button>
        </template>
    </MyInput>
</template>

<style scoped></style>
