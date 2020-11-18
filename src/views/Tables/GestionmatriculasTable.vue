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
            {{ row.carrera | carrera | subCadena }}
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

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
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
      this.obtenerTodasMatriculas(1)
    },
    methods: {
      obtenerTodasMatriculas(pPage) {
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
<style>
</style>
