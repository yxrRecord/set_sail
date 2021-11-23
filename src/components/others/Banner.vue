<template>
  <canvas :id="id"></canvas>
</template>
<script>
import { defineComponent, onBeforeMount, toRefs, reactive } from 'vue';
import moment from 'moment';
export default defineComponent({
  setup() {
    const state = reactive({
      id: 'canvas' + moment().format("x"),
      canvas: null,
      ctx: null,
      af: null,
    })
    // methods
    const init = () => {
      state.canvas = null;
      const numLasers = 400;
      state.canvas = document.getElementById(`${state.id}`);
      state.ctx = state.canvas.getContext("2d");
      state.canvas.width = window.innerWidth;
      state.canvas.height = window.innerHeight;

      cancelAnimationFrame(state.af);
      render(createLasers(numLasers));
    }

    const createLasers = (n) => {
      const lasers = [];
      for (let i = 0; i < n; ++i) {
        lasers.push({
          x: Math.random() * state.canvas.width,
          y: Math.random() * (1200 - state.canvas.height) + state.canvas.height,
          maxY: (Math.random() * (state.canvas.height - 450) + 350),
          s: Math.random() * 0.5 + 0.3,
          r: Math.random() * (6 - 3) + 2.5
        });
      }
      return lasers;
    }
    
    const renderLaser = (l) => {
      state.ctx.beginPath();
      state.ctx.arc(l.x, l.y, l.r, 0, 2 * Math.PI, false);
      state.ctx.fillStyle = 'rgba(255, 255, 255, .3)'
      state.ctx.strokeStyle = 'rgba(255, 255, 255, 0)';//填充边框颜色
      state.ctx.closePath();
      state.ctx.fill();
      state.ctx.moveTo(l.x, l);
      state.ctx.stroke();
    }
    const updateLaser = (l) => {
      l.y -= l.s;
      if (l.y < l.maxY) {
        l.y = state.canvas.height;
      }
    }
    const render = (lasers) => {
      state.ctx.fillStyle = "rgba(255, 255, 255, 0)";
      state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
      for (let l of lasers) {
        renderLaser(l);
        updateLaser(l);
      }
      state.af = requestAnimationFrame(() => render(lasers));
    }


    onBeforeMount(() => {
      init()
      window.onresize = init();
    })
    return {
      ...toRefs(state),
    }
  }
})
</script>
<style lang="scss" type="text/scss" scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
