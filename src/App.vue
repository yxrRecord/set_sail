<template>
  <div id="app">
      <!-- v-slot="{ Component }" -->
    <!-- <transition name="router-fade" mode="out-in"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, reactive, toRefs, watch} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import 'wowjs';
export default defineComponent({
  name: 'App',
  /* watch: {
    $route(to, from) {
      this.$nextTick(() => {
        new this.$wow.WOW({
          // mobile: true,
          live: true,
          // scrollContainer: '.common-layout-wrapper'
        }).init()
      })
    }
  }, */
  setup() {
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      model: 'haru_1',
    })

    /* meyhods */
    const live2dInit = () => {
      // console.log(window.L2Dwidget, 'this.L2Dwidget')
      /* window.L2Dwidget.init({
        pluginRootPath: 'static/live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: `live2d-widget-model-${this.model}/assets/`,
        tagMode: false,
        debug: false,
        model: {
          jsonPath: `../../../assets/script/live2dw/live2d-widget-model-${this.model}/assets/${this.model}.model.json`,
        },
        display: { position: 'right', width: 150, height: 300 },
        mobile: { show: true },
        log: false,
      }) */
    }

    /* watch */
    watch(() => route.path, () => {
      if (window && window?.WOW) {
        const wow = new window.WOW({
          // mobile: true,
          animateClass: 'animated', // 默认值 animated
          boxClass: 'wow', // 默认值 wow
          live: true, // 默认值 true
          // scrollContainer: '.common-layout-wrapper'
        })
        wow.init()
      }
    })
    onMounted(() => {
      document.querySelectorAll('title')[0].innerHTML = store.getters.appInfo.appName;
      nextTick(() => {
        live2dInit()
      })
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style type="text/scss" lang="scss">
    @import '@assets/style/reset.scss';
    @import '@assets/style/access.scss';
    @import '@assets/style/common.scss';
    // ui 库样式
    @import '@assets/style/plugin.scss';
    // @import 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css'
</style>
