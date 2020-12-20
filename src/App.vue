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
  mounted() {
    document.querySelectorAll('title')[0].innerHTML = this.$store.state.appInfo.appName
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
