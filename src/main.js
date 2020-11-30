import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; 
//引入定义的全局前置理由守卫
import "@/router/premit.js";
//自定义全局SVGIcon组件
import "./icons/index.js";
Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
