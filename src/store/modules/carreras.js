export default {
  namespaced: true,
  state: {
    carreras : ""
  },
  mutations: {
    setCarreras(state,payload) {
      state.carreras = payload
    }
  }
};
