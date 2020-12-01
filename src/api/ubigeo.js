import store from "@/store";
import axios from "axios";

const API_URL = store.state.apiRest.url_node

/**
 * ESTUDIANTE
 */

// REQUEST `estudents/id`
function getDepartamentos() { 
  const REQUEST = `departamentos`
  return axios.get(`${API_URL}/${REQUEST}`)
}

function getProvincias(id) { 
  const REQUEST = `provincias`
  return axios.get(`${API_URL}/${REQUEST}/${id}`)
}
function getDistritos(id) { 
  const REQUEST = `distritos`
  return axios.get(`${API_URL}/${REQUEST}/${id}`)
}
export {getDepartamentos,getProvincias,getDistritos }