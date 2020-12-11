<template>
    <div class="card muni-box-shadow"
        :class="type === 'dark' ? 'bg-default': ''">
      <div class="card-header border-0"
              :class="type === 'dark' ? 'bg-transparent': ''">
          <div class="row align-items-center">
              <div class="col">
                  <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                      {{title}}
                  </h3>
              </div>
              <div class="col text-right">
                <base-button type="primary" size="sm" @click="showCreateFormPopUp">Crear Ciclo</base-button>
              </div>
          </div>
      </div>

    <!-- LOADER -->
    <div class="app-loader-content card bg-secondary shadow border-0" v-show="componentLoading">
      <hash-loader class="loader" :loading="componentLoading" :size = "120"  :color="'#2B2D64'"/>
    </div>
    <!-- END LOADER -->

    <div class="table-responsive" v-show="!componentLoading" style="min-height:750px">
      <!-- CICLOS DATA -->
      <base-table
                  class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>N°</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Empieza</th>
          <th>Termina</th>
          <th>Duración</th>
          <th>Estado</th>
          <th>Acciones</th>

        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.id}}
          </th>

          <td >
            {{ row.nombre }}
          </td>

          <td>
            {{ row.descripcion }}
          </td>

          <td>
            <div >
              {{ row.inicio }}
            </div>
          </td>

          <td>
            {{ row.fin }}
          </td>

          <td>
            <div>
            {{ row.cantidad }} {{ row.duracion }}
            </div>
          </td>


          <td>
            <badge class="badge-dot mr-4">
              <i 
                :class="{ 'bg-success' : row.estado == 'disponible',
                          'bg-purple' : row.estado == 'pendiente',
                          'bg-red' : row.estado == 'desaprobado',
                          'bg-gray' : row.estado == 'terminado'}">
              </i>
              <span class="status"
                    :class="{ 'text-success' : row.estado == 'disponible',
                          'text-purple' : row.estado == 'pendiente',
                          'text-red' : row.estado == 'desaprobado',
                          'text-gray' : row.estado == 'terminado'}"
                >{{row.estado}}</span>
            </badge>
          </td>

          <td class="text-right">
            <base-dropdown class="dropdown" position="right" >
              <a slot="title" class="btn btn-sm btn-icon-only text-light text-left" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <p class="dropdown-item" @click="showEditFormPopUp(row.id)">Editar</p>
                <p class="dropdown-item" @click="deleteCycleData(row.id)">Eliminar</p>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>

      <!-- CICLOS POP UP -->
      <div  class="card bg-secondary ciclos" v-show="formCicloPopUp">
        <!-- CICLOS POP UP HEADER -->
        <div class="d-flex justify-content-center " >
          <div class="d-flex display-row justify-content-between my-4" style="width:95%">
              <h3 v-show="showCreateForm">Crear nuevo Ciclo</h3>
              <h3 v-show="showEditForm">Editar Ciclo</h3>
              <b-button 
                @click="closeCycleFormPopUp"
                variant="outline-primary" 
                size="sm">Volver
              </b-button>
          </div>
        </div>
        <!-- CICLOS POP UP FORM -->
        <div class="d-flex justify-content-center mb-4">
          <b-card 
            bg-variant="" 
            title="Datos del Ciclo" 
            style="width:95%;"
            class="ciclos-shadow"
            >

            <b-card-text class="d-flex justify-content-center my-2">
              <b-form  class="col-md-12 col-lg-10 col-lx-9">
                <!-- Grupo 1( CYCLE NAME) -->
                <b-form-group
                  label="1. Nombre del ciclo:"
                >
                  <div class = "pb-1 cycle-loader-content" v-show="cyclePopUpDataLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="cyclePopUpDataLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!cyclePopUpDataLoading"
                    type = "text"
                    placeholder = "Ingrese el nombre del ciclo"
                    v-model = "$v.cyclePopUpData.nombre.$model"
                    :state = "$v.cyclePopUpData.nombre.$dirty ? !$v.cyclePopUpData.nombre.$invalid : null"
                    @change = "verifyCycleFormData"
                    @blur = "touchAllValidations"
                    
                  ></b-form-input>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.cyclePopUpData.nombre.required"> * el campo nombre es requerido</span>
                  </b-form-invalid-feedback>

                  <!-- <span 
                    class="input--error" 
                    v-for="(dniEstError, index) in mostrarErroresInput('dni')" 
                    :key="`dniEstError-${index}`">{{ dniEstError }}
                    </span> -->
                </b-form-group>

                <!-- Grupo 2 ( CYCLE DESCRIPTION) -->
                <b-form-group 
                  label="2. Descripción del ciclo:"
                >
                  <div class = "pb-1 cycle-loader-content" v-show="cyclePopUpDataLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="cyclePopUpDataLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!cyclePopUpDataLoading"
                    type = "text"
                    placeholder = "Ingrese una descripción:"
                    v-model = "$v.cyclePopUpData.descripcion.$model"
                    :state = "$v.cyclePopUpData.descripcion.$dirty ? !$v.cyclePopUpData.descripcion.$invalid : null"
                    @keyup = "verifyCycleFormData"
                    @blur = "touchAllValidations"
                    >
                  </b-form-input>

                  <b-form-invalid-feedback>
                      <span v-show = "!$v.cyclePopUpData.descripcion.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                </b-form-group>

                <!-- Grupo 3 ( CYCLE STATE ) -->
                <b-form-group 
                  label="3. Estado del ciclo:"
                  >
                  <div class = "pb-1 cycle-loader-content" v-show="cyclePopUpDataLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="cyclePopUpDataLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-select
                    v-show="!cyclePopUpDataLoading" 
                    v-model = "$v.cyclePopUpData.estado.$model"
                    :options = "cicleState"
                    :state = "$v.cyclePopUpData.estado.$dirty ? !$v.cyclePopUpData.estado.$invalid : null"
                    @change = "verifyCycleFormData"
                    >
                    <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione un estado --</b-form-select-option>
                    </template>

                  </b-form-select>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.cyclePopUpData.estado.required"> * el campo es requerido</span>
                  </b-form-invalid-feedback>

                  <!-- <span 
                    class="input--error" 
                    v-for="(provEstuError, index) in mostrarErroresInput('provincia')" 
                    :key="`provEstuError-${index}`">{{ provEstuError }}
                  </span> -->

                </b-form-group>

                <!-- Grupo 4 ( START DATE) -->
                <b-form-group 
                  label="4. Fecha de inicio del ciclo:"
                  >
                  <div class = "pb-1 cycle-loader-content" v-show="cyclePopUpDataLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="cyclePopUpDataLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!cyclePopUpDataLoading"
                    type = "date"
                    min="2020-12-10" 
                    max="2030-12-31"
                    placeholder = "Ingresa la fecha de inicio"
                    v-model = "$v.cyclePopUpData.inicio.$model"
                    :state = "$v.cyclePopUpData.inicio.$dirty ? !$v.cyclePopUpData.inicio.$invalid : null"
                    @blur = "touchAllValidations"
                    @change="calculateDays"
                    >
                    </b-form-input>

                    <b-form-invalid-feedback>
                      <span v-show = "!$v.cyclePopUpData.inicio.required"> * el campo es requerido</span>
                    </b-form-invalid-feedback>

                    <!-- <span 
                      class="input--error" 
                      v-for="(nacimEstuError, index) in mostrarErroresInput('fecha_nacimiento')" 
                      :key="`nacimEstuError-${index}`">{{ nacimEstuError }}
                    </span> -->

                </b-form-group>

                <!-- Grupo 5 ( FINISH DATE) -->
                <b-form-group 
                  label="5. Fecha de finalización del ciclo:"
                  >
                  <div class = "pb-1 cycle-loader-content" v-show="cyclePopUpDataLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="cyclePopUpDataLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-input
                    v-show="!cyclePopUpDataLoading"
                    type = "date"
                    min="2020-12-10"
                    max="2030-12-31"
                    placeholder = "Ingresa la fecha de inicio"
                    v-model = "$v.cyclePopUpData.fin.$model"
                    :state = "$v.cyclePopUpData.fin.$dirty ? !$v.cyclePopUpData.fin.$invalid : null"
                    @blur = "touchAllValidations"
                    @change="calculateDays"
                    @keyup = "verifyCycleFormData"

                    >
                    </b-form-input>

                    <b-form-invalid-feedback>
                      <span v-show = "!$v.cyclePopUpData.fin.required"> * el campo es requerido</span>
                    </b-form-invalid-feedback>

                    <!-- <span 
                      class="input--error" 
                      v-for="(nacimEstuError, index) in mostrarErroresInput('fecha_nacimiento')" 
                      :key="`nacimEstuError-${index}`">{{ nacimEstuError }}
                    </span> -->

                </b-form-group>

                <!-- Grupo 6 ( DURACION) -->
                <b-form-group 
                  label="6. Duración:"
                  >
                  <div class = "pb-1 cycle-loader-content" v-show="cyclePopUpDataLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="cyclePopUpDataLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <div class="d-flex flex-row flex-wrap">
                    <b-form-input
                      v-show="!cyclePopUpDataLoading"
                      class="col-6 text-center"
                      type = "number"
                      placeholder = "duración"
                      v-model = "$v.cyclePopUpData.cantidad.$model"
                      :state = "$v.cyclePopUpData.cantidad.$dirty ? !$v.cyclePopUpData.cantidad.$invalid : null"
                      @change = "verifyCycleFormData"
                      disabled
                      >
                    </b-form-input>
                    <b-form-input
                      v-show="!cyclePopUpDataLoading"
                      class="col-6 text-center"
                      type="text"
                      placeholder = "duración"
                      v-model = "$v.cyclePopUpData.duracion.$model"
                      :state = "$v.cyclePopUpData.duracion.$dirty ? !$v.cyclePopUpData.duracion.$invalid : null"
                      disabled
                      >
                    </b-form-input>
                  
                    <b-form-invalid-feedback class="">
                      <span v-show = "!$v.cyclePopUpData.cantidad.required"> * el campo es requerido</span>
                    </b-form-invalid-feedback>
                  </div>


                  <!-- <span 
                    class="input--error" 
                    v-for="(nacimEstuError, index) in mostrarErroresInput('fecha_nacimiento')" 
                    :key="`nacimEstuError-${index}`">{{ nacimEstuError }}
                  </span> -->

                </b-form-group>
                <!-- Mostrar data de categorías de moodle -->
                <b-form-group
                  label="1. Categoría de Moodle:"
                >
                  <div class = "pb-1 cycle-loader-content" v-show="cyclePopUpDataLoading" >
                    <pulse-loader class="mt-2 ml-3"  :loading="cyclePopUpDataLoading" :size = "15" :color="'#4FA898'"/>
                  </div>

                  <b-form-select 
                    v-show="!cyclePopUpDataLoading"
                    v-model = "$v.cyclePopUpData.categoria_moodle_id.$model"
                    @blur = "verifyCycleFormData"
                    @change = "verifyCycleFormData"
                    :options = "Object.values(categorias_moodle)"
                    :state = "$v.cyclePopUpData.categoria_moodle_id.$dirty ? !$v.cyclePopUpData.categoria_moodle_id.$invalid : null"
                    
                    >
                    <template #first>
                      <b-form-select-option value="" disabled>-- Seleccione categoría Moodle--</b-form-select-option>
                    </template>

                  </b-form-select>

                  <b-form-invalid-feedback>
                    <span v-show = "!$v.cyclePopUpData.categoria_moodle_id.required"> * el campo nombre es requerido</span>
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group
                  label-align	="center"
                  style="text-align:center;"
                  class="mt-5"
                >
                  <b-button variant="success" 
                    :disabled="btnCreateOrEditCycleDisabled"
                    v-show="showCreateForm"
                    @click="createCycle" >CREAR CICLO
                  </b-button>
                  <b-button variant="success" 
                    :disabled="btnCreateOrEditCycleDisabled"
                    v-show="showEditForm"
                    @click="editCycle" >EDITAR CICLO
                  </b-button>
                  <p class="text-success" v-show="btnCreateOrEditCycleDisabled" >Rellenar todos los campos para enviar.</p>
                </b-form-group>
              </b-form>
            </b-card-text>
          </b-card>
        </div>
      </div>
      <!-- END VOUCHERS DATA -->
    </div>

    <div class="card-footer d-flex justify-content-end"
        :class="type === 'dark' ? 'bg-transparent': ''"
        >
      <base-pagination
        :pageCount="pagination.total_pages" 
        :perPage="pagination.per_page"
        :value="pagination.current_page"
        @input="getCiclos"
      ></base-pagination>
    </div>
  </div>
