<template>
  <div class="common-layout-wrapper">
    <HomeBanner v-if="showBanner" ref="homeBanner" @scrollHome="scrollHome" />
    <Header></Header>
    <transition name="fade">
      <div
        v-show="state.showBackTop"
        class="back-top pointer iconfont yxricon-test"
        :class="{ 'an-back-top': state.showBackTop }"
        key="back-top"
        @click="scrollToTop(0)"
      ></div>
    </transition>
    <div style="margin-top: 80px">
      <router-view :key="route.fullPath"></router-view>
    </div>

    <Login v-model="showLogin"></Login>
  </div>
</template>
<script lang="ts" setup>
import {
  defineComponent,
  reactive,
  computed,
  watch,
  ref,
  toRefs,
  onMounted,
} from "vue";
import Header from "@components/others/Header.vue";
import HomeBanner from "../others/HomeBanner.vue";
import Login from "../others/Login.vue";

import { useRouter, useRoute, Router } from "vue-router";
import { useStore } from "vuex";
const router: Router = useRouter();
const store = useStore();
const route = useRoute();
const state = reactive({
  containerHeight: 0 as number,
  showBackTop: false as boolean,
  routeNameList: ["skill", "work", "project", "about"] as string[],
  scrollTime: null as number | null,
});
const showLogin = ref(true);

// cpmputed
const showBanner = computed(() => {
  return store.getters.showBanner;
});

// ref
const homeBanner = ref();

onMounted(() => {
  init();
});

// methods
const init = () => {
  if (homeBanner.value) {
    state.containerHeight = homeBanner.value.$el.clientHeight;
  }
  window.addEventListener("scroll", onScroll);
};

const onScroll = () => {
  // 控制 header 组件显示与透明度
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  // 控制返回顶部是否显示
  if (scrollTop > state.containerHeight + 300) {
    state.showBackTop = true;
  } else state.showBackTop = false;
};

const scrollHome = () => {};

const scrollToTop = (position: number) => {
  // 使用requestAnimationFrame，如果没有则使用setTimeOut
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      return setTimeout(callback, 20);
    };
  }

  // 获取当前元素滚动的距离
  let scrollTopDistance =
    document.documentElement.scrollTop || document.body.scrollTop;

  const smoothScroll = () => {
    // 如果你要滚到顶部，那么position传过来的就是0，下面这个distance肯定就是负值。
    let distance = position - scrollTopDistance;
    // 每次滚动的距离要不一样，制造一个缓冲效果
    scrollTopDistance = scrollTopDistance + distance / 20;
    // 判断条件
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position);
    } else {
      window.scrollTo(0, scrollTopDistance);
      requestAnimationFrame(smoothScroll);
    }
  };
  smoothScroll();
};
</script>
<style lang="scss" type="text/scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
// .fade-enter-active,
// .fade-leave-active {
//   transition: all 0.5s ease;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
//   transform: translateY(60px);
// }

.common-layout-wrapper {
  user-select: none;
  .back-top {
    position: fixed;
    z-index: 100;
    right: 40px;
    bottom: 80px;
    padding: 8px;
    border-radius: 5px;
    font-size: 30px;
    text-align: center;
    background: #fff;
    color: $primary-color;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>
