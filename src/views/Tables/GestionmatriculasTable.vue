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
        <!-- <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div> -->
      </div>
    </div>

    <!-- LOADER -->
    <div class="app-loader-content card bg-secondary shadow border-0" v-show="componentLoading">
      <hash-loader class="loader" :loading="componentLoading" :size = "120"  :color="'#2B2D64'"/>
    </div>
    <!-- END LOADER -->

    <div class="table-responsive" v-show="!componentLoading" >
      <!-- ENROLLMENTS TABLE -->
      <base-table 
                  class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>N°</th>
          <th>Ciclo</th>
          <th>Area</th>
          <th>Carrera</th>
          <th>Estudiante</th>
          <th>Vauchers</th>
          <th>Estado</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.num}}
          </th>

          <td>
            {{ row.ciclo | ciclo }}
          </td>

          <td>
            {{ row.area | area }}
          </td>

          <td>
            <div class="dato">
            {{ row.carrera | carrera | subCadena }}
              <span class="dato--detalle" >
                {{ row.carrera | carrera }}
              </span>
            </div>
          </td>

          <td>
            <div class="nombre-loader-content" v-show="nombreLoader">
              <pulse-loader class="nombreLoader" :loading="nombreLoader" :size = "12"  :color="'#4FA898'"/>
            </div>
            <div class="dato" v-show="!nombreLoader">
              {{ nombreCompleto(row.estudiante) | subCadena }}
              <span class="dato--detalle" >
                {{ nombreCompleto(row.estudiante) }}
              </span>
            </div>
          </td>

          <td>
            <b-button 
              variant="outline-primary" 
              size="sm" 
              @click="mostrarDetallesVoucher(row.matricula)" 
            >Voucher(s)
            </b-button>
          </td>

          <td>
             <div class="nombre-loader-content" v-show="row.getStateLoading">
              <pulse-loader class="nombreLoader" :loading="row.getStateLoading" :size = "12"  :color="'#4FA898'"/>
            </div>
             <badge class="badge-dot mr-4" v-show="!row.getStateLoading">
              <i 
                :class="{ 'bg-success' : row.statusType == 'aprobado',
                          'bg-purple' : row.statusType == 'pendiente',
                          'bg-red' : row.statusType == 'desaprobado',
                          'bg-gray' : row.statusType == 'terminado'}">
              </i>
              <span class="status"
                    :class="{ 'text-success' : row.statusType == 'aprobado',
                          'text-purple' : row.statusType == 'pendiente',
                          'text-red' : row.statusType == 'desaprobado',
                          'text-gray' : row.statusType == 'terminado'}"
                >{{row.estado}}</span>
            </badge>
          </td>

           <td class="text-right">
            <base-dropdown class="dropdown" position="right" >
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
               <p class="dropdown-item" @click="cambiarEstadoMatricula(row,'pendiente')">Pendiente</p>
                <p class="dropdown-item" @click="cambiarEstadoMatricula(row,'aprobado')">Aprobado</p>
                <p class="dropdown-item" @click="cambiarEstadoMatricula(row,'desaprobado')">Desaprobado</p>
                <p class="dropdown-item" @click="cambiarEstadoMatricula(row,'terminado')">Terminado</p>
              </template>
            </base-dropdown>
          </td>

        </template>
      </base-table>

      <!-- VOUCHERS DATA -->
      <div  
        v-show = "showVouchers"
        class="card bg-secondary voucher">
        <!-- VOUCHER HEADER -->
        <div class="d-flex justify-content-center " >
          <div class="d-flex display-row justify-content-between my-4" style="width:95%">
            <h3>Voucher(s)</h3>
              <b-button 
                @click="cerrarDetallesVoucher"
                variant="outline-primary" 
                size="sm"
              >Volver</b-button>
          </div>
        </div>
        <!-- ENROLLMENT ID DATA -->
        <div class="d-flex justify-content-center mb-4">
          <b-card 
            bg-variant="" 
            :title="`Matrícula n° ${enrollmentData.num}`" 
            style="width:95%;"
            class="voucher-shadow"
            >
            <b-card-text class="d-flex justify-content-between">
              <div>
                <p style="margin:0" >Estudiante : {{ nombreCompleto(enrollmentData.estudiante) }} </p>
                <div style="margin:0" class="d-flex">Estado de matricula : 
                  <span v-show="enrollmentData.getStateLoading" class="ml-2">
                      <pulse-loader :loading="enrollmentData.getStateLoading" :size = "12"  :color="'#4FA898'"/>
                  </span>
                  <b  class="status"
                      v-show="!enrollmentData.getStateLoading"
                      :class="{ 'text-success' : enrollmentData.estado == 'aprobado',
                          'text-purple' : enrollmentData.estado == 'pendiente',
                          'text-red' : enrollmentData.estado == 'desaprobado',
                          'text-gray' : enrollmentData.estado == 'terminado'}"
                  > {{enrollmentData.estado}}</b>
                </div>
              </div>
              <base-dropdown class="dropdown" position="right" >
                <a slot="title" class="btn btn-sm btn-icon-only text-light bg-primary" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="ni ni-bold-down text-white" ></i>
                </a>
                <template>
                  <p class="dropdown-item" @click="cambiarEstadoMatricula(enrollmentData,'pendiente', true)">Pendiente</p>
                  <p class="dropdown-item" @click="cambiarEstadoMatricula(enrollmentData,'aprobado', true)">Aprobado</p>
                  <p class="dropdown-item" @click="cambiarEstadoMatricula(enrollmentData,'desaprobado', true)">Desaprobado</p>
                  <p class="dropdown-item" @click="cambiarEstadoMatricula(enrollmentData,'terminado', true)">Terminado</p>
                </template>
              </base-dropdown>
            </b-card-text>
          </b-card>
        </div>
        <!-- VOUCHER CARD LIST -->
        <div class="d-flex justify-content-center mb-4" 
              v-for="(voucher, index) in vouchersData" :key="`vou-${index}`" 
              style="oveflow:auto">
          <b-card no-body class="overflow-hidden voucher-shadow" style="max-width: 95%" >
            <b-row no-gutters>
              <b-col md="4">
                <b-card-img :src="voucher.imagen" class="rounded-0" style="max-height: 350px"></b-card-img>
              </b-col>
              <b-col md="4">
                <b-card-body :title="`COD: ${voucher.codigo}`">
                  <b-card-text>
                    <p>Fecha: {{ voucher.fecha }}</p>
                    <p>Estado: {{ voucher.estado }}</p>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </div>
      <!-- END VOUCHERS DATA -->
    </div>
    
    <!-- Footer -->
    <div class="card-footer d-flex justify-content-end"
        :class="type === 'dark' ? 'bg-transparent': ''"
        >
      <base-pagination 
        :pageCount="totalPage" 
        :perPage="perPage"
        :value="currentPage"
        @input="obtenerTodasMatriculas"
      ></base-pagination>
    </div>

  </div>
