<template>
    <div>
        <!-- slot.header({title})-->
        <slot name="header" :title="title"></slot>
        <!-- slot.default() -->
        <slot>默认内容</slot>
        <!-- slot.footer() -->
        <slot name="footer"></slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue';

console.log(useSlots());

const title = ref('Hello World')
</script>



<style scoped>

</style>