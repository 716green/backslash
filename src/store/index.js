import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      footerText: "/backslash/",
      history: []
    },
    getters: {
      getFooterText(state) {
        return state.footerText;
      },
      getHistory(state) {
        return state.history;
      }
    },
    mutations: {
      SET_FOOTER(state, value) {
        state.footerText = value === "reset" ? "/backslash/" : value;
      },
      SET_HISTORY(state, value) {
        state.history = value;
      }
    },
    actions: {
      setFooter({ commit }, value) {
        commit("SET_FOOTER", value);
      },
      setHistory({ commit, getters }, value) {
        const existingHistory = [];
        getters.getHistory.forEach(entry => existingHistory.push(entry));
        existingHistory.unshift(value);
        commit("SET_HISTORY", existingHistory);
      }
    }
  });

  return Store;
}
