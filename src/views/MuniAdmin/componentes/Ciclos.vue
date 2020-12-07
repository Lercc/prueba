<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row ">
                <div class="col">
                    <ciclos-table type="Dark"  title="Listado de Ciclos" />
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import CiclosTable from '@/views/Tables/CiclosTable'
  export default {
    name: 'Ciclos',
    components: { 
        CiclosTable
    }
  };
</script>
<style></style>
