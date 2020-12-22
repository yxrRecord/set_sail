<template>
  <div id="skill">
    <div class="article-item hover-shadow contariner-box wow bounceInLeft" v-for="item in 30" :key="item" data-wow-duration="1s" :data-wow-delay="`0.1s`">
      <p>{{item}}</p>
      <p>{{item}}</p>
      <p>{{item}}</p>
      <p>{{item}}</p>
      <p>{{item}}</p>
      <p>{{item}}</p>
      <p>{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skill',
  data() {
    return {
     
    }
  },
  mounted() {
   
  },
  methods: {
    
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
#skill {
  width: 65%;
  margin: 0 auto;
  padding: 20px;
}
</style>