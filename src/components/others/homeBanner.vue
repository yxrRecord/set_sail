<template>
  <header id="home-banner" class="banner">
    <section class="banner-box" :style="`background-image: url(${currentImg})`">
      <!-- <img :src="bannerList[0]" alt=""> -->
      <!-- <div class="binner-item" :class="{'current-binner-item': currentBannerIndex === index}" v-for="(item, index) in bannerList" :key="index">
          <img :src="item" alt="">
        </div> -->
    </section>
    <Banner class="canvas-banner"/>
    <div class="copywriting">
      <h2 class="hello-text">你 若 成 风 YXR</h2>
      <p class="edit-text-box word-wrap">
        <span class="text-before">/* </span>
        <span class="edit-text">{{ state.showMessage }}</span>
        <span class="fade-away line-beat">|</span>
        <span class="text-after"> */</span>
      </p>
    </div>
    <div class="home-bottom-link pointer" @click="$emit('backTop', 'bottom')">
      <p>
        <span class="iconfont yxrfanhui1"></span>
      </p>
    </div>
  </header>
</template>
<script lang="ts" setup>
import {
  ref,
  onMounted,
  reactive,
  nextTick,
} from "vue";
import Banner from "@components/others/Banner.vue";
import currentImg from '@assets/images/banner1.jpg'
import Tools from "@tools";

const state = reactive({
  text: [
    "你活着的每一天都是之后日子里最年轻的时候。",
    "即使道路坎坷不平，车轮也要前进；即使江河波涛汹涌，船只也航行。",
    "问候不必须要慎重其事，但必须要真诚感人。",
  ],
  showMessage: "",
  currentIndex: 0,
  type: 1,
  timer: null as number | null,
  bannerList: [],
  bannerTime: null as number | null,
  currentBannerIndex: 0,
});
onMounted(() => {
  nextTick(() => {
    const dom: HTMLCollectionOf<Element> =
        document.getElementsByClassName("hello-text");
    Tools.setTextAnimate(dom["0"] as HTMLElement, 0.1);
    beginTextAnimate();
  });
});

// methods
const init = () => {
  const dom: HTMLElement = document.getElementsByClassName(
      "banner-box"
  )[0] as HTMLElement;
  const width: string = document
      .querySelectorAll(".banner")[0]
      .getClientRects()[0]
      .width?.toFixed(0);

  if (state.bannerTime) clearInterval(state.bannerTime);

  state.bannerTime = setInterval((item: any) => {
    dom.style.transform = `translateX(-${
        state.currentBannerIndex * Number(width)
    }px)`;
    if (state.currentBannerIndex > state.bannerList.length - 1) {
      setTimeout(() => {
        dom.classList.remove("transition-box");
      }, 1000);
    } else {
      dom.classList.add("transition-box");
    }
    state.currentBannerIndex++;
    if (state.currentBannerIndex > state.bannerList.length - 1) {
      // setTimeout(() => {
      //   dom.classList.remove('transition-box')
      // }, 1000)
      dom.classList.remove("transition-box");
      state.currentBannerIndex = 0;
    }
  }, 3000);
};

const beginTextAnimate = () => {
  if (state.type === 1) {
    addText();
  } else {
    removeText();
  }
};
const addText = (time = 200) => {
  let text = state.text[state.currentIndex].split("");
  let textLen = text.length,
      tempText: string[] = [];
  let index = 0;
  state.timer = setInterval(() => {
    tempText.push(text[index]);
    state.showMessage = tempText.join("");
    index++;
    if (index >= textLen) {
      if (state.timer) clearInterval(state.timer);

      setTimeout(() => {
        removeText();
      }, 600);
    }
  }, time);
};

const removeText = (time = 100) => {
  let tempText: string[] = state.text[state.currentIndex].split(""),
      index: number = state.showMessage.length;

  if (state.timer) clearInterval(state.timer);

  state.timer = setInterval(() => {
    if (tempText.length && index >= 0) {
      tempText.pop();
    }
    state.showMessage = tempText.join("");
    index--;
    if (index <= 0) {
      state.currentIndex++;
      if (state.currentIndex >= state.text.length) {
        state.currentIndex = 0;
      }
      if (state.timer) clearInterval(state.timer);
      addText();
    }
  }, time);
};
</script>
<style lang="scss" type="text/scss" scoped>
.banner {
  position: relative;
  height: 100vh;
  width: 100%;
  z-index: 99;

  /* 背景图片 */
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .banner-box {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    background-color: transparent;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
  }

  /* canvas */
  .canvas-banner {
    position: absolute;
    z-index: 2;
  }

  .transition-box {
    transition: all 1s;
  }

  /* 背景图部分 文字 */
  .copywriting {
    position: absolute;
    width: 50%;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;

    h2 {
      font-size: 40px;
      color: $color-grayf;
      text-align: center;
    }

    .hello-text {
      font-family: "qianduKaiTI";
      letter-spacing: 2px;
    }

    .edit-text-box {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-top: 30px;
      letter-spacing: 4px;
      font-family: "方正小标宋简体";
      line-height: 30px;
      color: $color-grayf;
      white-space: nowrap;

      .text-before {
        margin-right: 10px;
      }

      .text-after {
        margin-left: 10px;
      }

      .line-beat {
        margin-left: 10px;
        font-size: 16px;
      }

      .edit-text {
        white-space: nowrap;
      }
    }
  }

  /* 按钮 链接 */
  .home-bottom-link {
    position: absolute;
    left: 50%;
    bottom: 20px;
    width: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 10;

    p {
      line-height: 40px;
      animation: topBottom 2s linear infinite;
    }

    .iconfont {
      display: inline-block;
      color: $color-grayf;
      font-size: 20px;
      transform: rotateZ(-90deg);
      font-weight: 600;
    }
  }
}

@keyframes topBottom {
  0% {
    margin-bottom: 20px;
    opacity: 1;
  }
  50% {
    margin-bottom: 40px;
    opacity: 0.7;
  }
  100% {
    margin-bottom: 20px;
    opacity: 1;
  }
}
</style>
