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
      <base-pagination :total="5" :pageCount="2" :perPage="2" ></base-pagination>
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
        tableData: []
      }
    },
    created() {
      this.obtenerMatriculas()
    },
    methods: {
      obtenerMatriculas() {
        matricula.getEnrollments()
          .then( res => {
            console.log(res)
            let datos = res.data.data.map( (m, i) => ({
                num : i+1,
                ciclo: m.ciclo_id,
                area: m.carrera_id,
                carrera: m.carrera_id,
                statusType: m.estado,
                estado: m.estado
              }))
            this.tableData = datos
            console.log(datos)

          })
          .catch( err => {
            console.log(err)
          })
          .finally( () => {
            console.log("get enrollments end")
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
