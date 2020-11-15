import Vue from 'vue';
import Vuex from 'vuex';

// Importar modulos
import appToken from './modules/appToken';
import estudiante from './modules/estudiante';
import usuario from './modules/usuario';

Vue.use(Vuex);

export default new Vuex.Store({
  // Aquí registramos todos los módulos
  modules: {
    appToken,
    estudiante,
    usuario
  }
});