import axios from 'axios';
import store from '../store';


//CONSTANTES
// const API_URL = `http://127.0.0.1:8000/api`
const API_URL = `https://laravel-academic-test.herokuapp.com/api`

// let user_token = store.state.usuario.token


// REQUEST `cycles`
function getCiclos() { 
  const REQUEST = 'cycles'
  // const headers = { Authorization : `Bearer ${store.state.estudianteToken.token}` }
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// REQUEST `careers?per_page=50`
function getCarrerasPorArea(pArea) { 
  const REQUEST = `areas/${pArea}/careers?sort_by=nombre`
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// REQUEST `careers?per_page=50`
function getAreas() { 
  const REQUEST = 'areas'
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// REQUEST `me`
function getMe() { 
  const REQUEST = 'me'
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}


//Exportamos la funcion para poder usarla más tarde
export { getCiclos, getCarrerasPorArea, getMe, getAreas }