<template>
  <Overlay id="login-dialog" v-model="showOverlay" :showBackground="true">
    <div class="login-container">

    </div>
  </Overlay>
</template>

<script lang="ts" setup>
import {onMounted, reactive, defineProps, computed, defineEmits } from "vue";
import Overlay from "./Overlay.vue"
const props = defineProps({
  value: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(["update:value"])
const showOverlay = computed({
  get() {
    return props.value;
  },
  set(value) {
    emits("update:value", value)
  }
})
</script>

<style lang="scss" type="text/scss" scoped>
.login-container {
  background: #fff;
  width: 50%;
  height: 300px;
}
</style>