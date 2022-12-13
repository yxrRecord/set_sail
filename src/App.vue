<template>
  <router-view></router-view>
</template>

<script setup>
import {nextTick, onMounted, reactive, toRefs, watch} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
const store = useStore();
const route = useRoute();
const state = reactive({
  model: 'haru_1',
})
/* meyhods */
const live2dInit = () => {
  /**
   *  list
   *  1.https://unpkg.com/live2d-widget-model-chitose@1.0.5/assets/chitose.model.json
      2.https://unpkg.com/live2d-widget-model-haruto@1.0.5/assets/haruto.model.json
      3.https://unpkg.com/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json
      4.https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json
      5.https://unpkg.com/live2d-widget-model-izumi@1.0.5/assets/izumi.model.json
      6.https://unpkg.com/live2d-widget-model-koharu@1.0.5/assets/koharu.model.json
      7.https://unpkg.com/live2d-widget-model-miku@1.0.5/assets/miku.model.json
      8.https://unpkg.com/live2d-widget-model-nico@1.0.5/assets/nico.model.json
      9.https://unpkg.com/live2d-widget-model-nipsilon@1.0.5/assets/nipsilon.model.json
      10.https://unpkg.com/live2d-widget-model-nito@1.0.5/assets/nito.model.json
      11.https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json
      12.https://unpkg.com/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json
      13.https://unpkg.com/live2d-widget-model-tsumiki@1.0.5/assets/tsumiki.model.json
      14.https://unpkg.com/live2d-widget-model-unitychan@1.0.5/assets/unitychan.model.json
      15.https://unpkg.com/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json
      16.https://unpkg.com/live2d-widget-model-z16@1.0.5/assets/z16.model.json
    *  */
  if (window && window.L2Dwidget) {
    window.L2Dwidget.init({
      pluginRootPath: 'static/live2dw/',
      pluginJsPath: 'lib/',
      pluginModelPath: `live2d-widget-model-${state.model}/assets/`,
      tagMode: false,
      debug: false,
      model: {
        jsonPath: `../../../assets/script/live2dw/live2d-widget-model-${state.model}/assets/${state.model}.model.json`,
      },
      display: { position: 'right', width: 150, height: 300 },
      mobile: { show: true },
      log: false,
    })
  }
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
    // live2dInit()
  })
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
