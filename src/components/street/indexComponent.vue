<template>
    <div>
         <createComponent v-if="showcreatemodal" @closemodal="closemodal"/>
          <editComponent :street="editData" v-if="showeditmodal" @closemodal="closemodal"/>
        <span class="pageheader"><i class="fa fa-road"></i> {{barangay.name}} Streets</span><hr/>
       
             <div class="col-md-12">
               <div class="card">
                   <div class="card-header"  style="background:#10362B;color:white;"> <span class="btn btn-default float-left text-white" @click="back()"><i class="fa fa-arrow-left"/> back</span><button class="btn btn-default float-right text-white" @click="showcreatemodal = true"><span class="fa fa-plus"></span> New</button></div>
                   <div class="card-body">
                         <input v-model="search" type="text" class="form-control" placeholder="Search via Street Name..." style="width:50%"/>
                        <table class="table table-bordered table-condensed">
                                <thead>
                                    <tr style="background:#DFDFDF">
                                        <th>#</th>
                                        <th>Street</th>
                                        <th>Purok Leader</th>
                                        <th>Family Registered</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                 
                                    <tr v-for="(street,index) in streetlist" :key="index">
                                            <td>{{ index+1}}</td>
                                            <td>{{ street.street }}</td>
                                            <td>{{ street.purokLeader }}</td>
                                            <td>{{ street.Addresses.length }}</td>
                                            <td>
                                                <a href="javascript:void(0)" @click="edit(index)"><span class="fa fa-edit"></span> Edit</a>
                                                <a href="javascript:void(0)" style="margin-left:20px;color:maroon;" @click="remove(index)"><span class="fa fa-times"></span> Remove</a>
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
import createComponent from './createComponent'
import editComponent from './editComponent'
import loadingComponent from "@/components/loadingComponent"
import { mapGetters } from 'vuex'
export default {
    name: 'streetIndex',
    data(){
        return{
            barangay: {
                name: this.$route.params.barangay,
                id: this.$route.params.id,
            },
            showcreatemodal: false,
            showeditmodal: false,  
            editData: {},
            streetlist: [],
            loading: true,
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
                    this.streetlist = []
                    this.$store.dispatch("street/searchStreet",{bid:this.barangay.id,search: newval}).then(()=>{
                        this.loading = false
                        this.streetlist = this.streets  
                    })
               },this.doneTimingInterval)
            }else{
                this.loading = true
                this.streetlist = []
                this.$store.dispatch("street/getList",this.barangay.id).then(()=>{
                    this.loading = false
                    this.streetlist = this.streets  
                })
           }
        }
    },  
    methods: {
        back: function(){
            this.$router.replace("/barangay")
        },
        closemodal: function(){
            this.showcreatemodal = false
            this.showeditmodal = false
        },
        edit: function(index){
            this.showeditmodal = true
            this.editData = this.streets[index]
            this.editData.index = index
        },
        remove: function(index){
            if(confirm("Are you sure you want to remove this?")){
                const data = {
                    street: this.streets[index],
                    index: index,
                }
                this.$store.dispatch("street/removeStreet",data)
            }
        }
    },
    computed:{  
            ...mapGetters('street',[
                "streets",
            ]),
    },
    mounted(){
       this.$store.dispatch("street/getList",this.barangay.id).then(()=>{
           this.loading = false
           this.streetlist = this.streets  
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