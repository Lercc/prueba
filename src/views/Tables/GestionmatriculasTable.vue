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
        <div class="col text-right">
          <base-button type="primary" size="sm">See all</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
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
            {{ row.estudiante }}
          </td>

          <td>
            {{ row.matricula }}
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

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :total="5" :pageCount="2" :perPage="2" ></base-pagination>
    </div>

  </div>
</template>
<script>
  import * as matricula from '@/api/matricula';
  // import { getStudent } from "@/api/estudiante";

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
        tableData: [],
        //PAGINATIONS
        count: '',        //cantifad
        currentPage: '',  //pagina actual
        total: '',        //total
        perPage: '',      //por pagina
        totalPage: '',     //total de paginas
        links: {}          //navegacion
      }
    },
    created() {
      this.obtenerTodasMatriculas()
    },
    methods: {
      obtenerTodasMatriculas() {
        matricula.getAllEnrollments()
          .then( res => {
            console.log(res)
            let datos = res.data.data.map( (m, i) => ({
                num : i+1,
                ciclo: m.ciclo_id,
                area: m.carrera_id,
                carrera: m.carrera_id,
                estudiante: m.estudiante_id,
                matricula: m.id,
                statusType: m.estado,
                estado: m.estado
              }))
            this.tableData = datos
            console.log(datos)
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
          })
      },

      //estudiante
      // estudianteId(pID) {
      //   getStudent(pID)
      //     .then(res => {
      //       let { nombre, apellidos } = res.data.data
      //       store.state.temp.studentFullName = `${apellidos} ${nombre}`
      //     })
      //     .catch(err => {
      //       console.log(err)
      //       return "nan"
      //     })
      //   return `jj`
      // }

    }
  }
</script>
<style>
</style>
