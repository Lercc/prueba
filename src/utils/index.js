import store from "@/store";

//ciclo
const cicloId = function(pID) {
  let conincide = store.state.ciclos.ciclos.filter( f => f.id == pID )
  // console.log(conincide)
  return conincide[0].nombre.substr(6)
};

//area
const areaId = function(pID) {
  let areaID = store.state.carreras.carreras.filter( f => f.id == pID )[0].area_id
  let conincide = store.state.areas.areas.filter( f => f.id == areaID )
  // console.log(conincide)
  return conincide[0].nombre.substr(5)
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
      return "red"
    case "aprovado":
      return "success"
    case "terminado":
      return "gray"
    case "desaprobado":
      return "red"
  }
};

//subSTR
const subCadena = function(pCadena) {
  // console.log(pCadena)
  if (pCadena.length > 18) return pCadena.substr(0,19)+'...'
  else return pCadena
};

export { cicloId, areaId, carreraId,estadoMatricula,subCadena }