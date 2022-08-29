<template>
  <div id="skill">
    <div class="article-item hover-shadow contariner-box wow animate__bounceInLeft animate__animated " v-for="item in 30" :key="item" data-wow-duration="1s" :data-wow-delay="`0.1s`">
      学校大了好多，课程也多了好多，一切的一切，都充满活力又富有挑战性。刚刚告别了小学生活，现在的自己，已经是初一新生。<br /><br />
      也多了一批新的伙伴。放学的时候，三五个背着书包的男生在学校里并排走，聊着大家都感兴趣的话题，嘻嘻哈哈，欢声笑语撒了一路。<br /><br />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" type="text/scss" scoped>
#skill {
  width: 65%;
  margin: 0 auto;
  padding: 20px;
}
</style>