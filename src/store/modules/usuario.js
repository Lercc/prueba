export default {
  namespaced: true,
  state: {
    admin: "",
    token: ""
  },
  mutations: {
    userIsAdmin(state, payload) {
      state.admin = payload
    },
    setUsuarioToken(state,payload) {
      state.token = payload
    }
  }
}