<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row ">
                <div class="col">
                    <gestionmatriculas-table 
                        type="Dark" 
                        title="Listado de matriculas" 
                        @voucher-event="toggleBgPopUp"/>
                </div>
            </div>
        </div>
        <!-- BG VOUCHER POP-UP -->
        <div class="bg-voucher-pop-up" v-show="showBgPopUp">
        </div>
    </div>
</template>
<script>
  import GestionmatriculasTable from '@/views/Tables/GestionmatriculasTable'
  export default {
    name: 'misMatriculas',
    components: { 
        GestionmatriculasTable
    },
    data() {
        return {
            showBgPopUp : false
        }
    },
    methods:{
        toggleBgPopUp(pMostrar) {
            this.showBgPopUp = pMostrar
        }
    }
  };
</script>
<style scoped>
.bg-voucher-pop-up {
    position: absolute;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100% ;
    background-color: rgba(0,0,0,.45);
    
}
</style>
