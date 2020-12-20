<template>
  <div id="home-header" v-if="showValue > 0">
    <div class="header-main">
      <div class="header-left">
        <slot name="left"></slot>
        <h1 class="iconfont yxrlunchuan logo"></h1>
      </div>
      <div class="header-right">
        <div class="menu-item pointer" v-for="item in menuList" :key="item.name">
          <span :class="['menu-icon', 'iconfont']" v-if="item.iconfont"></span>
          <span >
            {{item.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      showValue: {
        type: Number,
        default: 1
      },
    },
    name: "Header",
    data() {
      return {}
    },
    computed: {
      menuList() {
        return this.$t('home').menuList
      }
    },
    mounted() {
     
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
#home-header {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: $color-gray;
  // background-color: $color-primary;
  background-image: url('../../assets/images/navGif.gif');
  background-size: 50%;
  box-shadow: 0 0 10px $color-hover-shadow;
  z-index: 999;

  
  .header-main {
    width: 800px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  } 
  .header-left {
    margin-right: 120px;
    height: 100%;
    flex: 1;
    .logo {
      font-size: 26px;
      line-height: 30px;
      padding: 10px 0;
      text-align: center;
      color: $color-primary;
      // background-color: $color-gray;
    }
  }
  .header-right {
    color: $color-grayf;
    flex: 1;
    display: flex;
    .menu-item {
      padding: 10px;
      min-width: 120px;
      line-height: 30px;
      text-align: center;
      font-size: 16px;
      transition: all .3s;
      &:hover {
        background-color: $color-grayf;
        color: $color-gray3;
      }
    }
  }
}
</style>