<template>
  <div id="app">
    <notifications v-show="!componentLoading"></notifications>
    <router-view v-show="!componentLoading"/>
    <!-- <div class="app-loader-content " v-show="componentLoading">
      <hash-loader class="loader" :loading="componentLoading" :size = "120"  :color="'#2B2D64'"/>
    </div> -->
  </div>
</template>

<script>
import * as auth from '@/api/auth';
import { mapMutations, mapState } from 'vuex';
export default {

  data() {
    return {
      componentLoading: true,
    }
  },

  computed: {
    ...mapState('usuario',["admin","token"])
  },

  beforeCreate () {
    // this.componentLoading = true
    auth.getInitialToken()
      .then( res => {
        this.setAppToken(res.data.access_token)
        this.cargarLocalStorageData()
      })
      .catch( error => {
        console.log(error)
      })
      .finally( () => {
        this.componentLoading = false
      })
  },

    methods: {
      ...mapMutations('appToken', [ "setAppToken" ] ),
      ...mapMutations('usuario', [ "userIsAdmin", "setUsuarioToken"]),
      ...mapMutations('estudiante', ['guardarId']),
    
      cargarLocalStorageData() {
        if (localStorage.getItem("admin")==="true") this.userIsAdmin(true)
        else this.userIsAdmin(false)

        if (localStorage.getItem("userToken")) this.setUsuarioToken(localStorage.getItem("userToken"))
        if (localStorage.getItem("id")) this.guardarId(localStorage.getItem("id"))

        if (this.admin && this.token ) this.$router.push({ name: "MuniAdmin" })
        if (!this.admin && this.token ) this.$router.push({ name: "MuniAulaVirtual" })
      }
    }
}
</script>

<style scoped>
.app-loader-content {
  top: 250px;
  position:relative;
  width: 100%;
}
.loader {
  left: 50%;
  transform:translate(-50%, -50%);
}
</style>