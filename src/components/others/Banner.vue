<template>
  <canvas :id="id"></canvas>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
interface Data {
  x: number;
  y: number;
  maxY: number;
  s: number;
  r: number;
}
const state = reactive({
  id: "canvas" + new Date().getTime(),
  ctx: null,
  af: 0 as number,
});
const canvas = ref<HTMLCanvasElement>();
const ctx = ref<CanvasRenderingContext2D>();
// methods
const init = () => {
  // canvas.value = null;
  const numLasers = 400;
  canvas.value = document.getElementById(`${state.id}`)! as HTMLCanvasElement;
  ctx.value = canvas.value.getContext("2d")!;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  cancelAnimationFrame(state.af);
  render(createLasers(numLasers));
};

const createLasers = (n: number) => {
  let lasers: Data[] = [];
  for (let i = 0; i < n; ++i) {
    if (canvas.value) {
      lasers.push({
        x: Math.random() * canvas.value.width,
        y: Math.random() * (1200 - canvas.value.height) + canvas.value.height,
        maxY: Math.random() * (canvas.value.height - 450) + 350,
        s: Math.random() * 0.5 + 0.3,
        r: Math.random() * (6 - 3) + 2.5,
      });
    }
  }
  return lasers;
};

const renderLaser = (l: Data) => {
  if (ctx.value) {
    ctx.value.beginPath();
    ctx.value.arc(l.x, l.y, l.r, 0, 2 * Math.PI, false);
    ctx.value.fillStyle = "rgba(255, 255, 255, .3)";
    ctx.value.strokeStyle = "rgba(255, 255, 255, 0)"; //填充边框颜色
    ctx.value.closePath();
    ctx.value.fill();
    ctx.value.moveTo(l.x, l.y);
    ctx.value.stroke();
  }
};
const updateLaser = (l: Data) => {
  if (canvas.value) {
    l.y -= l.s;
    if (l.y < l.maxY) {
      l.y = canvas.value.height;
    }
  }
};
const render = (lasers: Data[]) => {
  if (ctx.value && canvas.value) {
    ctx.value.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

    for (let l of lasers) {
      renderLaser(l);
      updateLaser(l);
    }
    state.af = requestAnimationFrame(() => render(lasers));
  }
};

onMounted(() => {
  // init();
  // window.onresize = init;
});
</script>
<style lang="scss" type="text/scss" scoped>
canvas {
  height: 100%;
  width: 100%;
}
</style>
