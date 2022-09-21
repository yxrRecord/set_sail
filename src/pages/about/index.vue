<template>
  <div id="about">
    <section class="info-me">
      <div class="basic-info contariner-box hover-shadow">
        <img class="cover" src="../../assets/images/headPortrait.jpg" alt="头像" />
        <h2>你若成风</h2>
        <p class="info-item" v-for="item in state.infoList" :key="item.label">
          <span class="label">{{ item.label }}：</span>
          <span class="value">{{ item.value }}</span>
        </p>
        <div class="website">
          <div
            class="item-website"
            v-for="item in state.menu"
            :key="item.name"
            :class="[item.class]"
            @click="linkTo(item)"
          >
            <span
              class="icon iconfont pointer"
              v-if="item.icon"
              :class="[item.icon]"
            ></span>
            <span v-else class="icon-text pointer">{{ item.text }}</span>
          </div>
        </div>
      </div>

      <div class="tags contariner-box hover-shadow">
        <h2>标题</h2>
        <div class="progress-all">
          <div v-for="item in state.skillList" :key="item.name" class="progress-item">
            <p class="progress-text">
              <span>{{ item.name }}</span>
              <span></span>
            </p>
            <div class="progress-bar">
              <p
                class="color-progress-bar"
                :style="`background: ${item.color};width: ${item.number}%`"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="interest contariner-box hover-shadow">
      <h2>标题</h2>
      <div class="aihao"></div>
      <div class="aihao aihao-swiper-box">
        <!-- <div v-for="item in></div> -->
      </div>
      <div class="aihao"></div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, toRefs, ref, reactive, onMounted } from "vue";
import musicimg1 from '@assets/images/headPortrait.jpg';
interface MenuType {
  name: string
  icon: string
  text?: string
  url?: string
  class?: string
}
const state = reactive({
  menu: [
    { name: "微信", icon: "yxrweixin1", class: "weChat" },
    { name: "QQ", icon: "yxrqq1", class: "QQ" },
    {
      name: "github",
      icon: "yxrgithub",
      class: "github",
      url: "https://github.com/chengfeng12",
    },
    {
      name: "简书",
      text: "简",
      url: "https://www.jianshu.com/u/2393f89ea090",
      class: "jianshu",
    },
    {
      name: "掘金",
      text: "掘",
      url: "https://juejin.cn/user/3825956195413806",
      class: "juejin",
    }
  ] as MenuType[],
  infoList: [
    { label: "性别", value: "男" },
    { label: "年龄", value: "24岁" },
    { label: "工作经验", value: "X年+" },
    { label: "家乡", value: "河南-驻马店" },
    { label: "现居住地", value: "上海静安" },
    { label: "联系电话", value: "XXXXXX" },
    { label: "邮箱", value: "XXXXXX@qq.com" },
  ],
  skillList: [
    {
      name: "HTML",
      number: 0,
      color: "#FE4365",
      class: "",
    },
    {
      name: "CSS",
      number: 0,
      color: "#FC9D9A",
      class: "",
    },
    {
      name: "JavaScript",
      number: 0,
      color: "#F9CDAD",
      class: "",
    },
    {
      name: "Vue",
      number: 0,
      color: "#4F953B",
      class: "",
    },
    {
      name: "NodeJs",
      number: 0,
      color: "#CFF09E",
      class: "",
    },
    {
      name: "MySQL",
      number: 0,
      color: "#A3DAFF",
      class: "",
    },
  ] as {
    name: string
    number: number
    color: string
    class: string
  }[],
  musicList: [
    {
      image: musicimg1,
      name: "名字1",
      src: musicimg1,
      author: "",
    },
    {
      image: musicimg1,
      name: "名字2",
      src: musicimg1,
      author: "",
    },
    {
      image: musicimg1,
      name: "名字3",
      src: musicimg1,
      author: "",
    }
  ],
});

const linkTo = ({ url }: MenuType) => {
  url && window.open(url);
}
onMounted(() => {
  state.skillList = [
    {
      name: "HTML",
      number: 90,
      color: "#FE4365",
      class: "",
    },
    {
      name: "CSS",
      number: 90,
      color: "#FC9D9A",
      class: "",
    },
    {
      name: "JavaScript",
      number: 80,
      color: "#F9CDAD",
      class: "",
    },
    {
      name: "Vue",
      number: 80,
      color: "#4F953B",
      class: "",
    },
    {
      name: "NodeJs",
      number: 55,
      color: "#CFF09E",
      class: "",
    },
    {
      name: "MySQL",
      number: 33,
      color: "#A3DAFF",
      class: "",
    }
  ];
})
</script>

<style lang="scss" type="text/scss" scoped>
@import "./index.scss";
</style>