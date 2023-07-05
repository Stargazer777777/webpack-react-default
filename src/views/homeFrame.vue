<template><div class="title">hello world</div></template>

<script setup lang="ts">
import { ref } from 'vue';

const color = ref('red');
</script>

<style scoped lang="scss">
.title {
  color: v-bind(color);
}
</style>
