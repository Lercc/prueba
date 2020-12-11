<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
         
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row ">
                <div class="col">
                  <mismatriculas-table type="Dark"  title="Listado de matriculas" />
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import MismatriculasTable from '@/views/Tables/MismatriculasTable'
  export default {
    name: 'misMatriculas',
    components: { 
        // ProjectsTable, 
        MismatriculasTable,
    }
  };
</script>
<style></style>
