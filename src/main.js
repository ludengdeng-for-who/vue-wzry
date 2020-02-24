import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import http from "./network/request";
import  './assets/css/image.css'
Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    getToken() {
      return {
        Authorition: `${localStorage.token}`
      };
    }
  }
});
Vue.prototype.$http = http;
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
