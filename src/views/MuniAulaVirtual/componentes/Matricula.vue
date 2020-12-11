<template>
  <div>
    <!-- BootstrapVue Done -->
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row class="justify-content-center">
        <b-col lg="8" >
          <card  class="bg-secondary muni-box-shadow">
            <h3  class="mb-0 text-center">RELLENA EL FORMULARIO PARA MATRICULARTE EN UN CICLO</h3>
          </card>
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row class="justify-content-center">
        <b-col lg="8">
          <!--  -->
          <b-card border-variant="Secondary" class="mt-3 muni-box-shadow">
            <h3 slot="header" class ="text-center mb-0" >DATOS DE LA INSCRIPCIÓN</h3>
            <b-card-body class="px-lg-5 py-lg-5">
              <!-- FORMULARIO DE INSCRIPCION -->
              <b-form >

                <!-- Grupo 1( CICLO) -->
                <b-form-group
                  label="1. Ciclo a matricularse:"
                  >
                  <div class = "pb-1  loader-content" v-show="createMatriculaLoading">
                    <pulse-loader class="mt-2 ml-3" :loading="createMatriculaLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-select
                    v-show="!createMatriculaLoading"
                    @click="verificarDatosMatricula"
                    @change="verificarDatosMatricula"
                    @blur="$v.matricula.cicloId.$touch"
                    v-model="$v.matricula.cicloId.$model" 
                    :options="ciclos"
                    :state = "$v.matricula.cicloId.$dirty ? !$v.matricula.cicloId.$invalid : null"
                    :disabled="matriculaInputsDisable"
                  >
                   <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione el ciclo a matricularse --</b-form-select-option>
                    </template>
                  </b-form-select>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.matricula.cicloId.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                </b-form-group>

                <!-- Grupo 2( CARRERA) -->
                <b-form-group
                  label="2. Áreas :"
                  >
                  <div class = "pb-1  loader-content" v-show="createMatriculaLoading">
                    <pulse-loader class="mt-2 ml-3" :loading="createMatriculaLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  <b-form-select
                    @change="verificarDatosMatricula"
                    v-show="!createMatriculaLoading"
                    v-model="areaSelecionada" 
                    :options="areas"
                    :disabled="matriculaInputsDisable"
                  >
                   <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione el área --</b-form-select-option>
                    </template>
                  </b-form-select>

                </b-form-group>

                <!-- Grupo 3( CARRERA) -->
                <b-form-group
                  label="3. Carrera :"
                  >
                  <div class = "pb-1  loader-content" v-show="createMatriculaLoading">
                    <pulse-loader class="mt-2 ml-3" :loading="createMatriculaLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  <b-form-select
                    v-show="!createMatriculaLoading"
                    @change="verificarDatosMatricula"
                    @click="$v.matricula.carreraId.$touch"
                    v-model="$v.matricula.carreraId.$model" 
                    :options="carreras"
                    :state = "$v.matricula.carreraId.$dirty ? !$v.matricula.carreraId.$invalid : null"
                    :disabled="matriculaInputsDisable"
                  >
                   <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione la carrera --</b-form-select-option>
                    </template>
                  </b-form-select>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.matricula.carreraId.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                </b-form-group>

                <!-- Grupo 4( IMAGEN VAUCHER) -->
                <b-form-group
                  label="4. Imagen del vaucher :"
                  >
                  <div class = "pb-1  loader-content" v-show="createMatriculaLoading">
                    <pulse-loader class="mt-2 ml-3" :loading="createMatriculaLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  <b-form-file
                    v-show="!createMatriculaLoading"
                    @moseover="$v.matricula.imagenVaucher.$touch"
                    @change="verificarDatosMatricula"
                    @blur="verificarDatosMatricula"
                    accept="image/*"
                    placeholder="Seleccione o arrastre aqui..."
                    drop-placeholder="Arrastra y suelta aqui..."
                    browse-text="Buscar"
                    v-model="$v.matricula.imagenVaucher.$model"
                    :state = "$v.matricula.imagenVaucher.$dirty ? !$v.matricula.imagenVaucher.$invalid : null"
                    :disabled="matriculaInputsDisable"
                  >
                  </b-form-file>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.matricula.imagenVaucher.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                      class="input--error" 
                      v-for="(imagenVaucherError, index) in mostrarErroresInput('imagen')" 
                      :key="`imagenVaucher-${index}`">{{ imagenVaucherError }}</span>

                </b-form-group>

                <!-- Grupo 5( CODIGO VAUCHER) -->
                <b-form-group
                  label="5. Código del vaucher :"
                  >
                  <div class = "pb-1  loader-content" v-show="createMatriculaLoading">
                    <pulse-loader class="mt-2 ml-3" :loading="createMatriculaLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  <b-form-input
                    v-show="!createMatriculaLoading"
                    @keyup="verificarDatosMatricula"
                    @click="$v.matricula.codigoVaucher.$touch"
                    type="number"
                    placeholder="Ingrese el código del vaucher"
                    v-model="$v.matricula.codigoVaucher.$model"
                    :state = "$v.matricula.codigoVaucher.$dirty ? !$v.matricula.codigoVaucher.$invalid : null"
                    :disabled="matriculaInputsDisable"
                  >
                  </b-form-input>
                  
                  <b-form-invalid-feedback>
                    <span v-show = "!$v.matricula.codigoVaucher.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                      class="input--error" 
                      v-for="(codigoVaucherError, index) in mostrarErroresInput('codigo')" 
                      :key="`codigoVaucher-${index}`">{{ codigoVaucherError }}</span>

                </b-form-group>

                <!-- Grupo 6( FECHA VAUCHER) -->
                <b-form-group
                  label="6. Fecha del vaucher :"
                  >
                  <div class = "pb-1  loader-content" v-show="createMatriculaLoading">
                    <pulse-loader class="mt-2 ml-3" :loading="createMatriculaLoading" :size = "15" :color="'#4FA898'"/>
                  </div>
                  <b-form-input
                    v-show="!createMatriculaLoading"
                    @click="$v.matricula.fechaVaucher.$touch"
                    @change="verificarDatosMatricula"
                    type="date"
                    min="2020-11-01"
                    max="2090-12-31"
                    v-model="$v.matricula.fechaVaucher.$model"
                    :state = "$v.matricula.fechaVaucher.$dirty ? !$v.matricula.fechaVaucher.$invalid : null"
                    :disabled="matriculaInputsDisable"
                  >
                  </b-form-input>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.matricula.fechaVaucher.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <span 
                      class="input--error" 
                      v-for="(fechaVaucherError, index) in mostrarErroresInput('fecha')" 
                      :key="`fechaVaucher-${index}`">{{ fechaVaucherError }}</span>

                </b-form-group>
                <div style="text-align:center;">
                  <b-button  variant="primary" :disabled="btnMatricularDisabled || matriculaInputsDisable" @click="registrarIncripcion" >Registrar inscripción </b-button>
                </div>
                
              </b-form>
              
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import BaseHeader from '@/components/BaseHeader';
import * as  generalData from '@/api/generalData'
import * as  matricula from '@/api/matricula'
import { mapState } from 'vuex';

