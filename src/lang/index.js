import en from './en'
import zh from './zh-cn'
import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en', //默认显示语言
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
