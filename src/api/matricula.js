import axios from 'axios';
import store from '../store';

const API_URL = `https://laravel-academic-test.herokuapp.com/api`

/**
 * MATRICULA
 */

// REQUEST `students/*/cycles/*/enrollments`
function crearEnrollment(pIdEstudiante, pIdCiclo, pFormData) {
  const REQUEST = `students/${pIdEstudiante}/cycles/${pIdCiclo}/enrollments`
  const headers = { Authorization : `Bearer ${store.state.estudianteToken.token}`}
  return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

/**
 * VAUCHER
 */

//REQUEST `voucher`
function crearVoucher(pFormData) {
  const REQUEST = `vouchers`
  const headers = { 
    'Content-Type': 'multipart/form-data',
    Authorization : `Bearer ${store.state.estudianteToken.token}`
  }
  return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}


//Exportamos la funcion para poder usarla más tarde
export { crearEnrollment,crearVoucher }
