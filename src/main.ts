import { createApp, Directive } from "vue";
import App from "./App.vue";
import router from "./router"; // 引入路由
import config from "./config"; // 通用配置文件
import store from "@store";
import directives from "@/directive";
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

// 配置全局属性
app.config.globalProperties.$config = config;

Object.keys(directives).forEach((key) => {
    //key是自定义指令名字；后面应该是自定义指令的值，值类型是string
    app.directive(key, (directives as { [key: string]: Directive })[key]);
});
app.use(router).use(store).mount("#app");
