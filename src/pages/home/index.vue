<template>
  <div id="home">
    <div class="back-img"></div>
    <div class="home-contariner">
      <div class="contariner-left">
        <div
          class="article-item hover-shadow contariner-box animate__animated"
          v-for="item in 30"
          :key="item"
        >
          <div class="noveltext">
            对林椿来说，一切都是那么的新鲜。<br /><br />
            学校大了好多，课程也多了好多，一切的一切，都充满活力又富有挑战性。刚刚告别了小学生活，现在的自己，已经是初一新生。<br /><br />
            也多了一批新的伙伴。放学的时候，三五个背着书包的男生在学校里并排走，聊着大家都感兴趣的话题，嘻嘻哈哈，欢声笑语撒了一路。<br /><br />
          </div>
        </div>
      </div>
      <div class="contariner-right" v-loadAni="'animate__slideInRight'">
        <Hot class="hover-shadow contariner-box animate__animated hot-fixed" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onDeactivated, onMounted, onBeforeMount, reactive, ref } from "vue";
import { getUserListApi } from "@api/user";
import Hot from "./component/Hot.vue";
const io = ref<IntersectionObserver>();

// methods
const init = () => {
  io.value = new IntersectionObserver((entries) => {
    entries.forEach((item) => {
      if (item.intersectionRatio > 0) {
        // 添加类名
        item.target.classList.add("animate__slideInLeft");
        io.value?.unobserve(item.target);
      }
    });
  });
  const doms = document.querySelectorAll(".article-item");
  doms.forEach((dom) => io.value?.observe(dom));
};

const getData = async () => {
  let res = await getUserListApi();
  console.log(res);
};
onBeforeMount(() => {
  console.log("onBeforeMount");
});
onMounted(() => {
  init();
  getData();
});

onDeactivated(() => {
  io.value?.disconnect();
});
</script>

<style lang="scss" type="text/scss" scoped>
.block {
  transition: all 0.3s;
}

@import "./index.scss";
@import "./table.scss";
</style>
