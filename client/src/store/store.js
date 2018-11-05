import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.js';
import notes from './modules/notes.js';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    notes
  }
})
