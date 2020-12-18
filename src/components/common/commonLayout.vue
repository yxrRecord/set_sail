<template>
<!-- @scroll="onScroll" -->
  <div class="common-layout-wrapper" >
    <HomeBanner />
    <Header :showValue="headerShowValue" />
    <transition name="fade">
      <div v-show="showBackTop" class="back-top iconfont yxricon-test" :class="{'an-back-top': showBackTop}" key="back-top" @click="backTop"></div>
    </transition>
    
    <router-view></router-view>
  </div>
</template>
<script>
import Header from '../others/header'
import HomeBanner from '../others/homeBanner'

export default {
  name: "Layout",
  data() {
    return {
      containerHeight: 0,
      headerShowValue: 0,
      showBackTop: false
    }
  },
  components: {
    Header,
    HomeBanner
  },
  mounted() {
    this.containerHeight = Math.floor(document.querySelector('.common-layout-wrapper').getClientRects()[0].height)
    document.querySelector('.common-layout-wrapper').addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll(e) {
      console.log(e.target.scrollTop, 'eeeeeee')
      /* 
        控制 header 组件显示与透明度
      */
      let scrollTop = e.target.scrollTop
      if (this.containerHeight - scrollTop <= 50) {
        this.headerShowValue += 0.1
      } else this.headerShowValue = 0
      /* 
        控制返回顶部是否显示
      */
      if (scrollTop > this.containerHeight + 300) {
        this.showBackTop = true
      } else this.showBackTop = false
    },
    backTop() {
      document.querySelector('.common-layout-wrapper').scrollTop = this.containerHeight
    }

    
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active, .fade-leave-active {
    // transform: translateY(20px);
    // transform: translateY(-30px);
    transition: all .5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    transform: translateY(60px);
    // bottom: 80px;
}
.common-layout-wrapper {
  user-select: none;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  .back-top {
    position: fixed;
    z-index: 100;
    right: 40px;
    bottom: 80px;
    padding: 5px;
    border-radius: 5px;
    font-size: 26px;
    text-align: center;
    background: #fff;
    color: $color-primary;
    box-shadow: 0 0 10px #ccc;
    // transition: transform .5s ease;
    // transform: translateY(-30px);
  }
  // .an-back-top {
  //   opacity: 1;
  //   transform: translateY(-30px);
  //   // transition: transform .5s ease;
  // }
}


</style>
