import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta';
import router from './router';
import { BootstrapVue } from 'bootstrap-vue'


// Install BootstrapVue
Vue.use(BootstrapVue)
// Use vue meta
Vue.use(Meta);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