</template>
<script>
  import * as ciclo from '@/api/ciclo';
  
  import { validationMixin } from 'vuelidate' 
  import { required } from 'vuelidate/lib/validators';
  import swal from 'sweetalert';


  export default {
    name: 'ciclos-table',
    mixins: [validationMixin],
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        //
        cyclePopUpDataLoading: false,
        componentLoading: false,
        //
        formCicloPopUp: false,
        showCreateForm: false,
        showEditForm: false,
        btnCreateOrEditCycleDisabled: true,
        //
        cicleState: [ 'disponible', 'pendiente', 'desaprobado', 'terminado' ],
        //
        tableData: [],
        //CICLO DATA
        cyclePopUpData: {
          id: '',
          nombre : '',
          descripcion: '',
          cantidad: '',
          duracion:"Días",
          inicio:'',
          fin: '',
          estado: '',
          categoria_moodle_id:'',
        },
        categorias_moodle:[],
        //PAGINATIONS
        pagination:{
          count: 0,        //cantifad
          current_page: 0,  //pagina actual
          total: 0,        //total
          per_page: 0,      //por pagina
          total_pages: 0,    //total de paginas
          links: []        //links
        } 
      }
    },
    validations: {
      cyclePopUpData: {
        nombre: {
          required,
        },
        descripcion: {
          required,
        },
        estado: {
          required
        },
        inicio: {
          required,
        },
        fin: {
          required,
        },
        cantidad: {
          required
        },
        duracion: {
          required
        },
        categoria_moodle_id:{
          required
        }
      }
    },
    created() {
      this.componentLoading = true
      // this.getCiclos(1);
      ciclo.getCiclos(1)
        .then( ({data}) => {
          [this.pagination] = [data.meta.pagination];
        })
      this.getCategoriasMoodle();
    },
    methods: {
      getCategoriasMoodle(){
        ciclo.getMoodleCategories()
        .then( ({data})=> this.categorias_moodle = data.data)
      },
      getCiclos(pPage) {
        this.componentLoading = true
        ciclo.getCiclos(pPage)
          .then( ({data}) => {
            //mapeo de la respuesta
            [this.pagination] = [data.meta.pagination];
            this.tableData  = data.data.sort((a,b) => {
              if (a.id > b.id) return -1
              if (a.id < b.id) return 1
              return 0
            });
          })
          .catch( err => {
            console.log(err)
          })
          .finally( () => {
            this.componentLoading = false
          })
      },
      closeCycleFormPopUp() {
        this.formCicloPopUp = false
        this.btnCreateOrEditCycleDisabled = true
        this.showCreateForm = false
        this.showEditForm = false
        this.cyclePopUpData = {
          id: '',
          nombre : '',
          descripcion: '',
          cantidad: '',
          duracion: 'Días',
          inicio:'',
          fin: '',
          estado: '',
          categoria:''
        },
        this.$emit("cycle-event", this.formCicloPopUp)
      },
      showCreateFormPopUp() {
        this.$v.cyclePopUpData.$reset()
        this.formCicloPopUp = true
        this.showCreateForm = true
        this.$emit("cycle-event", this.formCicloPopUp)
      },
      showEditFormPopUp(pId) {
        this.$v.cyclePopUpData.$touch()
        this.tableData.forEach(el => {
          if( el.id === pId) {
            [ this.cyclePopUpData ] = [ el ]
          }
        })

        this.formCicloPopUp = true
        this.showEditForm = true
        this.$emit("cycle-event", this.formCicloPopUp)

      },
      verifyCycleFormData() {
        console.log(this.$v.cyclePopUpData.$invalid);
        if (!this.$v.cyclePopUpData.$invalid ) {
          this.btnCreateOrEditCycleDisabled = false
        } else {
          this.btnCreateOrEditCycleDisabled = true
        }
      },
      touchAllValidations() {
        this.$v.cyclePopUpData.$touch()
      },
      // isLetter(e) {
      //   let char = String.fromCharCode(e.keyCode);
      //   if(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/.test(char)) return true;
      //   else e.preventDefault();
      // },
      isNumber(e){
        let char = String.fromCharCode(e.keyCode);
        if(/^[0-9]+$/.test(char)) return true;
        else e.preventDefault();
      },
      calculateDays() {
        if(this.cyclePopUpData.inicio !== "" && this.cyclePopUpData.fin !== "") {
          let inicio = new Date(this.cyclePopUpData.inicio)
          let fin = new Date(this.cyclePopUpData.fin)
          let diff = (fin - inicio)  / (1000*60*60*24)
          this.cyclePopUpData.cantidad = diff
          this.verifyCycleFormData()
        }
      },
      createCycle() {
        this.cyclePopUpDataLoading = true
        let cycleFormData = new FormData()
        cycleFormData.append('nombre',this.cyclePopUpData.nombre)
        cycleFormData.append('descripcion',this.cyclePopUpData.descripcion)
        cycleFormData.append('estado',this.cyclePopUpData.estado)
        cycleFormData.append('cantidad',this.cyclePopUpData.cantidad)
        cycleFormData.append('duracion',this.cyclePopUpData.duracion)
        cycleFormData.append('inicio',this.cyclePopUpData.inicio)
        cycleFormData.append('fin',this.cyclePopUpData.fin)
        cycleFormData.append('categoria_moodle_id',this.cyclePopUpData.categoria_moodle_id)

        ciclo.createCiclo(cycleFormData)
          .then(( {data} ) => {
            [this.cyclePopUpData] = [data.data]
            this.tableData.unshift(this.cyclePopUpData)
            this.closeCycleFormPopUp()
            swal("Creacion Exitosa","Ciclo creado correctamente","success")
          })
          .catch(err => {
            if(err.response) {
              console.log('err.response.data:',err.response.data)
              console.log('err.response.status:',err.response.status)
              console.log('err.response.headers:',err.response.headers)
            } else if (err.request) {
              console.log("err.request:",err.request)
            } else {
              console.log('ERROR', err.message)
            }
          })
          .finally(() => {
            console.log('end create ciclo')
            this.cyclePopUpDataLoading = false
          })
      },
      editCycle() {
        this.cyclePopUpDataLoading = true
        let cycleObjectData = {
          'nombre': this.cyclePopUpData.nombre,
          'descripcion': this.cyclePopUpData.descripcion,
          'estado': this.cyclePopUpData.estado,
          'cantidad': this.cyclePopUpData.cantidad,
          'duracion': this.cyclePopUpData.duracion,
          'inicio': this.cyclePopUpData.inicio,
          'fin': this.cyclePopUpData.fin,
          'categoria_moodle_id':this.cyclePopUpData.categoria_moodle_id
        }
  
        ciclo.updateCiclo(cycleObjectData,this.cyclePopUpData.id)
          .then(( {data} ) => {
            [this.cyclePopUpData] = [data.data]
            this.tableData.forEach(el => {
              if(el.id === this.cyclePopUpData.id) {
                [el] = [this.cyclePopUpData] 
              }
            });
            this.closeCycleFormPopUp()
            swal("Edición Exitosa","Ciclo actualizado correctamente","success")
          })
          .catch(err => {
            if(err.response) {
              console.log('err.response.data:',err.response.data)
              console.log('err.response.status:',err.response.status)
              console.log('err.response.headers:',err.response.headers)
            } else if (err.request) {
              console.log("err.request:",err.request)
            } else {
              console.log('ERROR', err.message)
            }
          })
          .finally(() => {
            console.log('end create ciclo')
            this.cyclePopUpDataLoading = false
          })
      },
      deleteCycleData(cycleId) {
        swal({
          title: "¿Estás seguro de eliminar este ciclo?",
          text: "Eliminar el ciclo es un accion irreversible",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((okBorrar) => {
          if (okBorrar) {
            ciclo.deleteCiclo(cycleId)
              .then( ( {data} ) => {
                this.tableData.forEach((el,i) => {
                  if(el.id === data.id) {
                    this.tableData.splice(i,1)
                  }
                });
                swal("El ciclo ha sido eliminado!", {
                  icon: "success",
                })
              })
              .catch( err => {
                console.log('err',err)
              })
          }
        });
      }
    }
  }
</script>
<style scoped>
.muni-box-shadow {
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, .10);
}
/* spiner */
.app-loader-content {
  height: 450px;
}
.loader {
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
}

/*  */
.dato {
  position: relative;
}
.dato--detalle {
  position: absolute;
  bottom: 100%;
  left: 0;
  padding: 9px 9px;
  margin-bottom: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff !important;
  border-radius: 3px;
  transform-origin: left bottom;
  transform: scale(0);
  transition: ease-in .20s all
}
.dato:hover .dato--detalle{
  transform: scale(1);
}
/* */
.ciclos {
 position: absolute;
 top:0;
 z-index: 200;
 width: 100%;
}
.ciclos-shadow {
 box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .10);
}
.cycle-loader-content {
  border: 1px solid #cad1d7;
  background-color: #fff;
  border-radius: 0.375rem;
}
</style>
