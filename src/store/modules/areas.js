export default {
  namespaced: true,
  state: {
    areas : ""
  },
  mutations: {
    setAreas(state,payload) {
      state.areas = payload
    }
  }
};
