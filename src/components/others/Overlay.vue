<template>
  <div :class="{
    overlay: true,
    'overlay-bg': showBackground
  }" v-show="visible"
  @click="close">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs, computed, defineEmits } from "vue";
const props = defineProps({
  showBackground: {
    type: Boolean,
    default: true
  },
  value: Boolean
})

const  emits = defineEmits(["update:value"]);

const visible = computed({
  get() {
    if (props.value && props.showBackground) {
      setScroll();
    }
    if (props.value === false && && props.showBackground) {
      removeScroll();
    }
    return props.value
  },
  set(value) {
    if (!value && && props.showBackground) {
      removeScroll();
    }
    emits("update:value", value)
  }
})
const rootDom = document.querySelector("#app")
const setScroll = () => {
  rootDom.classList.add("app-overflow-hidden")
}
const removeScroll = () => {
  rootDom.classList.remove("app-overflow-hidden")
}
const close = () => {
  visible.value = false;
}

</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  top: 0;
  left: 0;
  display: flex;
  align-content: center;
  align-items: center;
  overflow: hidden;
}
.overlay-bg {
  background-color: rgba(0, 0, 0, .7);
}
</style>