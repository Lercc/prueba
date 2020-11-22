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
    }
  },
  mutations: {
    guardarEstudiante(state, payload) {
      state.estudiante.id = payload.id
      state.estudiante.nombre = payload.nombre
      state.estudiante.apellidos = payload.apellidos
      state.estudiante.dni = payload.dni
      state.estudiante.fechNac = payload.fecha_nacimiento
      state.estudiante.celular = payload.celular
      state.estudiante.provincia = payload.provincia
      state.estudiante.distrito = payload.distrito
      state.estudiante.relacionApoderado = payload.relacion
      state.estudiante.anioCulminacion = payload.anio_culminacion
      state.estudiante.apoderadoId = payload.apoderado_id
    },
    guardarId(state,payload){
      state.estudiante.id = payload
      // state.estudiante.correo = payload.correo
    }
  }
}