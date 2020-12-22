<template>
  <div id="home-header">
    <div class="header-main">
      <div class="header-left">
        <slot name="left"></slot>
        <h1 class="iconfont yxrlunchuan logo"></h1>
      </div>
      <div class="header-right">
        <ul class="header-right-con">
          <li class="menu-item pointer" v-for="(item, index) in menuList" :key="item.name" @click="jumpPage(item)" :class="[`menu-item-${index + 1}`]">
            <span :class="['menu-icon', 'iconfont']" v-if="item.iconfont"></span>
            <span >
              {{item.name}}
            </span>
          </li>
          <li class="dot"></li>
        </ul>
    </div>
      </div>
  </div>
</template>
<script>
  export default {
    props: {
      // showValue: {
      //   type: Boolean,
      //   default: false
      // },
    },
    name: "Header",
    data() {
      return {
        routeNameList: ['skill', 'work', 'project', 'about']
      }
    },
    computed: {
      menuList() {
        return this.$t('home').menuList
      },
      showNavBar() {
        return this.$store.getters.showNavBar
      }
    },
    mounted() {
      console.log(this.$route.name, 'this.$route.namethis.$route.namethis.$route.name')
      this.$store.dispatch('setShowBanner', !this.routeNameList.includes(this.$route.name))
      this.$store.dispatch('setShowNavBar', this.routeNameList.includes(this.$route.name))
    },
    methods: {
      jumpPage(item) {
        if (this.$route.name !== item.name) {
          this.$store.dispatch('setShowBanner', !this.routeNameList.includes(item.url))
          this.$store.dispatch('setShowNavBar', false)
          this.$router.push({
            name: item.url
          })
        }
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
$offsetW: 120px;

.nav-fixed {
  position: fixed;
  top: 0;
  left: 0;
}
#home-header {
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
  /*  */
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
    
    flex: 1;
    .header-right-con {
      color: $color-grayf;
      display: flex;
      position: relative;
      overflow: hidden;

      // &::after {
      //   content: "";
      //   position: absolute;
      //   border-bottom: 3px solid $color-primary;
      //   min-width: 120px;
      //   left: 0;
      //   bottom: 0;
      // }

      // &::before {
      //   content: "";
      //   position: absolute;
      //   border-bottom: 3px solid $color-primary;
      //   min-width: 120px;
      //   left: -120px;
      //   bottom: 0;
      //   transition: all .3s;
      // }
    }
    
    .dot {
      position: absolute;
      border-bottom: 3px solid $color-primary;
      min-width: 120px;
      left: -120px;
      bottom: 0;
      
    }

    
    .menu-item {
      padding: 10px;
      min-width: 120px;
      line-height: 30px;
      text-align: center;
      font-size: 16px;
      transition: all .3s;
      // &:hover {
      //   background-color: $color-grayf;
      //   color: $color-gray3;
      // }
    }

    .menu-item:nth-child(1):hover~.dot {
      left: 0;
      transition: all .3s;
    }
    .menu-item:nth-child(2):hover~.dot {
      left: $offsetW * 1;
      transition: all .3s;
    }
    .menu-item:nth-child(3):hover~.dot {
      left: $offsetW * 2;
      transition: all .3s;
    }
    .menu-item:nth-child(4):hover~.dot {
      left: $offsetW * 3;
      transition: all .3s;
    }
    .menu-item:nth-child(5):hover~.dot {
      left: $offsetW * 4;
      transition: all .3s;
    }
    .menu-item:nth-child(6):hover~.dot {
      left: $offsetW * 5;
      transition: all .3s;
    }
  }
}
</style>