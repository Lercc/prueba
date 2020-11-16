import store from "@/store"

//ciclo
const cicloId = function(pID) {
  let conincide = store.state.ciclos.ciclos.filter( f => f.id == pID )
  // console.log(conincide)
  return conincide[0].nombre
};

//area
const areaId = function(pID) {
  let conincide = store.state.areas.areas.filter( f => f.id == pID )
  // console.log(conincide)
  return conincide[0].nombre
};

//carrera
const carreraId = function(pID) {
  let conincide = store.state.carreras.carreras.filter( f => f.id == pID )
  // console.log(conincide)
  return conincide[0].nombre
};

//estadoMAtricula
const estadoMatricula = function(pEstado) {
  switch (pEstado) {
    case "pendiente":
      return "warning"
    case "aprovado":
      return "success"
    case "terminado":
      return "danger"
  }
};

export { cicloId, areaId, carreraId,estadoMatricula }