import { required } from 'vuelidate/lib/validators';
import { validationMixin  } from 'vuelidate' 

import swal from 'sweetalert';


Vue.use(VueClipboard)
export default {
  name: 'matricula',
  mixins: [validationMixin],
  components: {
    BaseHeader
  },
  data () {
    return {
      ciclos : [],
      areas: [],
      carreras: [],
      areaSelecionada: '',
      //
      createMatriculaLoading: false,
      //
      btnMatricularDisabled: true,
      matriculaInputsDisable: false,
      //errores
      erroresInputs: [],
      //
      matricula: {
        cicloId :'',
        carreraId :'',
        codigoVaucher:'',
        fechaVaucher:'',
        imagenVaucher:null,
      }
    }
  },
  validations: {
    matricula : {
      cicloId: {
        required
      },
      carreraId: {
        required
      },
      codigoVaucher: {
        required,
      },
      fechaVaucher: {
        required,
      },
      imagenVaucher: {
        required
      }
    }
  },
  created() {
    this.obtenerCiclos()
    this.obtenerAreas()
  },

  computed: {
    ...mapState("estudiante", ["estudiante"]),

  },

  watch: {
    areaSelecionada() {
      this.matricula.carreraId = ""
      generalData.getCarrerasPorArea(this.areaSelecionada)
        .then( res => {
          this.carreras = res.data.data.map( i => ({ value : i.id, text : i.nombre}))
        })
        .catch( error => {
          console.log(error)
        })
        .finally(() => {
          console.log("get carreras end")
        })
    },
    matricula: {
      handler: function() {
        this.verificarDatosMatricula()
      },
      deep: true
    }
  },

  methods: {
    test(value){
      console.log(value)
    },
    onCopy() {
      this.$notify({
        type: 'info',
        message: 'Copied to clipboard'
      })
    },


    verificarDatosMatricula() {
      if (!this.$v.matricula.$invalid ) {
        this.btnMatricularDisabled = false
      } else {
        this.btnMatricularDisabled = true
      }
    },

    mostrarErroresInput(pCampo) { 
      let camposIncorrectos = Object.keys(this.erroresInputs);
      if (camposIncorrectos.includes(pCampo)) {
        return this.erroresInputs[pCampo]
      } else {
        return []
      }
    },

    registrarIncripcion() {
      this.erroresInputs = []
      this.createMatriculaLoading = true
      if(this.$v.matricula.$invalid){
        this.$v.matricula.$touch
        return false
      }
      this.matriculaInputsDisable = true

      let matriculaForm = new FormData() //enrollment
      matriculaForm.append('carrera_id', this.matricula.carreraId)

      matricula.crearEnrollment(this.estudiante.id,this.matricula.cicloId,matriculaForm)
        .then( res => {
          let vaucherForm = new FormData()
          vaucherForm.append('codigo', this.matricula.codigoVaucher)
          vaucherForm.append('image', this.matricula.imagenVaucher)
          vaucherForm.append('fecha', this.matricula.fechaVaucher)
          vaucherForm.append('matricula_id', res.data.data.id)
          return matricula.crearVoucher(vaucherForm)
        })
        .then( res => {
          let codigoRes = res.status
          if(codigoRes == 200) {
            swal("Matrícula exitosa", "La matrícula se realizó exitosamente.","success")
            this.$router.push({ name: "misMatriculas"})

          }
        })
        .catch( err => {
          console.log(err.response.status)
          this.matriculaInputsDisable = false
          this.erroresInputs = err.response.data.error
          swal("Campos inválidos", "Por favor verifique que los datos en los campos sean válidos.","error")
        })
        .finally( () => {
          this.createMatriculaLoading = false
        })
    },

    obtenerCiclos() {
      generalData.getCiclosFilter('disponible')
        .then( res => {
          this.ciclos = res.data.data.map( i => ({ value : i.id, text : i.nombre}))
        })
        .catch( error => {
          console.log(error.response.status)
        })
    },

    obtenerAreas() {
      generalData.getAreas()
        .then( res => {
            this.areas = res.data.data.map( i => ({ value : i.id, text : i.nombre}))
        })
        .catch( error => {
          console.log(error.response.status)
        })
    },

  }
};
</script>

<style scoped>
.muni-box-shadow {
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, .10);
}
.input--error {
  color: red;
  font-size: 14px;
}
.loader-content {
  border: 1px solid #cad1d7;
  background-color: #fff;
  border-radius: 0.375rem;
}
</style>>
