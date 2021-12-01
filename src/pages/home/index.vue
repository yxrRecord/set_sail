<template>
  <div id="home">
    <div class="back-img"></div>
    2222
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import headPortrait from "@assets/images/headPortrait.jpg";
export default defineComponent({
  name: "home",
  setup() {
    const { t } = useI18n();
    const state = reactive({})

    // methods 
    const homeScroll = () => {
      // console.log(
      //   document.querySelector(".info-my").clientHeight,
      //   "document.querySelector('.info-my')"
      // );
    }

    return {
      ...toRefs(state),
      homeScroll,
      t,
    }
  }
})
</script>

<style lang="scss" type="text/scss" scoped>
@import './index.scss';
</style>
