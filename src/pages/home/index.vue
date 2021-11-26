<template>
  <div id="home">
    <div class="back-img"></div>
  </div>
</template>

<script lang="ts">
import { defineCustomElement, reactive, ref, toRefs } from 'vue';
import { useI18n } from 'vue-i18n'
export default defineCustomElement({
  name: "home",
  setup() {
    const { t } = useI18n();
    const state = reactive({
      headPortrait: "@assets/images/headPortrait.jpg",
    })

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
