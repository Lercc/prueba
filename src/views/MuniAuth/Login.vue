<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <!-- CARD  -->
          <div class="card bg-secondary shadow border-0">
              <!-- CARD  TITLE -->
              <div class="card-header bg-transparent pb-2">
                  <div class="text-muted text-center mt-2 mb-3">
                      <h2 class="tituloFormulario">INICIO DE SESIÓN</h2>
                      <p>Ingrese con su correo y contraseña :</p>
                  </div>
              </div>
              <!-- CARD  BODY -->
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-muted mb-4">
                      <!-- FORMULARIO INCIO SESSION -->
                      <b-form >
                        <!-- Grupo ( CORREO) -->
                        <b-form-group 
                          label="Correo :"
                          >
                          <!-- <div class = "pb-1  loader-content" v-show="getEstudianteLoading || getCorreoEstudianteLoading" >
                            <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading || getCorreoEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                          </div> -->
                          <b-form-input
                            type = "email"
                            placeholder = "Ingrese su correo electrónico"
                            v-model = "correo"
                            >
                          </b-form-input>
                        </b-form-group>

                        <!-- Grupo ( CONTRASEÑA ) -->
                        <b-form-group 
                          label="Contraseña :"
                          >
                          <!-- <div class = "pb-1  loader-content" v-show="getEstudianteLoading" >
                            <pulse-loader class="mt-2 ml-3"  :loading="getEstudianteLoading" :size = "15" :color="'#4FA898'"/>
                          </div> -->
                          <b-form-input
                            type = "password"
                            placeholder = "Ingrese una contraseña"
                            v-model = "contrasenia"
                            >
                          </b-form-input>
                        </b-form-group>

                        <b-button variant="primary" @click="getTokenEstudiante" >ENTRAR</b-button>
                      </b-form>
                </div>
              </div>
          </div>
          <!-- END CARD -->
        </div>
    </div>
</template>
<script>
import * as auth from '@/api/auth'
import { getMe } from '@/api/generalData'
import { mapMutations } from 'vuex'

import swal from 'sweetalert';


  export default {
    data() {
      return {
          correo: '',
          contrasenia: '',
      };
    },
    methods: {
      ...mapMutations('estudianteToken', ['setEstudianteToken']),
      ...mapMutations('estudiante', ['guardarId']),

      getTokenEstudiante() {
        auth.getStudentToken(this.correo,this.contrasenia)
          .then( res => {
            this.setEstudianteToken(res.data.access_token)
            return getMe()
          })
          .then( res => {
            if (res.data.admin == "true") {
              console.log("is admin")
            } else {
              this.guardarId(res.data.id)
              this.$router.push({ name: "matricula"});
            }
          })
          .catch( error => {
            console.log(error.response.status)
            swal("Datos ingresados incorrectos","El correo o la contraseña no son válidos","error")
          })
          .finally( () => {
            console.log("get token estudiante  end")
          })
      }
    }
  };
</script>
<style lang="scss" scoped>
@import '@/scss/styles.scss';

.bg-nav-muni-auth {
  @extend %bg-nav-muni-auth;
}
.bg-poligon-muni-auth{
  @extend %bg-nav-muni-auth;
}
.tituloFormulario {
  color: $secondary-blue;
  font-weight: 700;
}
.loader-content {
  border: 1px solid #cad1d7;
  background-color: #fff;
  border-radius: 0.375rem;
}
.input--error {
  color: red;
  font-size: 14px;
}
</style>