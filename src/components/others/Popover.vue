<template>
  <div class="popover">
    <!-- @mouseleave="hidenPopover('hover')" -->
    <div
      :class="`reference popover-${trigger}`"
      ref="referenceRef"
      @click="openPopover('click')"
      @mouseenter="openPopover('hover')"
      @mouseleave="hidenPopover('hover')"
    >
      <slot name="reference"></slot>
    </div>
    <Teleport to="#app">
      <div
        :class="`popover-content popover-${placement}`"
        v-show="show"
        ref="contentRef"
        @mouseenter="openPopover('hover')"
        @mouseleave="hidenPopover('hover')"
        :style="{
          width: width,
          transform: `translate(${translateData.translateX}px, ${translateData.translateY}px)`,
        }"
      >
        <slot name="content"></slot>
        <span
          :class="`jt jt-${placement}`"
          :style="{
            transform: `translate3d(${translateData.jtTranslateX}px, ${translateData.jtTranslateY}px, 0)`,
          }"
        ></span>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, reactive, nextTick } from "vue";
type triggerType = "click" | "hover";
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
  trigger: triggerType;
}

const props = withDefaults(defineProps<PropsType>(), {
  title: "",
  placement: "right-start",
  width: "auto",
  content: "",
  trigger: "click",
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
      translateX:
        referenceDom.left -
        contentDom.width -
        offsetLeft.value +
        referenceDom.width,
      translateY: referenceDom.top + offsetTop.value - referenceDom.height / 2,
      jtTranslateX: contentDom.width - 9,
      jtTranslateY: 14,
    },
    "right-start": {
      translateX: referenceDom.left + offsetLeft.value,
      translateY: referenceDom.top + offsetTop.value - referenceDom.height / 2,
      jtTranslateX: -9,
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

let hidenTimer = ref<number | undefined>(undefined);
const openPopover = (triggerType: triggerType) => {
  if (props.trigger === triggerType) {
    if (hidenTimer.value) {
      clearTimeout(hidenTimer.value);
    }
    getReferenceDom();
    show.value = true;
    nextTick(getTranslateData);
  }
};

const hidenPopover = () => {
  if (props.trigger === "hover") {
    hidenTimer.value = setTimeout(() => {
      show.value = false;
    }, 200);
  }
};
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
.popover {
  .popover-hover {
    &:hover ~ .popover-content {
      background: red !important;
    }
  }
}
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
    transform: rotateZ(45deg) translate3d(0, 0, 0);
    &::before {
      content: "";
      border: 1px solid #e4e7ed;
      transform: rotateZ(45deg) translate3d(0, 0, 0);
      background-color: #fff;
      height: 14px;
      width: 14px;
      display: inline-block;
    }
    &-left-start,
    &-left-end,
    &-left {
      &::before {
        border-bottom-color: transparent;
        border-left-color: transparent;
      }
    }
    &-right-start,
    &-right-end,
    &-right {
      &::before {
        border-top-color: transparent;
        border-right-color: transparent;
      }
    }

    &-top-start,
    &-top-end,
    &-top {
      &::before {
        border-top-color: transparent;
        border-right-color: transparent;
      }
    }
    &-bottom-start,
    &-bottom-end,
    &-bottom {
      &::before {
        border-top-color: transparent;
        border-right-color: transparent;
      }
    }
  }
}
</style>
