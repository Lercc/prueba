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
          <!-- <base-button type="primary" size="sm">See all</base-button> -->
        </div>
      </div>
    </div>
    <!-- LOADER -->
    <div class="app-loader-content card bg-secondary shadow border-0" v-show="componentLoading">
      <hash-loader class="loader" :loading="componentLoading" :size = "120"  :color="'#2B2D64'"/>
    </div>
    <!-- END LOADER -->
    <div class="table-responsive" v-show="!componentLoading">
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
          <th>Estado</th>
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
            {{ row.carrera | carrera }}
          </td>

          <td>
             <badge class="badge-dot mr-4" :type="row.statusType | estadoMatricula">
              <b class="status"
                :class="{ 'text-success'   : row.statusType == 'aprobado',
                          'text-purple'  : row.statusType == 'pendiente',
                          'text-red'    : row.statusType == 'desaprobado',
                          'text-gray'   : row.statusType == 'terminado'}">
              <span class="status">{{row.estado}}</span>
              </b>
            </badge>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination 
      :pageCount="pagination.total_pages" 
      :perPage="pagination.per_page"
      :value="pagination.current_page"
      @input="obtenerMatriculas"
      >
      </base-pagination>
    </div>

  </div>
</template>
<script>
  import * as matricula from '@/api/matricula';

  export default {
    name: 'mismatriculas-table',
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
        tableData: [],
        //PAGINATIONS
        pagination:{
          count: 0,        //cantifad
          current_page: 0,  //pagina actual
          total: 0,        //total
          per_page: 0,      //por pagina
          total_pages: 0,    //total de paginas
          links: []        //links
        }       //navegacion
      }
    },
    created() {
      // this.obtenerMatriculas(1)
      matricula.getAllStudentEnrollments(1)
        .then( ({data}) => {
          [this.pagination] = [data.meta.pagination];
        }).catch( err => {
          console.log(err)
        })
        .finally( () => {
          this.componentLoading = false
        })
    },
    methods: {
      obtenerMatriculas(page) {
        matricula.getAllStudentEnrollments(page)
          .then( res => {
             [this.pagination] = [res.data.meta.pagination];
            let datos = res.data.data.map( (m, i) => ({
                num : i+1,
                ciclo: m.ciclo_id,
                area: m.carrera_id,
                carrera: m.carrera_id,
                statusType: m.estado,
                estado: m.estado
              }))
            this.tableData = datos

          })
          .catch( err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style scoped>
.muni-box-shadow {
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, .10);
}
</style>
