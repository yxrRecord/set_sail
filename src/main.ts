import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由
import config from "./config"; // 通用配置文件
import store from './store';
import i18n from './lang'; // 引入 语言
import { done, start } from "nprogress";
import "nprogress/nprogress.css";

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

app.use(router).use(i18n).use(store).mount('#app');


