<script setup lang="ts">
import { getCurrentInstance, nextTick, onMounted, ref, useTemplateRef, onUnmounted } from 'vue';
import Hello from './components/Hello.vue';


const showMask = ref(true)
const helloRef = useTemplateRef('helloRef')
const maskRef = useTemplateRef('maskRef')
let helloClone: HTMLElement | null = null

onMounted(() => {
  console.log("helloRef:", helloRef.value?.$el.getBoundingClientRect());
  const boxRef = document.getElementById('box1');
  // const childrenDom = (helloRef.value as any)?.$el as HTMLElement;
  if (boxRef) {
     const cloneDom = createClone(boxRef)
     maskRef.value && maskRef.value.appendChild(cloneDom)
  }
  console.log("boxRef:", boxRef)
  
  
})



const createClone = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const clone = el.cloneNode(true) as HTMLElement
  Object.assign(clone.style, {
    position: 'absolute',
    top: rect.top + 'px',
    left: rect.left + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px',
    margin: '0',
    zIndex: '1001',
    pointerEvents: 'none'
  })
  clone.id = 'hello-clone'
  return clone
}
const handleMask = () => {
  showMask.value = !showMask.value
}

</script>

<template>
    <Hello id="hello"  ref="helloRef"/>
  <div id="mask" ref="maskRef" v-show="showMask" @click="handleMask" class="mask"></div>
</template>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(232, 13, 13, 0.5);
}
</style>
