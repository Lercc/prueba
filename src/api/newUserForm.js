import axios from 'axios';
import store from '../store';

//CONSTANTES
// const API_URL = `http://127.0.0.1:8000/api`
// const API_URL = `https://laravel-academic-test.herokuapp.com/api`
// const API_URL = `https://aula-virtual-eltambo.teampixeland.com/public/api`
const API_URL = store.state.apiRest.url

/**
 * APODERADO
 */

// REQUEST `getApoderado?dni=12688340`
function getApoderado(pDni) { 
  const REQUEST = `representatives?dni=${pDni}`
  const headers = { Authorization : store.state.appToken.token }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// REQUEST `createApoderado`
function createApoderado(pFormData) { 
  const REQUEST = `representatives`
  const headers = { Authorization : store.state.appToken.token }
  return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}

/**
 * ESTUDIANTE
 */

// REQUEST `students?dni=*****`
function getEstudiante(pDni) {
  const REQUEST = `students?dni=${pDni}`
  const headers = { Authorization : store.state.appToken.token }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
// REQUEST `createApoderado`
function createEstudiante(pFormData) { 
  const REQUEST = `students`
  const headers = { Authorization : store.state.appToken.token }
  return axios.post(`${API_URL}/${REQUEST}`,pFormData, { headers })
}
// REQUEST `students?correo=*****``
function getEmailEstudiante(pCorreo) { 
  const REQUEST = `email?email=${pCorreo}`
  const headers = { Authorization : store.state.appToken.token }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

//Exportamos la funcion para poder usarla más tarde
export { getApoderado, createApoderado,getEstudiante ,createEstudiante, getEmailEstudiante}