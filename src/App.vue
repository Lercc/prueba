<template>
  <div id="app">
    <notifications></notifications>
    <router-view/>
  </div>
</template>

<script>
import * as auth from '@/api/auth';
import { mapMutations } from 'vuex';
export default {

beforeCreate () {
  auth.getInitialToken()
    .then( res => {
      this.setAppToken(res.data.access_token)
    })
    .catch( error => {
      console.log(error)
    })
    .finally( () => {
      console.log("get token inicial end")
    })
  },

  methods: {
    ...mapMutations('appToken', [ "setAppToken" ] ),
    ...mapMutations('estudianteToken', [ "setEstudianteToken" ] ),
    ...mapMutations('usuario', [ "userIsAdmin" ] )
  }
}
</script>