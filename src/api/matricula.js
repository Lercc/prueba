import axios from 'axios';
import store from '../store';

// const API_URL = `https://aula-virtual-eltambo.teampixeland.com/public/api`
const API_URL = store.state.apiRest.url

/**
 * MATRICULA
 */

// CREAR MATRICULA
// REQUEST `students/*/cycles/*/enrollments`
function crearEnrollment(pIdEstudiante, pIdCiclo, pFormData) {
  const REQUEST = `students/${pIdEstudiante}/cycles/${pIdCiclo}/enrollments`
  const headers = { Authorization : `Bearer ${store.state.usuario.token}`}
  return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}
// OBTENER MATRICULAS
// REQUEST `students/*/cycles/*/enrollments`
function getEnrollments() {
  const REQUEST = `students/${store.state.estudiante.estudiante.id}/enrollments`
  const headers = { Authorization : `Bearer ${store.state.usuario.token}`}
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}



/**
 * VAUCHER
 */

 // CREAR VAUCHER
//REQUEST `voucher`
function crearVoucher(pFormData) {
  const REQUEST = `vouchers`
  const headers = { 
    'Content-Type': 'multipart/form-data',
    Authorization : `Bearer ${store.state.usuario.token}`
  }
  return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}


//Exportamos la funcion para poder usarla más tarde
export { crearEnrollment, crearVoucher, getEnrollments }
