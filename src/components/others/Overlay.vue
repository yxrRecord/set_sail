<template>
  <div :class="{
    overlay: true,
    'overlay-bg': showModal
    }" v-show="visible"
    @click="close"
  >
    <div class="overlay-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs, computed, defineEmits } from "vue";
const props = defineProps({
  showModal: { // 是否显示 modal
    type: Boolean,
    default: true
  },
  modelValue: Boolean, // 显示 overlay
  closeOnClickModal: { // 是否可以通过点击 modal 关闭 overlay
    type: Boolean,
    default: false
  }
})

const  emits = defineEmits(["update:modelValue"]);

const visible = computed({
  get() {
    if (props.modelValue && props.showModal) {
      setScroll();
    }
    if (props.modelValue === false && props.showModal) {
      removeScroll();
    }
    return props.modelValue
  },
  set(value) {
    if (!value && props.showModal) {
      removeScroll();
    }
    emits("update:modelValue", value)
  }
})
const rootDom = document.querySelector("#app") as HTMLElement
const setScroll = () => {
  rootDom.classList.add("app-overflow-hidden")
}
const removeScroll = () => {
  rootDom.classList.remove("app-overflow-hidden")
}
const close = () => {
  if (props.closeOnClickModal) {
    visible.value = false;
  }
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
  justify-content: center;
  align-items: center;
  .overlay-content {
    margin: 0 auto;
  }
}
.overlay-bg {
  background-color: rgba(0, 0, 0, .7);
}
</style>
