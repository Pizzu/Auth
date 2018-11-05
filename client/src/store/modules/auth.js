import router from '../../router.js';
import store from '../store.js';

const state = {
  user: {},
  isUserLogged: false,
  errorMessage: ''
}

const getters = {
  getUser(state) {
    return state.user;
  },
  getIsUserLogged(state) {
    return state.isUserLogged;
  },
  getErrorMessage(state) {
    return state.errorMessage;
  }
}

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.isUserLogged = true
    state.errorMessage = '';
  },
  setIsUserLoggedOut(state) {
    state.isUserLogged = false
  },
  setErrorMessage(state, message) {
    state.errorMessage = message;
  }
}

const actions = {
  async signup({commit}, user) {
    const result = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    const userAdded = await result.json();
    if (userAdded.hasOwnProperty('message')) {
      commit('setErrorMessage', userAdded.message);
    } else {
      commit('setUser', userAdded.user);
      localStorage.token = userAdded.token;
      router.push({name: 'signin'});
    }
  },
  async signin({ commit }, user) {
    const result = await fetch('http://localhost:5000/auth/signin', {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    const userLogged = await result.json();
    if (userLogged.hasOwnProperty('message')) {
      commit('setErrorMessage', userLogged.message);
    } else {
      commit('setUser', userLogged.user);
      localStorage.token = userLogged.token;
      router.push({name: 'dashboard'});
    }
  },
  async getUserFromToken({ commit,  dispatch}) {
    const result = await fetch('http://localhost:5000/api/v1', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.token}`,
      }
    });
    const response = await result.json();
    if (response.user) {
      commit('setUser', response.user);
      store.dispatch('notes/getNotes');
    } else {
      dispatch('logout');
    }
  },
  logout({ commit }) {
      localStorage.removeItem('token');
      commit('setIsUserLoggedOut');
      router.push({name: 'signin'});
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}