import axios from 'axios';
import store from '../store';

//test
const CLIENT_ID =  1
const CLIENT_PASSWORD =  "nE3eZEBhDoyhsLin6om8zYSBxlOscLpj1eVfCfq4"

// local
// const CLIENT_ID =  1
// const CLIENT_PASSWORD =  "SHqd36FPiylTPYKuaALE2hrE759vzPh4cb42794H"

const API_URL = `${store.state.apiRest.url}/oauth/token`
//TOKEN AL INicializar el APP
function getInitialToken() {
  const BODY = new FormData()
  BODY.append('grant_type','client_credentials')
  BODY.append('client_id',CLIENT_ID)
  BODY.append('client_secret',CLIENT_PASSWORD)

  return axios.post(API_URL,BODY);
}



//TOKEN DE ESTUDAINTE -- CORREO -CONTRASEÑA
//function getStudentToken(pCorreo,pContrasenia) {
function getStudentToken(pCorreo,pContrasenia) {

  //test
  const CLIENT_IDS = 2
  const CLIENT_PASSWORDS =  "VJATzS3gBXD9VC6rhoD5WY2q5QomTQorl2CRhj7u" 

  //local
  // const CLIENT_IDS = 2
  // const CLIENT_PASSWORDS =  "UVu6FlpgfNfrWZniJfP1OodiPIxv1fohksvUfIpM" 

  const CORREO = pCorreo;
  const CONTRASENIA = pContrasenia;
  // const CORREO = "pozzo@pozzo.com";
  // const CONTRASENIA = "98765432";

  //TOKEN
  const BODY = new FormData()
  BODY.append('grant_type','password')
  BODY.append('client_id',CLIENT_IDS)
  BODY.append('client_secret',CLIENT_PASSWORDS)
  BODY.append('username',CORREO)
  BODY.append('password',CONTRASENIA)

  return axios.post(API_URL,BODY);
}


//Exportamos la funcion para poder usarla más tarde
export { getInitialToken, getStudentToken }