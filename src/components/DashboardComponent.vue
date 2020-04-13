<template>
    <div>
         <span class="pageheader"><i class="fa fa-chart-pie"></i> Dashboard</span><hr/>
         <div class="col col-md-6">

             <div class="card">
                 <div class="card-header bg-primary"></div>
                 <div class="card-body">
                     <table class="table">
                         <thead class="table-dark">
                             <tr>
                                <th>Barangay</th>
                                <th>Registered Family</th>
                                <th>Estimated Population</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr v-for="(tdata,index) in getData.tabledata" :key="index">
                                 <td>{{tdata.barangay}}</td>
                                 <td>{{tdata.registeredFamilies}}</td>
                                 <td>{{tdata.registeredMembers}}</td>
                             </tr>
                         </tbody>
                     </table>
                 </div>
             </div>
            
         </div>

        <div class="col col-md-6">
                <div class="row">
                         <div class="col col-md-6">
                                <div class="card">
                                    <div class="card-header bg-primary"></div>
                                   <div class="card-body ditem">
                                        <span style="font-size: 40pt;" class="fa fa-city"></span>
                                        <span class="dashboard-item">Barangays</span>
                                        <span class="dashboard-item-count">{{getData.barangaycount}}</span>
                                    </div>

                                </div>
                         </div>
                          <div class="col col-md-6">
                                <div class="card">
                                    <div class="card-header bg-primary"></div>
                                   <div class="card-body ditem">
                                        <span style="font-size: 40pt;" class="fa fa-road"></span>
                                        <span class="dashboard-item">Streets</span>
                                        <span class="dashboard-item-count">{{getData.streetcount}}</span>
                                    </div>

                                </div>
                         </div>
                </div>
                <div class="row">
                         <div class="col col-md-6">
                                <div class="card">
                                    <div class="card-header bg-primary"></div>
                                   <div class="card-body ditem">
                                        <span style="font-size: 40pt;" class="fa fa-cog"></span>
                                        <span class="dashboard-item">Users</span>
                                        <span class="dashboard-item-count">{{getData.usercount}}</span>
                                    </div>

                                </div>
                         </div>
                          <div class="col col-md-6">
                                <div class="card">
                                    <div class="card-header bg-primary"></div>
                                    <div class="card-body ditem">
                                        <span style="font-size: 40pt;" class="fa fa-users"></span>
                                        <span class="dashboard-item">Families</span>
                                        <span class="dashboard-item-count">{{getData.familycount}}</span>
                                    </div>

                                </div>
                         </div>
                </div>
             
         </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'dashboard',
    computed: {
       
        ...mapGetters('dashboard',[
            'getData'
        ])
    },
    mounted(){
       this.$store.dispatch("dashboard/getData")
       this.$store.dispatch("activenav","dashboardnav")
    }
}
</script>

<style scoped>
    .ditem {
        position:relative;
    }
  
  .dashboard-item {
        margin-left: 20px;
        font-weight: bold;
        font-size: 24pt;
        position: absolute;
        top: 15pt;
    }

    .dashboard-item-count {
        position: absolute;
        top: 20px;
        right: 15px;
        font-weight: bold;
        font-size: 24pt;
    }

    tbody tr td {
        font-size: 20pt;
        font-weight: bold;
    }
</style>