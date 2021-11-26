<template>
  <div id="home">
    <div class="back-img"></div>
    <div class="home-contariner">
      <div class="contariner-left">
        <div
          class="article-item hover-shadow contariner-box wow bounceInLeft"
          v-for="item in 30"
          :key="item"
          data-wow-duration="1s"
          :data-wow-delay="`0.1s`"
        >
          <div class="noveltext">
            对林椿来说，一切都是那么的新鲜。<br /><br />
            学校大了好多，课程也多了好多，一切的一切，都充满活力又富有挑战性。刚刚告别了小学生活，现在的自己，已经是初一新生。<br /><br />
            也多了一批新的伙伴。放学的时候，三五个背着书包的男生在学校里并排走，聊着大家都感兴趣的话题，嘻嘻哈哈，欢声笑语撒了一路。<br /><br />
            出了校门，跟伙伴道别的那一刻，忽然感觉到脸上被滴了一滴水。一摸，手上真的有水。<br /><br />
            抬头看天，看来要下雨了。<br /><br />
            家离学校不远也不近，林椿加快了步伐。要赶在大雨来临之前回到家。反正身上不能被淋湿就对了。<br /><br />
            回家的路上，经过一家商店。林椿被里面的物事吸引。上中学之后，父母给零花钱的次数多了，金额也大了。爸爸说，该好好给零花钱了，要学会管理自己的小金库。所以，想着身上有足够的零花钱，林椿底气十足地进了商店。<br /><br />
            下雨也不管了，男孩子淋点雨又没什么。哪那么娇气。<br /><br />
            林椿心满意足地带着买来的玩具和小零食离开。一边走，一边玩，心思全都集中在自己手上的东西。<br /><br />
            但是，雨真的越下越大了。大得不能像之前任性地想着淋湿拉倒。只好急急找地方躲雨。<br /><br />
            那是一个庞大的建筑物的棚子。已经有一个女孩在那里。除了她，没有别人。<br /><br />
            林椿就这样跟一个陌生女孩在一个棚子下躲雨。<br /><br />
            雨水哗啦啦地下。林椿想着等雨小一点再飞奔回家。结果越等雨声越大，说明下得越来越大。林椿顿时倒吸一口凉气。<br /><br />
            还要等多久才能回去？这是越等越久的节奏啊！<br /><br />
            白茫茫的天。雨水哗啦哗啦。天色越来越暗。<br /><br />
          </div>
        </div>

      </div>
      <div class="contariner-right">
        <div
          class="info-my hover-shadow contariner-box wow bounceInRight"
          data-wow-duration="1s"
          data-wow-delay="1s"
        >
          <img class="cover" :src="headPortrait" alt="头像" />
          <p class="username">{{ $t("info.username")}}</p>
          <div class="essential-info">
            <!-- <p class="info-title">
              <span class="iconfont"></span>
              基本信息
            </p> -->
            <p class="info-item">
              <span class="label iconfont yxrgongzuotai"></span>
              <span class="value">{{ $t("info.workYear") }}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxrdianhua"></span>
              <span class="value">{{ $t("info.phone") }}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxryouxiang"></span>
              <span class="value">{{ $t("info.email") }}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxrdizhi"></span>
              <span class="value">{{ $t("info.address") }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      // headPortrait: require("../../assets/images/headPortrait.jpg"),
    };
  },
  mounted() {},
  methods: {
    homeScroll() {
      console.log(
        document.querySelector(".info-my").clientHeight,
        "document.querySelector('.info-my')"
      );
    },
  },
};
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
    background: url("../../assets/images/homebg.svg") 50% / cover no-repeat;
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
          transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
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
    transition: all 0.3s;
    &:hover {
      box-shadow: 0 0 15px $color-hover-shadow;
    }
  }
}
</style>
