<template>
<!-- {{$t('home').title}} -->
  <div id="home">
    <div class="home-contariner">
      <div class="contariner-left">
        <div class="article-item hover-shadow contariner-box" v-for="item in 30" :key="item">
          <p>{{item}}</p>
          <p>{{item}}</p>
          <p>{{item}}</p>
          <p>{{item}}</p>
          <p>{{item}}</p>
          <p>{{item}}</p>
          <p>{{item}}</p>
        </div>
      </div>
      <div class="contariner-right">
        <div class="info-my hover-shadow contariner-box">
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
  name: 'Home',
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
  width: 70%;
  margin: 0 auto;
  padding: 20px;
  .home-contariner {
    display: flex;
    justify-content: space-between;
  }
  .contariner-box {
    border-radius: 10px;
    padding: 15px;
    background: $color-bgf;
  }

  .contariner-left {
    width: 70%;
    .article-item {
      margin-bottom: 15px;
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