import { createStore } from "vuex";
import ScoreService from "@/services/ScoreService.js";

export default createStore({
  state: {
    results: [],
  },

  mutations: {
    ADD_RESULT(state, result) {
      state.results.push(result);
    },
  },

  actions: {
    createResult({ commit }, result) {
      return ScoreService.postResult(result).then(() => {
        commit("ADD_RESULT", result);
      });
    },
  },

  getters: {
    catLength: (state) => {
      return state.categories.length;
    },

    resultsLength: (state) => {
      return state.results.length;
    },
  },
  modules: {},
});
