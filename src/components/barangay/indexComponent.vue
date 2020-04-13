<template>
    <div>
        <createComponent v-if="showcreatemodal" @closemodal="closemodal"/>
        <editComponent :barangaydata="editData" v-if="showeditmodal" @closemodal="closemodal"/>
        
        <span class="pageheader"><i class="fa fa-city"></i> Barangay(s) List</span><hr/>
        <div class="col-md-12">
               <div class="card">
                   <div class="card-header"  style="background:#10362B;color:white;"><button class="btn btn-default float-right text-white" @click="showcreatemodal = true"><span class="fa fa-plus"></span> New</button></div>
                   <div class="card-body">
                       <input v-model="search" type="text" class="form-control" placeholder="Search via Barangay Name..." style="width:50%"/>
                        <table class="table table-bordered table-condensed">
                                <thead>
                                    <tr style="background:#DFDFDF">
                                        <th>#</th>
                                        <th>Barangay</th>
                                        <th>Code</th>
                                        <th>District</th>
                                        <th>Chairman</th>
                                        <th># of Streets</th>
                                        <th>Family Registered</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(barangay,index) in barangaylist" :key="index">
                                            <td>{{index+1}}</td>
                                            <td>{{barangay.barangay}}</td>
                                            <td>{{barangay.code}}</td>
                                            <td>{{barangay.district}}</td>
                                            <td>{{barangay.chairman}}</td>
                                            <td><span style="margin-right:20px;">{{barangay.Streets.length}}</span> || <router-link style="margin-left: 20px;color:green" :to="{name: 'barangaystreets',params: {barangay: barangay.barangay, id: barangay.id}}">Manage Streets</router-link></td>
                                            <td>{{calculateFamilyCount(index)}}</td>
                                            <td>
                                                <a href="javascript:void(0)" @click="edit(index)"><span class="fa fa-edit"></span> Edit</a>
                                                <a style="margin-left: 20px;color:maroon" href="javascript:void(0)" @click="remove(index)"><span class="fa fa-times"></span> Remove</a>
                                            </td>
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
import createComponent from './createComponent'
import editComponent from './editComponent'
import loadingComponent from "@/components/loadingComponent"
export default {
    name: 'barangayIndex',
    data: function(){
        return {
            showcreatemodal: false,
            showeditmodal: false,
            editData: {},
            loading: true,
            barangaylist: [],
            search: "",
            typingTimer: '',
            doneTimingInterval: 500,
        }
    },
    watch: {
        search: function(newval){
            clearTimeout(this.typingTimer)
            if(newval.length > 0){
                this.typingTimer = setTimeout(()=>{
                    this.loading = true
                    this.barangaylist = []
                    this.searchBarangay(newval).then(()=>{
                        this.loading = false
                        this.barangaylist = this.barangays
                    })
               },this.doneTimingInterval)
            }else{
                this.loading = true
                this.barangaylist = []
                this.getList().then(()=>{
                    this.loading = false
                    this.barangaylist = this.barangays
                })
           }
        }
    },  
    methods:{
        ...mapActions('barangay',[
            'getList',
            'removeBarangay',
            'searchBarangay'
        ]),
        closemodal: function(){
            this.showcreatemodal = false
            this.showeditmodal = false
        },
        edit: function(index){
            this.showeditmodal = true
            this.editData = this.barangays[index]
            this.editData.index = index
        },
        calculateFamilyCount: function(index){
            
            let count = 0
            
                this.barangays[index].Streets.forEach((street)=>{
                    street.Addresses.forEach(()=>{
                        count = count + 1
                    })
                })
       
            return count
        },
        remove: function(index){
            if(confirm("Are you sure you want to remove this?")){
                const data = {
                    barangay: this.barangays[index],
                    index: index,
                }
                this.removeBarangay(data)
            }
        }
    },
    computed: {
        ...mapGetters('barangay',[
            'barangays'
        ]),
  
    },
    mounted(){
        this.getList().then(()=>{
             this.loading = false
             this.barangaylist = this.barangays
        })
        this.$store.dispatch("activenav","barangaynav")
    },
    components: {
        createComponent,
        editComponent,
        loadingComponent
    }
}
</script>