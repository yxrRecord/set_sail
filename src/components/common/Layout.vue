<template>
  <div class="common-layout-wrapper">
    <HomeBanner v-if="showBanner" ref="homeBanner" />
    <Header></Header>
    <transition name="fade">
      <div
        v-show="state.showBackTop"
        class="back-top pointer iconfont yxricon-test"
        :class="{ 'an-back-top': state.showBackTop }"
        key="back-top"
        @click="Tools.scrollToTop(0)"
      ></div>
    </transition>
    <div style="margin-top: 80px">
      <router-view #default="{ route, Component }" :key="route.fullPath">
        <transition
          :enter-active-class="`animate__animated ${route.meta.transition}`"
        >
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>

    <Login v-model="showLogin"></Login>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, ref, onMounted } from "vue";
import Header from "@components/others/Header.vue";
import HomeBanner from "../others/HomeBanner.vue";
import Login from "../others/Login.vue";
import Tools from "@tools";
import { useRoute } from "vue-router";
import { useAppStore } from "@store/modules/app";
const appStore = useAppStore();
const route = useRoute();
const state = reactive({
  containerHeight: 0 as number,
  showBackTop: false as boolean,
  routeNameList: ["skill", "work", "project", "about"] as string[],
  scrollTime: null as number | null,
});
const showLogin = computed(() => {
  return appStore.showLoginDialog;
});

// cpmputed
const showBanner = computed(() => {
  return appStore.showBanner;
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
