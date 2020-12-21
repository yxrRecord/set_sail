<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  watch: {
    $route(to, from) {
      this.$nextTick(() => {
        // new WOW({ mobile: true, live: true, scrollContainer: '.common-layout-wrapper' }).init()
        // new WOW({
        //   live: true,
        // }).init()
        // new this.$wow.WOW.init()
      })
    }
  },
  data() {
    return {
      model: 'haru_1',
    }
  },
  mounted() {
    document.querySelectorAll('title')[0].innerHTML = this.$store.getters.appInfo.appName
    // this.$nextTick(() => {
    //   this.live2dInit()
    // })
  },
  methods: {
    live2dInit() {
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
    },
  },
}
</script>

<style lang="scss" type="text/scss">
    @import url('../src/assets/style/reset.scss');
    // 登录样式
    @import url('../src/assets/style/access.scss');
    @import url('../src/assets/style/common.scss');
    // ui 库样式
    @import url('../src/assets/style/plugin.scss');
    // 全局样式
    @import url('../src/assets/style/style.scss');
</style>
