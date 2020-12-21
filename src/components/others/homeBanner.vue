<template>
   <header id="home-banner" class="banner">
     <!--  -->
      <section class="banner-box" :style="`background-image: url(${currentImg})`">
        <!-- <img :src="bannerList[0]" alt=""> -->
        <!-- <div class="binner-item" :class="{'current-binner-item': currentBannerIndex === index}" v-for="(item, index) in bannerList" :key="index">
          <img :src="item" alt="">
        </div> -->
      </section>
      <Banner class="canvas-banner" />
      <div class="copywriting">
        <h2 class="hello-text">  你 若 成 风 YXR  </h2>
        <h2 class="edit-text-box">  
          <p>/* </p>
          <p class="edit-text">{{showMessage}}</p>
          <p class="fade-away line-beat">|</p>
          <p> */</p>
        </h2>
        <!-- <div class="home-button">
          <div class="pointer open-btn" @click="$emit('backTop')">
            点击开启
          <span class="jt iconfont yxrjiantou"></span></div>
        </div> -->
      </div>
      <div class="home-bottom-link pointer" @click="$emit('backTop')">
        <p >
          <span class="iconfont yxrfanhui1"></span>
        </p>
      </div>
    </header>  
</template>
<script>
  import Banner from '../canvas/banner'
  export default {
    name: "homeBanner",
    components: {
      Banner
    },
    data() {
      return {
        text: [
          '你活着的每一天都是之后日子里最年轻的时候。',
          '即使道路坎坷不平，车轮也要前进；即使江河波涛汹涌，船只也航行。',
          '问候不必须要慎重其事，但必须要真诚感人。'
        ],
        showMessage: '',
        currentIndex: 0,
        type: 1,
        timer: null,
        currentImg: require('@/assets/images/banner1.jpg'),
        bannerList: [
          // require('@/assets/images/banner1.jpg'),
          // require('@/assets/images/banner2.jpg'),
          // require('@/assets/images/banner3.jpg'),
          // require('@/assets/images/banner4.jpg'),
          // require('@/assets/images/banner5.jpg'),
          // require('@/assets/images/banner1.jpg'),

          '../../assets/images/banner1.jpg',
        ],
        bannerTime: null,
        currentBannerIndex: 0
      }
    },
    mounted() {
      // this.init()
      this.$nextTick(() => {
        this.$textAnimate(document.querySelectorAll('.hello-text')[0], 0.1)
        this.textAnimate(document.querySelectorAll('.edit-text')[0], 0.1);
      })
    
    },
    methods: {
      init() {
        let dom = document.querySelectorAll('.banner-box')[0],
            width = document.querySelectorAll('.banner')[0].getClientRects()[0].width.toFixed(0)
        if (this.bannerTime) clearInterval(this.bannerTime)
        this.bannerTime = setInterval(item => {
          console.log(this.currentBannerIndex, '1111111111')
          dom.style.transform = `translateX(-${this.currentBannerIndex * width}px)`
          if (this.currentBannerIndex > this.bannerList.length - 1) {
            setTimeout(() => {
              dom.classList.remove('transition-box')
            }, 1000)
          } else {
            dom.classList.add('transition-box')
          }
          this.currentBannerIndex++
          if (this.currentBannerIndex > this.bannerList.length - 1) {
            // setTimeout(() => {
            //   dom.classList.remove('transition-box')
            // }, 1000)
            dom.classList.remove('transition-box')
            this.currentBannerIndex = 0
          }
        }, 3000)
      },

      textAnimate(dom) {
        if (this.type === 1) {
          this.addText()
        } else {
          this.removeText()
        }
      },

      addText(time = 200) {
        let text = this.text[this.currentIndex].split('');
        let textLen = text.length,
            msgLen = this.showMessage.length,
            tempText = []
        let index = 0
        
        this.timer = setInterval(() => {
          tempText.push(text[index])
          this.showMessage = tempText.join('')
          index++
          if (index >= textLen) {
            if (this.timer) clearInterval(this.timer)
            setTimeout(() => {
              this.removeText()
            }, 600);
            
          }
        }, time)
      },
      removeText(time = 100) {
        let text = this.text[this.currentIndex].split('');
        let textLen = text.length,
            msgLen = this.showMessage.length,
            tempText = text
        let index = msgLen

        if (this.timer) clearInterval(this.timer)
        this.timer = setInterval(() => {
          tempText.pop(text[index])
          this.showMessage = tempText.join('')
          index--
          if (index <= 0) {
            this.currentIndex++
            if (this.currentIndex >= this.text.length) {
              this.currentIndex = 0
            }
            if (this.timer) clearInterval(this.timer)
            this.addText()
          }
        }, time)
      }
    }
}
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
    background-color: rgba(0, 0, 0, .2);
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
    // background-image: url('../../assets/images/banner1.jpg');
    
  //   .binner-item {
  //     width: 100vw;
  //     height: 100%;
  //     transition: all 1s;
  //   }
  //   .current-binner-item { }
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
      font-family: 'qianduKaiTI';
      letter-spacing: 2px;
    }
    .edit-text-box {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-top: 30px;
      letter-spacing: 4px;
      font-family: '方正小标宋简体';
      line-height: 30px;
      p {
        &:first-child {
          margin-right: 10px;
        }
        &:last-child {
          margin-left: 10px;
        }
      }
      .line-beat {
        margin-left: 10px;
        font-size: 16px;
      }
    }
    .home-button {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 150px;
      .open-btn {
        text-align: center;
        font-size: 18px;
        padding: 15px 15px;
        border-radius: 30px;
        background-color: $color-grayf;
        color: $color-gray3;
        width: 180px;
        line-height: 20px;
        box-shadow: 0 0 10px #666;
        &:hover {
          background-color: $color-primary;
          color: $color-grayf;
          .jt {
            margin-left: 10px;
            font-size: 20px;
          }
        }
        .jt {
          font-size: 0;
          margin-left: 0;
          transition: all .5s;
          vertical-align: middle;
        }
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