</template>
<script>
  import * as matricula from '@/api/matricula';
  import { getStudent } from "@/api/estudiante";

  export default {
    name: 'gestionmatriculas-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        //
        componentLoading: false,
        nombreLoader: false,
        getStateLoading: false,
        //
        showVouchers: false,
        //
        tableData: [],
        studentsData: [],
        //
        enrollmentData: {
          num : 1098,
          ciclo: 1,
          area: 35,
          carrera: 35,
          estudiante: 630,
          matricula: 1098,
          statusType: "pendiente",
          estado: "pendiente"
        },
        vouchersData: [],
        //PAGINATIONS
        count: 0,        //cantifad
        currentPage: 0,  //pagina actual
        total: 0,        //total
        perPage: 0,      //por pagina
        totalPage: 0,     //total de paginas
        links: {}          //navegacion
      }
    },
    created() {
      this.componentLoading = true
      matricula.getAllEnrollments(1)
        .then( response => {
          this.totalPage = response.data.meta.pagination.total_pages
          this.perPage = response.data.meta.pagination.per_page
          this.currentPage = response.data.meta.pagination.current_page
          this.total = response.data.meta.pagination.total
          this.count = response.data.meta.pagination.count
        })
        .catch( err => {
          console.log(err)
        })
        .finally( () => {
          this.componentLoading = false
        })
    },
    methods: {
      cambiarEstadoMatricula(obj, pEstado, pVoucherView=false) {
        obj.getStateLoading = true
        let estadoFormData = {
            estado: pEstado
        }
        matricula.updateEnrollment(obj.estudiante, obj.ciclo, obj.matricula, estadoFormData)
         .then( res => {
           if (pVoucherView === true){
                 this.$set(obj, "estado", res.data.data.estado)
                 this.$set(obj, "statusType", res.data.data.estado)
               }
             
          this.tableData.forEach( e => {
            if (e.matricula == obj.matricula) {
              this.$set(e, "estado", res.data.data.estado)
              this.$set(e, "statusType", res.data.data.estado)
            }
          })
         })
         .catch(err => {
           console.log(err.response)
         })
         .finally( () => {
            obj.getStateLoading = false
            // console.log("updateEnrollment end")
         })
      },
      cerrarDetallesVoucher() {
        this.showVouchers = false
        this.$emit("voucher-event", this.showVouchers)
        this.enrollmentData = {}
        this.vouchersData = []
      },
      mostrarDetallesVoucher(pIdMatricula) {
        this.showVouchers = true
        this.$emit("voucher-event", this.showVouchers);

        this.tableData.forEach(e => {
          if (e.num == pIdMatricula) {
            this.enrollmentData = {...e}
          }
        })
        matricula.getVouchersPerEnrollments(pIdMatricula)
          .then( res => {
            this.vouchersData = res.data.data.map( (m,i) => ({
              orden: i+1,
              id: m.id,
              codigo: m.codigo,
              imagen: m.imagen,
              fecha: m.fecha,
              estado: m.estado,
            }))
          })
          .catch( err => {
            if ( err.response.status ) console.log(err.response.status)
          })
          .finally(() => {
            console.log("get voucher per enrollment END")
          })

        // console.log(table)]
      },

      obtenerTodasMatriculas(pPage) {
        this.componentLoading = true
        matricula.getAllEnrollments(pPage)
          .then( res => {
            //mapeo de la respuesta
            let datos = res.data.data.map( m => {
              this.nombreLoader = true
              getStudent(m.estudiante_id)
                .then(res => {
                  this.studentsData.push({id:res.data.data.id, nombre:`${res.data.data.nombre} ${res.data.data.apellidos}`})
                })
                .finally( () => {
                  this.nombreLoader = false
                })
              return {
                  num : m.id,
                  ciclo: m.ciclo_id,
                  area: m.carrera_id,
                  carrera: m.carrera_id,
                  estudiante: m.estudiante_id,
                  matricula: m.id,
                  statusType: m.estado,
                  estado: m.estado,
                  getStateLoading: false
                }
            }).sort((a,b) => { //ordern acendente a>b return 1    --- descendente a>b return -1
              if (parseInt(a.num) > parseInt(b.num)) return -1
              if (parseInt(a.num) < parseInt(b.num)) return 1
              return 0
            })

            this.tableData = datos
            //
            // this.mostrarVouchers = datos.map( m => ({m.num : false}) ) 
            //paginacion
            let paginacion = res.data.meta.pagination
            this.count = paginacion.count
            this.currentPage = paginacion.current_page
            this.total = paginacion.total
            this.perPage = paginacion.per_page
            this.totalPage = paginacion.total_pages 
            this.links = paginacion.links
          })
          .catch( err => {
            console.log(err)
          })
          .finally( () => {
            // console.log("get AllEnrollments end")
            this.componentLoading = false
          })
      },
      nombreCompleto(pId) {
        let fullname = ''
        this.studentsData.forEach(e => {
          if(e.id === pId) fullname = e.nombre
        });
        return fullname 
      },
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
.voucher {
 position: absolute;
 top:0;
 z-index: 200;
 width: 100%;
}
.voucher-shadow {
 box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .10);
}
</style>
