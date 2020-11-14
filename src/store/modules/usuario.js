export default {
  namespaced: true,
  state: {
    admin: false
  },
  mutations: {
    userIsAdmin(state, payload) {
      state.admin = payload
    }
  }
}