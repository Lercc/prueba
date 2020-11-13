export default {
  namespaced: true,
  state: {
    estudiante: {
      id : '',
      nombre: '',
      apellidos: '',
      dni: '',
      fechNac: '',
      celular: '',
      provincia: '',
      distrito: '',
      relacionApoderado: '',
      anioCulminacion: '',
      apoderadoId: '',
      //user
      correo: ''
    }
  },
  mutations: {
    guardarEstudiante(state, payload) {
      state.estudiante.id = payload.id
      state.estudiante.nombre = payload.nombre
      state.estudiante.apellidos = payload.apellidos
      state.estudiante.dni = payload.dni
      state.estudiante.fechNac = payload.fechNac
      state.estudiante.celular = payload.celular
      state.estudiante.provincia = payload.provincia
      state.estudiante.distrito = payload.distrito
      state.estudiante.relacionApoderado = payload.relacionApoderado
      state.estudiante.anioCulminacion = payload.anioCulminacion
      state.estudiante.apoderadoId = payload.apoderadoId
    },
    guardarId(state,payload){
      state.estudiante.id = payload
      // state.estudiante.correo = payload.correo
    }
  }
}