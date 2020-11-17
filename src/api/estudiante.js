import store from "@/store";
import axios from "axios";

const API_URL = store.state.apiRest.url

/**
 * ESTUDIANTE
 */

// REQUEST `estudents/id`
function getStudent(pID) { 
  const REQUEST = `students/${pID}`
  const headers = { Authorization : `Bearer ${store.state.usuario.token}` }
  return axios.get(`${API_URL}/${REQUEST}`, { headers })
}

export {getStudent }