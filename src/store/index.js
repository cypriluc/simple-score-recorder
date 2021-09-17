import { createStore } from "vuex";
import ScoreService from "@/services/ScoreService.js";
import createMultiTabState from "vuex-multi-tab-state";

export default createStore({
  state: {
    results: [],
  },

  mutations: {
    ADD_RESULT(state, result) {
      state.results.push(result);
    },

    SET_RESULTS(state, results) {
      state.results = results;
    },
  },

  actions: {
    createResult({ commit }, result) {
      return ScoreService.postResult(result).then(() => {
        commit("ADD_RESULT", result);
      });
    },

    fetchResults({ commit }) {
      ScoreService.getResults()
        .then((response) => {
          commit("SET_RESULTS", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  getters: {
    resultsLength: (state) => {
      return state.results.length;
    },

    sortedResults: (state) => {
      const sorted = [...state.results];
      return sorted.sort(function (a, b) {
        return a.score - b.score;
      });
    },
  },

  plugins: [createMultiTabState()],
});
