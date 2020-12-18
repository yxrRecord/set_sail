<template>
  <section id="home-header" v-if="showValue > 0" :style="{ marginTop:  showValue > 0 ? `${headerHeight}px` : '0'}">
    <div class="header-main">
      <section class="header-left">
        <slot name="left"></slot>
        <h1 class="iconfont yxrduoyuyan logo"></h1>
      </section>
      <section class="header-right">
        <div class="menu-box">
          <div class="menu-item" v-for="item in menuList" :key="item.name">
            <span :class="['menu-icon', 'iconfont']" v-if="item.iconfont"></span>
            <span>
              {{item.name}}
            </span>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
  export default {
    props: {
      showValue: {
        type: Number,
        default: 1
      }
    },
    name: "Header",
    data() {
      return {
        // menuList: [
        //   { icon: '1', name: '首页', eName: 'jummHome', hover: false},
        //   { icon: '1', name: '技能标签', eName: 'jummHome', hover: false},
        //   { icon: '1', name: '工作经验', eName: 'jummHome', hover: false},
        //   { icon: '1', name: '项目经历', eName: 'jummHome', hover: false},
        //   { icon: '1', name: '个人信息', eName: 'jummHome', hover: false},
        // ]
        headerHeight: 0
      }
    },
    computed: {
      menuList() {
        return this.$t('home').menuList
      }
    },
    mounted() {
      // console.log(document.getElementById('#home-header'))
      // this.headerHeight = document.querySelector('#home-header').getClientRects()[0].height
      // console.log(this.headerHeight, 'this.headerHeight')
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: $color-gray;
  
  .header-main {
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-items: center;
    justify-content: space-between;
  } 
  .header-left {
    min-width: 20%;
    margin-right: 120px;
    .logo {
      font-size: 20px;
      line-height: 30px;
      padding: 10px 0;
      text-align: center;
    }
  }
  .header-right {
    color: $color-grayf;
    flex: 1;
    .menu-box {
      display: flex;
      font-size: 16px;
      text-align: center;
      .menu-item {
        padding: 10px;
        min-width: 120px;
        line-height: 30px;
        &:hover {
          background-color: $color-grayf;
          color: $color-gray3;
        }
      }
    }
  }
}
</style>