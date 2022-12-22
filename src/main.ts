import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 引入路由
import config from "./config"; // 通用配置文件
import store from "@store";
// import i18n from './language'; // 引入 语言
// import { done, start } from "nprogress";
// import "nprogress/nprogress.css";

//在页面跳转使用
/* router.beforeEach((to, from, next) => {
    //开始进度条
    start();
    // 继续路由
    next();
});
router.afterEach(transition => {
    //结束进度条
    done();
}); */

const app = createApp(App);

// 全局指令
app.directive("loadAni", {
  mounted(el, binding) {
    const elClass = el.getAttribute("class");
    const per = 0.95;
    const scrollClassName = function () {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (
        scrollTop + document.documentElement.clientHeight * per >=
          el.offsetTop ||
        scrollTop + document.documentElement.clientHeight >=
          el.offsetTop + el.offsetHeight
      ) {
        el.setAttribute(
          "class",
          `${elClass} animate__animated ${binding.value || "ls-animationed"}`
        );
        window.removeEventListener("scroll", scrollClassName);
      }
    };
    window.addEventListener("scroll", scrollClassName);
    const scrollTops =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTops === 0) {
      scrollClassName();
    }
  },
});
// 配置全局属性
app.config.globalProperties.$config = config;

app.use(router).use(store).mount("#app");
