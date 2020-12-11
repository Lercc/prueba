import axios from 'axios';
import store from '../store';


const API_URL = store.state.apiRest.url

// REQUEST `cycles`
function getCiclos() { 
  const REQUEST = 'cycles'
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
function getAllCiclos() { 
  const REQUEST = 'cycles?per_page=50'
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
//Obtener ciclos disponibles
function getCiclosFilter(filter) {
  const REQUEST = `cycles?estado=${filter}`
  const headers = { Authorization : `Bearer ${store.state.usuario.token}`}
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
// REQUEST `careers`
function getCarrerasPorArea(pArea) { 
  const REQUEST = `areas/${pArea}/careers?sort_by=nombre`
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
function getAllCarreras() { 
  const REQUEST = `careers?per_page=50`
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// REQUEST `areas`
function getAreas() { 
  const REQUEST = 'areas'
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
function getAllAreas() { 
  const REQUEST = 'areas?per_page=50'
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
export { getCiclos, getCarrerasPorArea, getMe, getAreas,getAllCiclos,getAllAreas,getAllCarreras,getCiclosFilter}