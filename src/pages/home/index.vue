<template>
  <div id="home">
    <div class="back-img"></div>
    <div class="home-contariner">
      <div class="contariner-left">
        <div
          class="article-item hover-shadow contariner-box wow animate__slideInLeft animate__animated"
          v-for="item in 30"
          :key="item"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          <div class="noveltext">
            对林椿来说，一切都是那么的新鲜。<br /><br />
            学校大了好多，课程也多了好多，一切的一切，都充满活力又富有挑战性。刚刚告别了小学生活，现在的自己，已经是初一新生。<br /><br />
            也多了一批新的伙伴。放学的时候，三五个背着书包的男生在学校里并排走，聊着大家都感兴趣的话题，嘻嘻哈哈，欢声笑语撒了一路。<br /><br />
          </div>
        </div>
      </div>
      <div class="contariner-right">
        <div
          class="info-my hover-shadow contariner-box wow animate__bounceInRight animate__animated"
          data-wow-duration="1s"
          data-wow-delay="1s"
        >
          <img class="cover" :src="headPortrait" alt="头像" />
          <p class="username">{{ t("info.username") }}</p>
          <div class="essential-info">
            <p class="info-item">
              <span class="label iconfont yxrgongzuotai"></span>
              <span class="value">{{ t("info.workYear") }}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxrdianhua"></span>
              <span class="value">{{ t("info.phone") }}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxryouxiang"></span>
              <span class="value">{{ t("info.email") }}</span>
            </p>
            <p class="info-item">
              <span class="label iconfont yxrdizhi"></span>
              <span class="value">{{ t("info.address") }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onDeactivated, onMounted, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import headPortrait from "@assets/images/headPortrait.jpg";
export default defineComponent({
  name: "home",
  setup() {
    const { t } = useI18n();
    const state = reactive({});
    const io = ref<IntersectionObserver>();

    // methods 
    const homeScroll = () => {
      // console.log(
      //   document.querySelector(".info-my").clientHeight,
      //   "document.querySelector('.info-my')"
      // );
    }

    onMounted(() => {
      io.value = new IntersectionObserver((entries: IntersectionObserverEntryInit[]) => {
          entries.forEach((item: any) => {
            if (item.intersectionRatio < 0) {
              // 添加类名
              item.target.classList.add('test');
              io.value?.unobserve(item.target);
            }
          })
          console.log(entries, "entries");
        }
      );
      const doms = document.querySelectorAll('.article-item');
      doms.forEach((dom: any) => io.value?.observe(dom));
    })

    onDeactivated(() => {
      io.value?.disconnect();
    })

    return {
      ...toRefs(state),
      homeScroll,
      headPortrait,
      t,
    }
  }
})
</script>

<style lang="scss" type="text/scss" scoped>
.block {
  transition: all .3s;
}
@import './index.scss';
</style>
