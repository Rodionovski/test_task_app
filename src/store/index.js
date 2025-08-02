import { createStore } from "vuex";

export default createStore({
  state: {
    filteredData: [],
  },
  mutations: {
    setFilteredData(state, data) {
      state.filteredData = data;
    },
  },
  actions: {
    updateFilteredData({ commit }, data) {
      commit("setFilteredData", data);
    },
  },
  getters: {
    filteredData: (state) => state.filteredData,
  },
});
