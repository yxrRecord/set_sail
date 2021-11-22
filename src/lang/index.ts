import en from './en';
import zh from './zh-cn';
import { createI18n } from 'vue-i18n';
import config from "../config"; // 通用配置文件

const i18n = createI18n({
  locale: config.language, //默认显示语言
  messages: {
    zh: {
      ...zh,
    },
    en: {
      ...en,
    }
  }
})
export default i18n
