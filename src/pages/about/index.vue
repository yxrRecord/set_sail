<template>
  <div id="about">
    <section class="info-me">
      <div class="basic-info contariner-box hover-shadow">
        <img class="cover" :src="headPortrait" alt="头像">
        <h2>你若成风</h2>
        <p class="info-item" v-for="item in infoList" :key="item.label">
          <span class="label">{{item.label}}：</span>
          <span class="value">{{item.value}}</span>
        </p>
        <div class="website">
          <div class="item-website" v-for="item in menu" :key="item.name" :class="[item.class]" @click="linkTo(item)">
            <span class="icon iconfont pointer" v-if="item.icon" :class="[item.icon]"></span>
            <span v-else class="icon-text pointer">{{item.text}}</span>
          </div>
        </div>
        
      </div>

      <div class="tags contariner-box hover-shadow">
        <h2>标题</h2>
        <div class="progress-all">
          <div v-for="item in skillList" :key="item.name" class="progress-item">
            <p class="progress-text">
              <span>{{item.name}}</span>
              <span></span>
            </p>
            <div class="progress-bar">
              <!-- // v-if="item.number" -->
              <p  class="color-progress-bar" :style="`background: ${item.color};width: ${item.number}%`"></p>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="interest contariner-box hover-shadow">
      <h2>标题</h2>
      <div class="aihao">

      </div>
      <div class="aihao aihao-swiper-box">
        <!-- <div v-for="item in></div> -->
      </div>
      <div class="aihao"></div>
    </section>
  </div>
</template>

