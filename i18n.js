import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "@/Translations/en.json";
import ar from "@/Translations/ar.json";

Vue.use(VueI18n);

export default new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: {
    ar: ar,
    en: en,
  },
});
