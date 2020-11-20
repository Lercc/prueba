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
            {{ nombreCompleto(row.estudiante) }}
          </td>

          <td>
            <b-button 
              variant="outline-primary" 
              size="sm" 
              @click="mostrarVouchers(row.matricula)" 
            >Voucher(s)</b-button>
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
        //
        tableData: [],
        studentsData: [],
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
              getStudent(m.estudiante_id)
                .then(res => {
                  this.studentsData.push({id:res.data.data.id, nombre:`${res.data.data.nombre} ${res.data.data.apellidos}`})
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

}
</style>
