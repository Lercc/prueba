export default {
  namespaced: true,
  state: {
    studentFullName:''
  },
  mutations: {
    setStudentId(state,payload) {
      state.studentFullName = payload
    }
  }
}