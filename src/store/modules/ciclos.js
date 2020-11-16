export default {
  namespaced: true,
  state: {
    ciclos : ""
  },
  mutations: {
    setCiclos(state,payload) {
      state.ciclos = payload
    }
  }
};
