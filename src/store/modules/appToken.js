export default {
  namespaced: true,
  state: {
    token : ""
  },
  mutations: {
    setAppToken(state,payload) {
      state.token = payload
    }
  },
  actions: {
    
  }
};
