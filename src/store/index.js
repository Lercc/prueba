import Vue from 'vue';
import Vuex from 'vuex';

// Importar modulos
import apiRest from './modules/apiRest';
import appToken from './modules/appToken';
import areas from './modules/areas';
import carreras from './modules/carreras';
import ciclos from './modules/ciclos';
import estudiante from './modules/estudiante';
import temp from './modules/temp';
import usuario from './modules/usuario';

Vue.use(Vuex);

export default new Vuex.Store({
  // Aquí registramos todos los módulos
  modules: {
    apiRest,
    appToken,
    areas,
    carreras,
    ciclos,
    estudiante,
    temp,
    usuario,
  }
});