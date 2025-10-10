<template>
    <div>

        <div id="box1" class="box" :style="randomStyle">t1</div>
    </div>
</template>

<script setup lang="ts">
const randomValue = () =>{
    return Math.random()*500
}
const randomStyle = {
    marginTop: randomValue() + 'px',
    marginBottom: randomValue() + 'px',
    marginLeft: randomValue() + 'px',
    marginRight: randomValue() + 'px',
}
  
</script>

<style scoped>
.box {
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    border-radius: 0.5rem;
    background-color: #f9f9f9;
}
</style>