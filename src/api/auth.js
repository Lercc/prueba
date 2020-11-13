import axios from 'axios';

// Client ID: 1
// Client secret: AxuEYf3ltb7WG3GQOTqxIZtVjrUMUfNWFyle5XCe

// Client ID: 2
// Client secret: 3SfIaXZCoKdfWruHrgUrtWkZVeu3VJYxGRPu0ISt

// Client ID: 3
// Client secret: S2RM9zhj2x2IpZOkZLw7yl5rPUnN6DOHCquyRonh

const CLIENT_ID =  6
const CLIENT_PASSWORD =  "mmxu0ER1gXIqPshEVClGlhVcITET57eM5HVXLMfX"

// const API_URL = `http://127.0.0.1:8000/api/oauth/token`
const API_URL = `https://laravel-academic-test.herokuapp.com/api/oauth/token`

//TOKEN AL INicializar el APP
function getInitialToken() {
  const BODY = new FormData()
  BODY.append('grant_type','client_credentials')
  BODY.append('client_id',CLIENT_ID)
  BODY.append('client_secret',CLIENT_PASSWORD)

  return axios.post(API_URL,BODY);
}



//TOKEN DE ESTUDAINTE -- CORREO -CONTRASEÑA
// function getStudentToken(pCorreo,pContrasenia) {
function getStudentToken(pCorreo,pContrasenia) {

  const CLIENT_IDS =  7
  const CLIENT_PASSWORDS =  "uzGzezGLa26CEMZ0X0ENl1oreBnNOhyDexuzSKin" 

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