import axios from 'axios';
import store from '../store';

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

//Exportamos la funcion para poder usarla más tarde
export { getCiclos}
