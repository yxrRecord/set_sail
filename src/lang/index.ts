import messages from './language';
import { createI18n } from 'vue-i18n';
import config from "../config"; // 通用配置文件

const i18n = createI18n({
  legacy: true, // you must set `false`, to use Composition API
  locale: config.language, //默认显示语言
  fallbackLocale: 'zh', // set fallback locale
  messages,
})
export default i18n
