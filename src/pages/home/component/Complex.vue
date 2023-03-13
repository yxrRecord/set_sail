<template>
  <div class="complex">
    <span v-for="item in 1000" :key="item"></span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style lang="scss" type="text/scss" scoped>
.complex {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
  margin: 0 5px 5px 0;
  span {
    border: 1px solid #ccc;
    margin: 0 5px 5px 0;
  }
}
</style>
