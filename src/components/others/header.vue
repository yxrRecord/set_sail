<template>
  <header id="home-header">
    <div class="header-main">
      <div class="header-left">
        <slot name="left"></slot>
        <h1 class="iconfont yxrlunchuan logo"></h1>
      </div>
      <div class="header-right">
        <ul class="header-right-con">
          <li class="menu-item pointer" v-for="(item, index) in menuList" :key="item.name" @click="jumpPage(item)" :class="[`menu-item-${index + 1}`, routeName === item.url ? 'currentPage' : '']">
            <span :class="['menu-icon', 'iconfont']" v-if="item.iconfont"></span>
            <span >
              {{item.name}}
            </span>
          </li>
          <li class="dot"></li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
  import { computed, defineComponent, onMounted, toRefs, reactive, getCurrentInstance, nextTick } from 'vue';
  import { useRoute, useRouter, RouteLocationNormalized } from "vue-router";
  import { useStore } from 'vuex';
  import { useI18n } from 'vue-i18n';
  import { Menu } from '@types'
  export default defineComponent({
    name: "Header",
    setup() {
      // const { proxy } = getCurrentInstance();
      const { t } = useI18n();
      const route: any = useRoute();
      const router = useRouter();
      const store = useStore();
      const state = reactive({
        routeNameList: ['skill', 'work', 'project', 'about'],
        routeName: 'home',
      })

      // computed
      const menuList = computed<Menu[]>((): Menu[] => {
        let list: Menu[] = [{ icon: '1', name: 'Home', hover: false, url: 'home'},
          { icon: '1', name: 'Tags', hover: false, url: 'skill'},
          { icon: '1', name: 'Work', hover: false, url: 'work'},
          { icon: '1', name: 'Project', hover: false, url: 'project'},
          { icon: '1', name: 'About', hover: false, url: 'about'}];
        list.forEach((item, index) => item.name = t('menuList', index))
        return list
      })

      const showNavBar = computed(() => {
        return store.getters.appInfo.showNavBar
      })

      // mounted
      const jumpPage = (item: Menu) => {
        if (route.name !== item.name) {
          sessionStorage.setItem('currentRoute', item.url)
          state.routeName = item.url
          store.dispatch('setShowBanner', !state.routeNameList.includes(item.url))
          store.dispatch('setShowNavBar', false)
          router.push({
            name: item.url
          })
        }
      }

      onMounted(() => {
        sessionStorage.setItem('currentRoute', route.name);
        state.routeName = route.name;
        store.dispatch('setShowBanner', !state.routeNameList.includes(route.name));
        store.dispatch('setShowNavBar', state.routeNameList.includes(route.name));
      })
      return {
        ...toRefs(state),
        jumpPage,
        menuList,
        showNavBar,
        t
      }
    }
  })
</script>

<style lang="scss" type="text/scss" scoped>
$offsetW: 120px;
#home-header {
  height: 50px;
  width: 100%;
  background-color: $color-gray;
  background-size: 50%;
  box-shadow: 0 5px 10px $color-hover-shadow;
  z-index: 999;
  position: sticky;
  top: 0;
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
    flex: 1;
    .header-right-con {
      color: $color-grayf;
      display: flex;
      position: relative;
      overflow: hidden;
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
      &:hover {
        color: $color-primary;
      }
    }

    .currentPage {
      position: relative;
      color: $color-primary;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: $color-primary;
      }
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