<template>
  <div style="display: flex; flex-wrap: wrap">
    <div v-for="item in 300" :key="item">
      <Complex v-if="defer(item)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useDefer } from "./utlis.ts";
// const defer = useDefer();

const useDefer = (num = 1000) => {
  let count = ref(0);
  function refreshCount() {
    setTimeout(() => {
      count.value++;
      if (count.value <= num) {
        refreshCount();
      }
    }, 60);
  }
  refreshCount();
  return function (countValue: number) {
    return count.value >= countValue;
  };
};
const defer = useDefer();
</script>

<style lang="scss" type="text/scss" scoped></style>