<script>
// import Swiper from 'swiper';
export default {
  name: 'about',
  data() {
    return {
      headPortrait: require('../../assets/images/headPortrait.jpg'),
      menu: [
        { name: '微信', icon: 'yxrweixin1', class: 'weChat'},
        { name: 'QQ', icon: 'yxrqq1', class: 'QQ'},
        { name: 'github', icon: 'yxrgithub', class: 'github', url: 'https://github.com/chengfeng12'},
        { name: '简书', text: "简", url: 'https://www.jianshu.com/u/2393f89ea090', class: 'jianshu', },
        { name: '掘金', text: "掘", url: 'https://juejin.cn/user/3825956195413806', class: 'juejin'},
      ],
      infoList: [
        { label: '性别', value: '男'},
        { label: '年龄', value: '24岁'},
        { label: '工作经验', value: '2年+'},
        { label: '家乡', value: '河南-驻马店'},
        { label: '现居住地', value: '上海静安'},
        { label: '联系电话', value: '15638331203'},
        { label: '邮箱', value: '913457727\@qq.com'},
      ],
      skillList: [
        {
          name:'HTML',
          number: 0,
          color: '#FE4365',
          class: ''
        },
        {
          name:'CSS',
          number: 0,
          color: '#FC9D9A',
          class: ''
        },
        {
          name:'JavaScript',
          number: 0,
          color: '#F9CDAD',
          class: ''
        },
        {
          name:'Vue',
          number: 0,
          color: '#4F953B',
          class: ''
        },
        {
          name:'NodeJs',
          number: 0,
          color: '#CFF09E',
          class: ''
        },
        {
          name:'MySQL',
          number: 0,
          color: '#A3DAFF',
          class: ''
        },
      ],
      musicList: [
        {
          image: require('../../assets/images/headPortrait.jpg'),
          name: '名字1',
          src: require('../../assets/images/headPortrait.jpg'),
          author: ''
        },
        {
          image: require('../../assets/images/headPortrait.jpg'),
          name: '名字2',
          src: require('../../assets/images/headPortrait.jpg'),
          author: ''
        },
        {
          image: require('../../assets/images/headPortrait.jpg'),
          name: '名字3',
          src: require('../../assets/images/headPortrait.jpg'),
          author: ''
        },
      ]
    }
  },
  mounted() {
    this.$ajaxPost({
      url: 'get/GetMsg?',
      data: {
        page: 0
      },
      method: 'get'
    }, false, res => {
      console.log('返回了', res.data)
    })

    setTimeout(() => {
      this.skillList = [
        {
          name:'HTML',
          number: 90,
          color: '#FE4365',
          class: ''
        },
        {
          name:'CSS',
          number: 90,
          color: '#FC9D9A',
          class: ''
        },
        {
          name:'JavaScript',
          number: 80,
          color: '#F9CDAD',
          class: ''
        },
        {
          name:'Vue',
          number: 80,
          color: '#4F953B',
          class: ''
        },
        {
          name:'NodeJs',
          number: 55,
          color: '#CFF09E',
          class: ''
        },
        {
          name:'MySQL',
          number: 33,
          color: '#A3DAFF',
          class: ''
        },
      ]
    }, 500)

    // new Swiper('.aihao-swiper-box', {
    //   slidesPerView: "auto",//每页显示数量，auto为自动填充，3为每页显示3块
    //   centeredSlides: true,//轮播图自动居中
    //   spaceBetween: 20,//轮播图左右之间的间距，配合css样式中的width实现效果
    //   initialSlide: 1, //轮播图初始下标位置
    //   //方法事件
    //   on: {
    //    //回调函数，swiper从当前slide开始过渡到另一个slide时执行
    //     slideChangeTransitionStart: function() {
    //        console.log('点击了')
    //     }
    //   }
    // })
  },
  methods: {
    linkTo({ url }) {
      if (url) window.open(url)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
#about {
  width: 65%;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  z-index: 2;
  background-color: #fff;
  .contariner-box {
    position: relative;
    border-radius: 10px;
    padding: 20px;
  }
  .hover-shadow {
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 10px 20px $color-hover-shadow;
    transition: all .3s;
    &:hover {
      box-shadow:  21px 21px 42px #bfbfbf, 
             -21px -21px 42px #ffffff;
    }
  }

  .info-me {
    display: flex;
    justify-content: space-between;
  }
  .basic-info {
    // width: 35%;
    img {
      border-radius: 50%;
      width: 110px;
      height: 110px;
      margin: 0 auto;
      display: block;
      margin-top: 20px;
    }
    h2 {
      text-align: center;
      font-size: 18px;
      letter-spacing: 2px;
      margin-top: 15px;
      padding-bottom: 30px;
      border-bottom: 1px solid $color-border;
       margin-bottom: 20px;
    }
    .info-item {
      line-height: 1.6em;
      margin: 3px;
    }
    .label {
      font-size: 16px;
      font-weight: 600;
      margin-right: 10px;
      letter-spacing: 1px;
      font-family: '方正小标宋简体';
    }
    .value {
      font-size: 16px;
      letter-spacing: 1px;
      color: #444;
    }

    .QQ {
      color: #1ADCFB;
    }
    .weChat {
      color: #07C160;
    }
    .github {
      color: #24292E;
    }
    .jianshu {
      color: #EA6F5A;
      font-weight: 600;
      font-family: '方正小标宋简体';
    }
    .juejin {
      color: #007FFF;
      font-weight: 600;
      font-family: '方正小标宋简体';
    }

    /* 图标 */
    .website {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .item-website {
        margin: 15px 10px;
        span {
          display: inline-block;
          font-size: 20px;
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          border-radius: 13px;
          background: linear-gradient(145deg, #e6e6e6, #ffffff);
          box-shadow:  8px 8px 16px #cccccc, 
                      -8px -8px 16px #ffffff;
          transition: all .5s;
          &:hover {
            background: linear-gradient(145deg, #ffffff, #e6e6e6);
            box-shadow:  7px 7px 23px #b8b8b8, 
                        -7px -7px 23px #ffffff;
          }
        }
      }
      
    }
  }

  .tags {
    // width: 60%;
    flex: 1;
    margin-left: 40px;
    .progress-all {
      .progress-item {
        margin: 10px 0;
        /* 进度条底色 */
        .progress-bar {
          margin: 10px 0;
          height: 20px;
          width: 100%;
          background-color: #eee;
          border-radius: 8px;
          overflow: hidden;
          box-shadow:  7px 7px 23px #f0f0f0, 
             -7px -7px 23px #ffffff;
        }
        .color-progress-bar {
          width: 0;
          height: 20px;
          border-radius: 8px;
          transition: all 1s;
        }
      }
    }
  }
  .tags>h2, 
  .interest>h2 {
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }

  .interest {
    margin-top: 30px;
    h2 {

    }
  }
}
</style>