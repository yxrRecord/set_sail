<template>
<!-- @scroll="onScroll" -->
  <div class="common-layout-wrapper" >
    <HomeBanner @backTop="backTop" />
    <Header :showValue="headerShowValue"  />
    <transition name="fade">
      <div v-show="showBackTop" class="back-top iconfont yxricon-test" :class="{'an-back-top': showBackTop}" key="back-top" @click="backTop"></div>
    </transition>
    <!-- :style="{ marginTop:  headerShowValue > 0 ? `${headerHeight}px` : '0'}" -->
    <div style="margin-top: 80px">
      <router-view></router-view>
    </div>
    
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
      showBackTop: false,
      headerHeight: 1
    }
  },
  components: {
    Header,
    HomeBanner
  },
  mounted() {
    this.containerHeight = Math.floor(document.querySelector('.common-layout-wrapper').clientHeight)
    document.querySelector('.common-layout-wrapper').addEventListener('scroll', this.onScroll)
    
  },
  methods: {
    onScroll(e) {
      // console.log(e.target.scrollTop, this.containerHeight, this.headerHeight, 'eeeeeee')
      console.log(this.containerHeight, 'this.containerHeight')
      /* 
        控制 header 组件显示与透明度
      */
      let scrollTop = e.target.scrollTop
      if (this.containerHeight - scrollTop <= this.headerHeight) {
        this.headerShowValue += 0.1
        this.$nextTick(() => {
          this.headerHeight = document.querySelector('#home-header').clientHeight
        })
      } else this.headerShowValue = 0
      /* 
        控制返回顶部是否显示
      */
      if (scrollTop > this.containerHeight + 300) {
        this.showBackTop = true
      } else this.showBackTop = false
    },
    backTop() {
      let scrollNumber = document.querySelector('.common-layout-wrapper').scrollTop
      let offset = Math.abs(Math.floor((scrollNumber - this.containerHeight) / 20))
      // console.log(offset, 'offset')
      this.scrollTime = setInterval(() => {
        if (scrollNumber - this.containerHeight < 0) {
          scrollNumber += offset
          document.querySelector('.common-layout-wrapper').scrollTop = scrollNumber
          console.log(scrollNumber, this.containerHeight, scrollNumber >= this.containerHeight)
          if (scrollNumber >= this.containerHeight) {
            document.querySelector('.common-layout-wrapper').scrollTop = this.containerHeight + 1
            clearInterval(this.scrollTime)
          }
        }  else {
          if (scrollNumber <= this.containerHeight) {
            clearInterval(this.scrollTime)
            document.querySelector('.common-layout-wrapper').scrollTop = this.containerHeight + 1
          } else {
            scrollNumber -= offset
            document.querySelector('.common-layout-wrapper').scrollTop = scrollNumber
          }
        }
      }, 10)
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
