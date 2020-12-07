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
          </div>
      </div>

    <!-- LOADER -->
    <div class="app-loader-content card bg-secondary shadow border-0" v-show="componentLoading">
      <hash-loader class="loader" :loading="componentLoading" :size = "120"  :color="'#2B2D64'"/>
    </div>
    <!-- END LOADER -->

    <div class="table-responsive" v-show="!componentLoading" >
      <base-table 
                  v-show = "!showAcciones"
                  class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>N°</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Cantidad</th>
          <th>Empieza</th>
          <th>Termina</th>
          <th>Estado</th>
          <th>Acciones</th>

        </template>

        <template slot-scope="{row}">
          <th scope="row">
            {{row.id}}
          </th>

          <td class="budget">
            {{ row.nombre }}
          </td>

          <td>
            {{ row.descripcion }}
          </td>

          <td>
            <div class="dato">
            {{ row.cantidad }}
              <span class="dato--detalle" >
                {{ row.duracion }}
              </span>
            </div>
          </td>

          <td>
            <div class="nombre-loader-content" v-show="nombreLoader">
              <pulse-loader class="nombreLoader" :loading="nombreLoader" :size = "12"  :color="'#4FA898'"/>
            </div>
            <div class="dato" v-show="!nombreLoader">
              {{ row.inicio }}
            </div>
          </td>

          <td>
            {{ row.fin }}
          </td>

          <td>
            <div class="nombre-loader-content" v-show="row.getStateLoading">
              <pulse-loader class="nombreLoader" :loading="row.getStateLoading" :size = "12"  :color="'#4FA898'"/>
            </div>
            <badge class="badge-dot mr-4" v-show="!row.getStateLoading">
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

    </div>

    <div class="card-footer d-flex justify-content-end"
        :class="type === 'dark' ? 'bg-transparent': ''"
        >
      <base-pagination 
        v-show="!showAcciones"
        :pageCount="pagination.totalPage" 
        :perPage="pagination.perPage"
        :value="pagination.currentPage"
        @input="getCiclos"
      ></base-pagination>
    </div>
  </div>
</template>
<script>
  import * as ciclo from '@/api/ciclo';

  export default {
    name: 'ciclos-table',
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
        showAcciones: false,  // eliminar
        //
        tableData: [],
        studentsData: [], // eliminar
        //CICLO DATA
        cicloData: {
          nombre : '',
          descripcion: '',
          cantidad: 0,
          duracion:0,
          inicio:'',
          fin: '',
          termina: '',
          estado: "pendiente",
          links:[]
        },
        vouchersData: [],//eliminar
        //PAGINATIONS
        pagination:{
          count: 0,        //cantifad
          currentPage: 0,  //pagina actual
          total: 0,        //total
          perPage: 0,      //por pagina
          totalPage: 0,    //total de paginas
          links: []        //links
        } 
      }
    },
    created() {
      this.componentLoading = true
      this.getCiclos(1);
    },
    methods: {
      getCiclos(pPage) {
        this.componentLoading = true
        ciclo.getCiclos(pPage)
          .then( ({data}) => {
            //mapeo de la respuesta
            [this.cicloData] = [data.data];
            [this.pagination] = [data.meta.pagination];
            this.tableData = this.cicloData;
          })
          .catch( err => {
            console.log(err)
          })
          .finally( () => {
            this.componentLoading = false
          })
      },
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
.voucher-shadow {
 box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .10);
}
</style>
