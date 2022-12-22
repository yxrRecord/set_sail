<template>
  <div class="popover">
    <div class="reference" ref="referenceRef" @click="handleReference">
      <slot name="reference"></slot>
    </div>
    <Teleport to="#app">
      <div
        :class="`popover-content popover-${placement}`"
        v-show="show"
        ref="contentRef"
        :style="{
          width: width,
          transform: `translate(${translateData.translateX}px, ${translateData.translateY}px)`,
        }"
      >
        <slot name="content"></slot>
        <div
          class="jt"
          :style="{
            transform: `rotateZ(45deg) translate3d(${translateData.jtTranslateX}px, ${translateData.jtTranslateY}px, 0)`,
          }"
        ></div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, computed, reactive, nextTick } from "vue";
interface PropsType {
  title?: string;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  width?: string | number;
  content?: string;
}

const props = withDefaults(defineProps<PropsType>(), {
  title: "",
  placement: "left-start",
  width: "auto",
  content: "",
});

const referenceRef = ref();
let referenceDom = reactive({
  top: 0,
  left: 0,
  height: 0,
  width: 0,
});
const contentRef = ref();
let contentDom = reactive({
  height: 0,
  width: 0,
});

let offsetLeft = ref(30);
let offsetTop = ref(0);
let show = ref(false);
const getReferenceDom = () => {
  referenceDom = referenceRef.value.getBoundingClientRect();
};
interface translateDataType {
  translateX: number;
  translateY: number;
  jtTranslateX: number;
  jtTranslateY: number;
}
let translateData = ref<translateDataType>({
  translateX: 0,
  translateY: 0,
  jtTranslateX: 0,
  jtTranslateY: 0,
});
const getTranslateData = () => {
  contentDom = contentRef.value.getBoundingClientRect();
  const tcaseTraData = {
    "left-start": {
      translateX: referenceDom.left - contentDom.width - offsetLeft.value,
      translateY: referenceDom.top,
      jtTranslateX: contentDom.width + 7,
      jtTranslateY: 14,
    },
    "right-start": {
      translateX: referenceDom.left + offsetLeft.value,
      translateY: referenceDom.top + offsetTop.value - referenceDom.height / 2,
      jtTranslateX: -7,
      jtTranslateY: 14,
    },
    //  "top"
    //   "top-start"
    //   "top-end"
    //   "bottom"
    //   "bottom-start"
    //   "bottom-end"
    //   "left"
    //   "left-start"
    //   "left-end"
    //   "right"
    //   "right-end"
  };
  translateData.value = tcaseTraData[props.placement];
  console.log(referenceDom);
  console.log(contentDom);
  console.log(translateData);
};

const handleReference = () => {
  getReferenceDom();
  show.value = !show.value;
  nextTick(getTranslateData);
};
// const resetReferenceDom = () => {
//   resetReferenceDom
// }
</script>

<style lang="scss" type="text/scss" scoped>
.popover {
  display: inline-block;
  .reference {
    font-size: 20px;
  }
  // .content-left {
  //   transform: translate(-210px, -20px);
  // }
  // .jt-left {
  //   transform: translate(-18px, 2px) rotateZ(45deg);
  // }
  // .content-right {
  //   transform: translate(36px, -20px);
  // }
  // .jt-right {
  //   transform: translate(30px, 2px) rotateZ(225deg);
  // }
}
</style>

<style lang="scss">
.popover-content {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
  background: #fff;
  box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04),
    0px 8px 20px rgba(0, 0, 0, 0.08);

  border: 1px solid #e4e7ed;
  border-radius: 5px;
  width: 200px;
  height: 100px;
  z-index: 9999;
  transform: translate(0, 0);
  .jt {
    $offsetLeft: 7px;
    $offsetTop: 14px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 14px;
    height: 14px;
    border: 1px solid #e4e7ed;
    transform: rotateZ(45deg) translate3d(0, 0, 0);
    background-color: red;
    border-top: transparent;
    border-right: transparent;
  }
}
</style>
