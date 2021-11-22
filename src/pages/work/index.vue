<template>
  <div id="work">
    <div class="back-img"></div>
    <div class="work-contariner">
      <div class="work-experience hover-shadow contariner-box wow" v-for="(item, index) in workList" :key="item.name" data-wow-duration="1s" :data-wow-delay="`${index * 0.2}s`" :class="[index % 2 === 0 ? 'line-left bounceInLeft' : 'line-right bounceInRight']">
        <h2>
          <span class="title">{{item.title}}</span>
          <span class="time">({{item.startTime}}-{{item.endTime}})</span>
        </h2>
        <div class="info">
          <p class="label">工作岗位：</p>
          <p class="value">{{item.post}}</p>
        </div>
        <div class="info">
          <p class="label">工作内容：</p>
          <p class="value">{{item.content}}</p>
        </div>
        <div class="info">
          <p class="label">公司简介：</p>
          <p class="value">{{item.companyProfile}}</p>
        </div>
        <p></p>
      </div>
      <div class="time-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'work',
  data() {
    return {
      workList: [
        {
          title: '中科软科技股份有限公司',
          companyProfile: '中科软科技股份有限公司成立于1996年，2000年10月经国家经贸委、财政部和中国科学院批复改制成为股份有限公司。大型互联网外包公司，所在部门行推本部，对接业务政府业务。',
          content: '在职期间从0到1开发过三个系统，维护过三个系统（包括新功能开发），主要以后台系统为主，包含 Web,App，桌面端应用。',
          startTime: '2019-09-09',
          endTime: '至今',
          post: '前端开发'
        },
        {
          title: '上海道行网络科技有限公司',
          companyProfile: '中科软科技股份有限公司成立于1996年，2000年10月经国家经贸委、财政部和中国科学院批复改制成为股份有限公司。大型互联网外包公司，所在部门行推本部，对接业务政府业务。',
          content: '在职期间从0到1开发过三个系统，维护过三个系统（包括新功能开发），主要以后台系统为主，包含',
          startTime: '2019-04-10',
          endTime: '2019-08-31',
          post: 'web前端'
        },
        {
          title: '上海萌果游戏有限公司',
          companyProfile: '中科软科技股份有限公司成立于1996年，2000年10月经国家经贸委、财政部和中国科学院批复改制成为股份有限公司。大型互联网外包公司，所在部门行推本部，对接业务政府业务。',
          content: '在职期间从0到1开发过三个系统，维护过三个系统（包括新功能开发），主要以后台系统为主，包含',
          startTime: '2018-08-10',
          endTime: '2018-08-10',
          post: 'web前端'
        },
        
      ],
      headPortrait: require('../../assets/images/headPortrait.jpg')
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.time-line {
  position: fixed;
  background-color: #000;
  height: 0px;
  width: 2px;
  top: 0%;
  left: 50%;
  z-index: 10;
  animation: timeLine 1.5s ease-in forwards;
}
/* @keyframes timeLine {
    form {
      height: 0px;
    }
    to {
      height: 100vh;
    }
} */
#work {
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
  .work-contariner {
    position: relative;
    
  }
  .contariner-box {
    position: relative;
    border-radius: 10px;
    padding: 20px;
    margin: 30px;
    width: 45%;
    // &::after {
    //   content: "";
    //   width: 100%;
    //   height: 100%;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   filter: blur(20px);
    // }
  }

  .hover-shadow {
    box-shadow: 0 0 10px $color-shadow;
    transition: all .3s;
    &:hover {
      box-shadow: 0 0 15px $color-hover-shadow;
    }
  }

  .work-experience {
    position: relative;
    h2 {
      font-size: 18px;
      letter-spacing: 1px;
      font-weight: 600;
      font-family: "楷体";
      line-height: 1.4em;
      margin-bottom: 10px;
      .title {
        transition: all .3s;
        &:hover {
          color: $color-primary;
          cursor: pointer;
        }
      }
      .time {
        font-size: 15px;
      }
    }
    .info {
      display: flex;
      line-height: 1.8em;
      .label {
        letter-spacing: 1px;
        white-space: pre-wrap;
        font-size: 15px;
        font-weight: 600;
      }
      .value {
        flex: 1;
        letter-spacing: 1px;
        font-size: 15px;
      }
    }
  }

  .line-left,
  .line-right  {
    &::after {
      content: "";
      position: absolute;
      top: 30px;
      width: 0px;
      height: 0px;
      z-index: -2;
      transition: all .3s;
    }
  }
  .line-left {
    left: 0;
    &::after {
      right: 0px;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
      border-left: 20px solid #fff;
    }

    &:hover::after {
      border-left: 20px solid #ccc;
      right: -20px;
      z-index: 1;
    }
  }

  .line-right {
    left: 50%;
    &::after {
      left: 0px;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
      border-right: 20px solid  #fff;
    }
    &:hover::after {
      border-right: 20px solid #ccc;
      left: -20px;
      z-index: 1;
    }
  }
  
}
</style>