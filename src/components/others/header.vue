<template>
  <header id="home-header">
    <div class="header-main">
      <div class="header-left">
        <slot name="left"></slot>
        <h1 class="iconfont yxrlunchuan logo"></h1>
        <ul class="header-con">
          <li
            class="menu-item pointer"
            v-for="(item, index) in menuList"
            :key="item.name"
            @click="jumpPage(item)"
            :class="[
              `menu-item-${index + 1}`,
              state.routeName === item.url ? 'currentPage' : '',
            ]"
          >
            <span
              :class="['menu-icon', 'iconfont']"
              v-if="item.iconfont"
            ></span>
            <span> {{ item.name }} </span>
          </li>
          <li class="dot"></li>
        </ul>
      </div>
      <div class="header-right">
        <div class="avatar-box">
          <img :src="avatar" class="avatar-img" alt="头像" v-show="isLogin" />
          <div class="my-info hover-shadow animate__animated">
            <p class="username">info.username</p>
            <div class="essential-info">
              <p class="info-item">
                <span class="label iconfont yxrgongzuotai"></span>
                <span class="value">info.workYear</span>
              </p>
              <p class="info-item">
                <span class="label iconfont yxrdianhua"></span>
                <span class="value">info.phone</span>
              </p>
              <p class="info-item">
                <span class="label iconfont yxryouxiang"></span>
                <span class="value">info.email</span>
              </p>
              <p class="info-item">
                <span class="label iconfont yxrdizhi"></span>
                <span class="value">info.address</span>
              </p>
            </div>
          </div>
        </div>

        <ul class="header-con" v-show="!isLogin">
          <li class="menu-item pointer" @click="openLogin">Login</li>
        </ul>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter, Router } from "vue-router";
import { useAppStore } from "@store/modules/app";
import { useUserStore } from "@store/modules/user";
import avatar from "@assets/images/headPortrait.jpg";
const appStore = useAppStore();
const userStore = useUserStore();

import { Menu } from "@types";
const route = useRoute();
const router: Router = useRouter();
const state = reactive({
  routeNameList: ["skill", "work", "project", "about"],
  routeName: "home",
});

// computed
const menuList: Menu[] = reactive([
  { icon: "1", name: "Home", hover: false, url: "home" },
  { icon: "1", name: "Tags", hover: false, url: "skill" },
  { icon: "1", name: "Work", hover: false, url: "work" },
  { icon: "1", name: "Project", hover: false, url: "project" },
  { icon: "1", name: "About", hover: false, url: "about" },
]);

const isLogin = computed(() => {
  return userStore.isLogin;
});

// mounted
const jumpPage = (item: Menu) => {
  if (route.name !== item.name) {
    state.routeName = item.url;
    appStore.setShowBanner(!state.routeNameList.includes(item.url));
    router.push({
      name: item.url,
    });
  }
};

const openLogin = () => {
  appStore.showLoginDialog = true;
};

onMounted(() => {
  state.routeName = route.name as string;
  appStore.setShowBanner(!state.routeNameList.includes(state.routeName));
});
</script>

<style lang="scss" type="text/scss" scoped>
$offsetW: 100px;
#home-header {
  height: 50px;
  width: 100%;
  background-color: $color-gray;
  background-size: 50%;
  box-shadow: 0 5px 5px $shadow-hover-color;
  z-index: 999;
  position: sticky;
  top: 0;
  .header-main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    @include flex(space-between, center);
  }
  .header-left {
    height: 100%;
    @include flex(center, center);
    .logo {
      font-size: 26px;
      line-height: 30px;
      padding: 10px 0;
      text-align: center;
      color: $primary-color;
      margin-right: 50px;
    }
  }
  .header-con {
    color: $color-grayf;
    display: flex;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
  }

  .dot {
    position: absolute;
    border-bottom: 3px solid $primary-color;
    min-width: $offsetW;
    left: -$offsetW;
    bottom: 0;
  }

  .menu-item {
    padding: 10px;
    min-width: $offsetW;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    transition: all 0.3s;
    &:hover {
      color: $primary-color;
    }
  }

  .currentPage {
    position: relative;
    color: $primary-color;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: $primary-color;
    }
  }

  .menu-item:nth-child(1):hover ~ .dot {
    left: 0;
    transition: all 0.3s;
  }
  .menu-item:nth-child(2):hover ~ .dot {
    left: $offsetW * 1;
    transition: all 0.3s;
  }
  .menu-item:nth-child(3):hover ~ .dot {
    left: $offsetW * 2;
    transition: all 0.3s;
  }
  .menu-item:nth-child(4):hover ~ .dot {
    left: $offsetW * 3;
    transition: all 0.3s;
  }
  .menu-item:nth-child(5):hover ~ .dot {
    left: $offsetW * 4;
    transition: all 0.3s;
  }
  .menu-item:nth-child(6):hover ~ .dot {
    left: $offsetW * 5;
    transition: all 0.3s;
  }
  .header-right {
    .avatar-box {
      @include flex(center, center);
      position: relative;
      &:hover {
        .avatar-img {
          transform: scale(2.5);
        }
        .my-info {
          transform: translate(-50%, 50px);
          visibility: visible;
        }
      }
    }
    .avatar-img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      transition: all 0.3s;
      transform-origin: 50% 0;
      position: relative;
      z-index: 2;
      cursor: pointer;
    }
    .my-info {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, 40px);
      background-color: #fff;
      box-sizing: border-box;
      padding-top: 30px;
      border: 1px solid #e3e5e7;
      width: 240px;
      border-radius: 5px;
      visibility: hidden;
      box-shadow: 0 0 30px #0000001a;
      padding: 20px;
      transition: transform 0.3s;

      // img {
      //   border-radius: 50%;
      //   width: 80px;
      //   height: 80px;
      //   margin: 0 auto;
      //   display: block;
      //   &:hover {
      //     transform: rotate(666turn);
      //     transition-delay: 1s;
      //     transition-property: all;
      //     transition-duration: 59s;
      //     transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
      //   }
      // }
      .username {
        text-align: center;
        font-size: 18px;
        letter-spacing: 2px;
        margin-top: 20px;
        padding-bottom: 30px;
        border-bottom: 1px solid $border-color;
      }

      .essential-info {
        padding: 16px;
        .info-title {
          font-size: 16px;
          letter-spacing: 1px;
          line-height: 1.3em;
          margin: 10px 0 10px;
        }

        .info-item {
          line-height: 1.7em;
          &:hover {
            .label {
              color: $primary-color;
            }
          }
          .label {
            font-size: 16px;
            color: $color-gray6;
            margin-right: 15px;
            display: inline-block;
          }
          .value {
            font-size: 16px;
            color: $color-gray6;
            margin-right: 10px;
            display: inline-block;
          }
        }
      }
    }
  }
}

@media (max-width: 1000px) {
  #home-header {
    .header-main {
      width: 800px;
      padding: 0 20px;
    }
  }
}

@media (max-width: 800px) {
  #home-header {
    .header-main {
      width: 100%;
      .header-con {
        display: none;
      }
    }
  }
}
</style>
