import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import 'bootswatch/dist/superhero/bootstrap.css';
import 'animate.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
