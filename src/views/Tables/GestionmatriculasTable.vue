<template>
  <div class="card shadow"
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
      <base-table class="table align-items-center table-flush"
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

          <td class="budget">
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
              @click="mostrarVouchers(row.matricula)" 
            >Voucher(s)
            </b-button>
            <!-- <div class="voucher mt-3">
              <modal :show.sync="modalvoucher[row.num]">
                <h6 slot="header" class="modal-title" id="modal-title-default">Type your modal title</h6>

                <p>Far far away, behind the word mountains, far from the countries Vokalia and
                    Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                    right at the coast of the Semantics, a large language ocean.</p>
                <p>A small river named Duden flows by their place and supplies it with the necessary
                    regelialia. It is a paradisematic country, in which roasted parts of sentences
                    fly into your mouth.</p>

                <template slot="footer">
                    <base-button type="primary">Save changes</base-button>
                    <base-button type="link" class="ml-auto" @click="modals.modal1 = false">Close
                    </base-button>
                </template>
              </modal>
            </div> -->
          </td>

          <td>
             <badge class="badge-dot mr-4" :type="row.statusType | estadoMatricula">
              <i 
                :class="{ 'bg-sucees' : row.statusType == 'aprovado',
                          'bg-warning' : row.statusType == 'pendiente',
                          'bg-danger' : row.statusType == 'terminado'}">
              </i>
              <span class="status">{{row.estado}}</span>
            </badge>
          </td>

           <td class="text-right">
            <base-dropdown class="dropdown" position="right" >
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </template>
            </base-dropdown>
          </td>

        </template>
      </base-table>
    </div>

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
        //
        tableData: [],
        studentsData: [],
        modalvoucher: [],
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
          console.log("get first group enrollments end")
        })
    },
    methods: {
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
                  estado: m.estado
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
            console.log("get AllEnrollments end")
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
      mostrarVouchers(pID) {
        alert(pID)
      }
    }
  }
</script>
<style scoped>

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
  position: relative;
}
.voucher--content {
  position: absolute;

  transform-origin: top right;

}
</style>
