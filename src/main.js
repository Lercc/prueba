import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import ArgonDashboard from './plugins/argon-dashboard';

// vuex setup
import store from '@/store';

//spinner loading
import { VueSpinners } from '@saeris/vue-spinners';

//utils
import { cicloId, areaId, carreraId,estadoMatricula, subCadena } from "@/utils";
Vue.filter("ciclo", cicloId);
Vue.filter("area", areaId);
Vue.filter("carrera", carreraId);
Vue.filter("estadoMatricula", estadoMatricula);
Vue.filter("subCadena", subCadena);

Vue.config.productionTip = false;

Vue.use(ArgonDashboard),
Vue.use(Vuelidate);
Vue.use(VueSpinners);
Vue.use(BootstrapVue);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
