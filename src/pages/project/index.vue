<template>
  <div id="project">
    <div
      class="article-item hover-shadow contariner-box wow animate__bounceInLeft animate__animated"
      v-for="item in 30"
      :key="item"
      data-wow-duration="1s"
      :data-wow-delay="`0.1s`"
    >
      project<br /><br />
      project<br /><br />
      projectprojectprojectprojectproject<br /><br />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" type="text/scss" scoped>
#project {
  width: 65%;
  margin: 0 auto;
  padding: 20px;
}
</style>
