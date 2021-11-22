<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import {defineComponent, nextTick, onBeforeMount, reactive, toRefs} from 'vue';
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
    const state = reactive({
      model: 'haru_1',
    })
    /* meyhods */
    const live2dInit = () => {
      console.log(window.L2Dwidget, 'this.L2Dwidget')
      this.L2Dwidget.init({
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
      })
    }

    onBeforeMount(() => {
      // document.querySelectorAll('title')[0].innerHTML = this.$store.getters.appInfo.appName
      //nextTick(() => {
      //   this.live2dInit()
      // })
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style type="text/scss" lang="scss">
    /* @import url('@assets/style/reset.scss');
    // 登录样式
    @import url('@assets/style/access.scss');
    @import url('@assets/style/common.scss');
    // ui 库样式
    @import url('@assets/style/plugin.scss'); */
</style>
