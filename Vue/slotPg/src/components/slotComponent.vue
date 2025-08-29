<script setup lang="ts"></script>
<template>
  <div>
    <h1 class="text-xl font-bold">这是一个插槽组件</h1>
    <header>
      <slot name="header"></slot>
      <p class="text-red-500">上面是header插槽</p>
    </header>
    <article>
      <slot></slot>
      <p class="text-blue-500">上面是默认插槽的内容</p>
    </article>
    <footer>
      <p class="text-green-500">下面是footer插槽</p>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped></style>
