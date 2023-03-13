<template>
  <div class="hot-ranking">
    <h2 class="hot-title">Hot榜 <span class="more">更多</span></h2>
    <div class="hot-item">
      <p class="content-text" v-for="(item, index) in hotList" :key="item.text">
        <span :class="`serial-no ${index <= 2 ? 'serial-no-red' : ''}`">{{
          index + 1
        }}</span>
        <span class="hot-text">{{ item.text }}</span>
      </p>
    </div>

    <div class="update"><span class="iconfont yxrzhongzhi"></span> 换一批</div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ref } from "vue";
let hotList = reactive([
  { text: "测试" },
  { text: "测试" },
  { text: "测试" },
  { text: "测试" },
  { text: "测试" },
]);
</script>

<style lang="scss" type="text/scss" scoped>
.hot-ranking {
  overflow: hidden;
  .hot-title {
    @include flex(space-between, center);
    margin-bottom: 14px;
    font-size: 16px;
    color: $color-gray3;
    .more {
      &:hover {
        cursor: pointer;
        color: $primary-color;
      }
    }
  }
  .hot-item {
  }
  .content-text {
    margin-bottom: 10px;
    font-size: 14px;
    cursor: pointer;
    .hot-text {
      color: $primary-color;
    }
    &:nth-child(1) {
      .serial-no {
        color: #fe2d46;
      }
    }
    &:nth-child(2) {
      .serial-no {
        color: #f60;
      }
    }
    &:nth-child(3) {
      .serial-no {
        color: #faa90e;
      }
    }
    .serial-no {
      font-weight: 600;
      margin-right: 10px;
      color: $color-grayb;
    }
    &:hover {
      .hot-text {
        text-decoration: underline;
      }
    }
  }
  .update {
    color: $color-gray3;
    cursor: pointer;
    text-align: center;
    @include flex(center, center);
    .iconfont {
      font-size: 12px;
      margin-right: 4px;
    }
    &:hover {
      color: $primary-color;
    }
  }
}
</style>
