import store from '../store.js';

const state = {
  notes: []
}

const getters = {
  getNotes(state) {
    return state.notes;
  }
}

const mutations = {
  setNote(state, note) {
    state.notes.push(note);
  },
  setAllNotes(state, notes) {
    state.notes = notes
  },
  setErrorMessage(state, errMessage) {
    state.errorMessage = errMessage;
  }
}

const actions = {
  async getNotes({ commit }) {
    const result = await fetch(`http://localhost:5000/api/v1/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.token}`,
      }
    });
    const notes = await result.json();
    if (notes.hasOwnProperty('message')) {
      //Error
      store.dispatch('auth/logout');
    } else {
      //Commit
      commit('setAllNotes', notes);
    }
  },
  async addNote({ commit }, note) {
    const result = await fetch(`http://localhost:5000/api/v1/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(note)
    });
    const noteAdded = await result.json();
    if (noteAdded.hasOwnProperty('message')) {
       //Error
       store.dispatch('auth/logout');
    } else {
      //Commit
      commit('setNote', noteAdded);
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}