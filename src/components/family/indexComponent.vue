<template>
    <div>
        
  <span class="pageheader"><i class="fa fa-users"></i> Registered Families</span><hr/>
          <div class="col-md-12">
               <div class="card">
                   <div class="card-header"  style="background:#10362B;color:white;">
                        <router-link :to="{name: 'familyPassAll'}"><button class="btn btn-default float-left text-white"><span class="fa fa-print"></span> Generate Quarantine Pass</button></router-link>
                       <router-link :to="{name: 'newFamily'}"><button class="btn btn-default float-right text-white"><span class="fa fa-plus"></span> New</button></router-link>
                       
                       </div>
                   <div class="card-body">
                              <input v-model="searchtext" type="text" class="form-control" placeholder="Search via Family Name..." style="width:50%"/>
                        <table class="table table-bordered table-condensed">
                                <thead>
                                    <tr style="background:#DFDFDF">
                                        <th>#</th>
                                        <th>Family Name</th>
                                        <th>Household No</th>
                                        <th>Address</th>
                                        <th>Street</th>
                                        <th>Barangay</th>
                                        <th>Members</th>
                                        <th width="25%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(family,index) in familyList" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{family.family}}</td>
                                        <td>{{family.Address.householdNo}}</td>
                                        <td>{{family.Address.address}}</td>
                                        <td>{{family.Address.Street.street}}</td>
                                        <td>{{family.Address.Barangay.barangay}}</td>
                                        <td>{{family.Members.length}}</td>
                                        <td><router-link :to="{ name: 'familyDetails', params: {id: family.id}}" style="color:green"><span class="fa fa-info"></span> View Details</router-link></td>
                                    </tr>
                                </tbody>
                                
                        </table>
                           <loadingComponent v-if="loading"/>
                   </div>
               </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import loadingComponent from "@/components/loadingComponent"
export default {
    name: 'familyIndex',
    data: function(){
        return {
           familyList: [],
           loading: true,
           searchtext: '',
           typingTimer: '',
           doneTimingInterval : 500,
        }
    },
    watch: {
        searchtext: function(newval){
        
           clearTimeout(this.typingTimer)
           if(newval.length > 0 ){
               this.typingTimer = setTimeout(()=>{
                   this.loading = true
                    this.familyList = []
                    this.searchFamily(newval).then(()=>{
                        this.loading = false
                        this.familyList = this.families
                    })
               },this.doneTimingInterval)
           }else{
                this.loading = true
                this.familyList = []
                  this.getAll().then(()=>{
                    this.loading = false
                    this.familyList = this.families
                })
           }
        }
    },
    methods:{
        ...mapActions('family',[
            'getAll',
            'searchFamily'
        ])
    },
    mounted(){
       this.$store.dispatch("activenav","familynav")
        this.getAll().then(()=>{
             this.loading = false
             this.familyList = this.families
        })
    },
    computed: {
        ...mapGetters('family',[
            'families'
        ])
    },
    components: {
        loadingComponent
    }
}
</script>
