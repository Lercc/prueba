import axios from 'axios';
import store from '../store';
import qs from 'qs'

const API_URL = store.state.apiRest.url

/**
 * Ciclos
 */

// OBTENER CICLOS
// REQUEST `ciclos`
function getCiclos(pPage=1) {
    const REQUEST = `cycles?page=${pPage}`
    const headers = { Authorization : `Bearer ${store.state.usuario.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

// CREAR CICLOS
// REQUEST `ciclos`
function createCiclo(pFormData) {
    const REQUEST = `cycles`
    const headers = { Authorization : `Bearer ${store.state.usuario.token}`}
    return axios.post(`${API_URL}/${REQUEST}`, pFormData, { headers })
}

// ACTUALIZAR CICLO
// REQUEST `ciclos`
function updateCiclo(pObjectData,pCycleId) {
    const REQUEST = `cycles/${pCycleId}`
    const data = qs.stringify(pObjectData)
    const headers = { 
        'content-type': 'application/x-www-form-urlencoded',
        Authorization : `Bearer ${store.state.usuario.token}`
    }
    return axios.put(`${API_URL}/${REQUEST}`, data, { headers })
}

// ELIMNINAR CICLO
// REQUEST `ciclos`
function deleteCiclo(pCycleId) {
    const REQUEST = `cycles/${pCycleId}`
    const headers = { Authorization : `Bearer ${store.state.usuario.token}`}
    return axios.delete(`${API_URL}/${REQUEST}`, { headers })
}
// OBTENER CATEGORIAS MOODLE
// REQUEST 'moodlecategories'
function getMoodleCategories() {
    const REQUEST = `moodlecategories`
    const headers = { Authorization : `Bearer ${store.state.usuario.token}`}
    return axios.get(`${API_URL}/${REQUEST}`, { headers })
}
//Exportamos la funcion para poder usarla más tarde
export { getCiclos, createCiclo, updateCiclo, deleteCiclo,getMoodleCategories }
