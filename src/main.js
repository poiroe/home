import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
// 引入 pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// swiper
import "swiper/css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount("#app");

// PWA
navigator.serviceWorker.addEventListener("controllerchange", () => {
  // 弹出更新提醒
  console.log("站点已更新，刷新后生效");
  ElMessage("站点已更新，刷新后生效");
});

// 动态插入外部脚本 (360 统计)
(function (b, a, e, h, f, c, g, s) {
  b[h] = b[h] || function () {
    (b[h].c = b[h].c || []).push(arguments);
  };
  b[h].s = !!c;
  g = a.getElementsByTagName(e)[0];
  s = a.createElement(e);
  s.src = "//s.union.360.cn/" + f + ".js";
  s.defer = true;
  s.async = true;
  g.parentNode.insertBefore(s, g);
})(window, document, "script", "_qha", 567953, false);