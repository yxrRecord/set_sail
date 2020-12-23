<template>
  <div id="home">
    <div class="back-img"></div>
    <div class="home-contariner">
      <div class="contariner-left">
        <div class="article-item hover-shadow contariner-box wow bounceInLeft" v-for="item in 30" :key="item" data-wow-duration="1s" :data-wow-delay="`0.1s`">
          <p>Canvas 的默认宽高是 width: 300 height: 150 可以通过属性的方式设置,也可以在style样式中直接设置,但是这两种设置的方式显示的效果是不一样的,下面我们看下有哪些不一样。&lt;br&gt;</p>
          <p>直接加在属性&lt;br&gt;</p>
          <p>###方法一<br />```<br />&lt;canvas id="canvas" width="500" height="300" style="border:1px solid #d3d3d3;"&gt;&lt;/canvas&gt;</p>
          <p>&lt;script&gt;</p>
          <p>&nbsp; &nbsp; let canvas = document.querySelectorAll("#canvas")[0];</p>
          <p>&nbsp; &nbsp; let ctx = canvas.getContext('2d');</p>
          <p>&nbsp; &nbsp; ctx.moveTo(0, 0);</p>
          <p>&nbsp; &nbsp; ctx.lineTo(200, 150);</p>
          <p>&nbsp; &nbsp; ctx.stroke();</p>
          <p>&lt;/script&gt;<br />```</p>
          <p>显示效果如图所示:</p>
          <p>![image](https://upload-images.jianshu.io/upload_images/14547343-5e4639cbde80b49b?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)</p>
          <p>也可以这样加</p>
          <p>### 方法二<br />```<br />&nbsp; &nbsp;JavaScript</p>
          <p>&lt;canvas id="canvas" style="border:1px solid #d3d3d3;"&gt;&lt;/canvas&gt;</p>
          <p>&lt;script&gt;</p>
          <p>&nbsp; &nbsp; let canvas = document.querySelectorAll("#canvas")[0];</p>
          <p>&nbsp; &nbsp; canvas.width = "500";</p>
          <p>&nbsp; &nbsp; canvas.height = "300";</p>
          <p>&nbsp; &nbsp; let ctx = canvas.getContext('2d');</p>
          <p>&nbsp; &nbsp; ctx.moveTo(0, 0);</p>
          <p>&nbsp; &nbsp; ctx.lineTo(200, 150);</p>
          <p>&nbsp; &nbsp; ctx.stroke();</p>
          <p>&lt;/script&gt;<br />```<br />![image](https://upload-images.jianshu.io/upload_images/14547343-766d70c13afb9f31?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)</p>
        </div>
      </div>
      <div class="contariner-right">
        
        <div class="info-my hover-shadow contariner-box wow bounceInRight" data-wow-duration="1s" data-wow-delay="1s">
          <img class="cover" :src="headPortrait" alt="头像">
          <p class="username">{{$t('home').info.username}}</p>
          <div class="essential-info">
            <!-- <p class="info-title">
              <span class="iconfont"></span>
              基本信息
            </p> -->
            <p class="info-item">
              <span class="label iconfont yxrgongzuotai"></span>
              <span class="value">{{$t('home').info.workYear}}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxrdianhua"></span>
              <span class="value">{{$t('home').info.phone}}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxryouxiang"></span>
              <span class="value">{{$t('home').info.email}}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxrdizhi"></span>
              <span class="value">{{$t('home').info.address}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      headPortrait: require('../../assets/images/headPortrait.jpg')
    }
  },
  mounted() {
  },
  methods: {
    homeScroll() {
      console.log(document.querySelector('.info-my').clientHeight , "document.querySelector('.info-my')")
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
#home {
  width: 65%;
  margin: 0 auto;
  padding: 20px;
  .back-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('../../assets/images/homebg.svg') 50%/cover no-repeat;
    z-index: -1;
  }
  .home-contariner {
    display: flex;
    justify-content: space-between;
  }
  .contariner-box {
    position: relative;
    border-radius: 10px;
    padding: 20px;
    // background: $color-bgf;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      filter: blur(20px);
    }
  }


  .contariner-left {
    width: 70%;
    .article-item {
      margin-bottom: 15px;
      // display: inline-block;
    }
  }

  .contariner-right {
    width: 25%;
    .info-my {
      min-height: 400px;
      padding-top: 30px;
      img {
        border-radius: 50%;
        width: 80px;
        height: 80px;
        margin: 0 auto;
        display: block;

        &:hover {
          transform: rotate(666turn);
          transition-delay: 1s;
          transition-property: all;
          transition-duration: 59s;
          transition-timing-function: cubic-bezier(.34,0,.84,1);
        }
      }
      .username {
        text-align: center;
        font-size: 18px;
        letter-spacing: 2px;
        margin-top: 15px;
        padding-bottom: 30px;
        border-bottom: 1px solid $color-border;
      }

      .essential-info {
        padding: 10px;
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
              color: $color-primary;
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

  .hover-shadow {
    box-shadow: 0 0 10px $color-shadow;
    transition: all .3s;
    &:hover {
      box-shadow: 0 0 15px $color-hover-shadow;
    }
  }
  
}
</style>