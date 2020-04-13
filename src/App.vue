<template>
  <div id="app">
      <div v-show="islogin">
      <header id="header" class="noprint"> <span>QUARANTINE PASS MANAGEMENT SYSTEM</span></header>
      <sideNav class="noprint"/>
    
        <div id="mainBody">
           <router-view/>
        </div>
      </div>
      
      <div id="login" v-if="!islogin">
         <login/>
      </div>  
  </div>
</template>

<script>
import sideNav from '@/components/navigator/sidenavComponent'
import login from '@/components/LoginComponent'
import { mapState } from 'vuex'
export default {
  name: 'App',
  data: function(){
    return {
      // islogin: this.$store.state.islogin || false,
    }
  },
  mounted(){
    let app = this
    if(!app.islogin) app.$router.replace("/")
  },
  computed: {
    ...mapState([
        'islogin'
    ])
  },
  methods:{

   
  },
  components: {
   sideNav,
   login
  }
}
</script>

<style>

@media print {
  
    .noprint {
        display: none;
    }
}
</style>
