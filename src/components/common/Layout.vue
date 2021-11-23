<template>
  <div class="common-layout-wrapper">
    <HomeBanner @backTop="backTop" v-if="showBanner" />
    <Header />
    <transition name="fade">
      <div
        v-show="showBackTop"
        class="back-top pointer iconfont yxricon-test"
        :class="{ 'an-back-top': showBackTop }"
        key="back-top"
        @click="backTop('top')"
      ></div>
    </transition>
    <!-- <div style="margin-top: 80px">
      <router-view></router-view>
    </div> -->
  </div>
</template>
<script>
import Header from "@components/others/Header.vue";
import HomeBanner from "@components/others/HomeBanner.vue";
import { defineComponent, reactive, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import vuex from 'vuex';
export default defineComponent({
  name: "Layout",
  components: {
    Header,
    HomeBanner,
  },
  setup() {
    const router = useRouter();
    const store = vuex.useStore();
    const state = reactive({
      containerHeight: 0,
      showBackTop: false,
      routeNameList: ["skill", "work", "project", "about"],
    })

    // cpmputed
    const showBanner = computed(() => {
      return store.getters.showBanner;
    })

    // watch
    watch(() => router, (to, from) => {
      if (state.routeNameList.includes(to.name)) {
        state.containerHeight = 0
        return
      }
      state.containerHeight = Math.floor(document.querySelector('#home-banner').clientHeight)
    }, {
      deep: true
    })

    // methods
    const init = () => {
      // this.containerHeight = document.querySelector('#home-banner') ? Math.floor(document.querySelector('#home-banner').clientHeight) : 0
      window.addEventListener("scroll", onScroll);
    }
    const onScroll = () => {
      state.containerHeight = document.querySelector("#home-banner")
        ? Math.floor(document.querySelector("#home-banner").clientHeight)
        : 0;
      
      // 控制 header 组件显示与透明度
     
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      state.$store.dispatch("setWindowScrollTop", scrollTop);

      // nav-fixed
      console.log(
        document.querySelector("#home-header").getBoundingClientRect(),
        "1111"
      );
      let navTop = document
        .querySelector("#home-header")
        .getBoundingClientRect().top;
      if (navTop <= 0)
        document.querySelector("#home-header").classList.add("nav-fixed");

      if (state.containerHeight - scrollTop > 0) {
        document.querySelector("#home-header").classList.remove("nav-fixed");
      }

      
      // 控制返回顶部是否显示
      if (scrollTop > state.containerHeight + 300) {
        state.showBackTop = true;
      } else state.showBackTop = false;
    }

    const backTop = (type) => {
      let scrollNumber =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let count = 0;
      count = type === "bottom" ? 15 : 20;
      let offset = Math.abs(
        Math.floor((scrollNumber - state.containerHeight) / count)
      );
      state.scrollTime = setInterval(() => {
        console.log(state.containerHeight);
        if (type === "bottom") {
          scrollNumber += offset;
          window.scrollTo(0, scrollNumber);
          console.log(
            scrollNumber,
            state.containerHeight,
            scrollNumber >= state.containerHeight
          );
          if (scrollNumber >= state.containerHeight) {
            window.scrollTo(0, state.containerHeight + 1);
            clearInterval(state.scrollTime);
          }
        } else {
          if (scrollNumber <= offset + state.containerHeight) {
            clearInterval(state.scrollTime);
            window.scrollTo(0, state.containerHeight + 1);
          } else {
            scrollNumber -= offset;
            console.log(scrollNumber, "scrollNumberscrollNumber");
            window.scrollTo(0, scrollNumber);
          }
        }
      }, 10);
    }


    init();

    return {
      ...state.state,
      onScroll,
      backTop,
      showBanner
    }
  }

  // watch: {
  //   $route: {
  //     handler: function(to, from){
  //       if (state.routeNameList.includes(to.name)) {
  //         state.containerHeight = 0
  //         return
  //       }
  //       state.containerHeight = Math.floor(document.querySelector('#home-banner').clientHeight)
  //     },
  //     // 深度观察监听
  //     deep: true
  //   }
  // },
  //  beforeRouteUpdate (to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  //   console.log(to, from, '路由信息1111')
  // },
  /* watch: {
    $route() {
      window.scrollTo(0, 0);
      if (!state.routeNameList.includes(route.name)) {
        document.querySelector("#home-header").classList.remove("nav-fixed");
      }
    },
  }, */
});
</script>
<style lang="scss" type="text/scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  transform: translateY(60px);
}

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
    color: $color-primary;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>
