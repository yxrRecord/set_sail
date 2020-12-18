<template>
  <canvas :id="id"></canvas>
</template>
<script>
export default {
  data() {
    return {
      id: 'canvas' + this.$moment().format("x"),
      canvas: null,
      ctx: null,
      af: null,
    }
  },
  mounted() {
      this.init()
      window.onresize = this.init;
  },
  methods: {
    init() {
      this.canvas = null;
      const numLasers = 400;
      this.canvas = document.getElementById(`${this.id}`);
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      cancelAnimationFrame(this.af);
      this.render(this.createLasers(numLasers));
    },

    createLasers(n) {
      const lasers = [];
      for (let i = 0; i < n; ++i) {
        lasers.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * (1200 - this.canvas.height) + this.canvas.height,
          maxY: (Math.random() * (this.canvas.height - 450) + 350),
          s: Math.random() * 0.5 + 0.3,
          r: Math.random() * (6 - 3) + 2.5
        });
      }
      return lasers;
    },
    
    renderLaser(l) {
      this.ctx.beginPath();
      this.ctx.arc(l.x, l.y, l.r, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = 'rgba(255, 255, 255, .3)'
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0)';//填充边框颜色
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.moveTo(l.x, l);
      this.ctx.stroke();
    },
    updateLaser(l) {
      l.y -= l.s;
      if (l.y < l.maxY) {
        l.y = this.canvas.height;
      }
    },
    render(lasers) {
      this.ctx.fillStyle = "rgba(255, 255, 255, 0)";
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      for (let l of lasers) {
        this.renderLaser(l);
        this.updateLaser(l);
      }
      this.af = requestAnimationFrame(() => this.render(lasers));
    },
  }
}
</script>
<style lang="scss" type="text/scss" scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
