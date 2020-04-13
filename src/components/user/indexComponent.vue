<template>
    <div>
        <createComponent @closemodal="closemodal" v-if="showcreatemodal"/>
        <editComponent :userData="userData" @closemodal="closemodal" v-if="showeditmodal"/>
        <changePass :userData="userData" @closemodal="closemodal" v-if="showchangepassmodal"/>
  <span class="pageheader"><i class="fa fa-user"></i> User(s) List</span><hr/>
          <div class="col-md-12">
               <div class="card">
                   <div class="card-header"  style="background:#10362B;color:white;"><button class="btn btn-default float-right text-white" @click="showcreatemodal = true"><span class="fa fa-plus"></span> New</button></div>
                   <div class="card-body">
                             <input v-model="search" type="text" class="form-control" placeholder="Search via Full Name..." style="width:50%"/>
                        <table class="table table-bordered table-condensed">
                                <thead>
                                    <tr style="background:#DFDFDF">
                                        <th>#</th>
                                        <th>Full Name</th>
                                        <th>Email Address</th>
                                        <th width="25%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(user,index) in userlist" :key="index">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ user.fullname }}</td>
                                        <td>{{ user.email}}</td>
                                        <td>
                                            <a style="color:green" href="javascript:void(0)" @click="edit(index)"><span class="fa fa-edit"></span> Edit</a>
                                            <a style="margin-left: 20px;" href="javascript:void(0)" @click="changepass(index)"><span class="fa fa-edit"></span> Change Password</a>
                                            <a v-if="user.email != userinfo.email" style="color:maroon;margin-left: 20px;" href="javascript:void(0)" @click="remove(index)"><span class="fa fa-times"></span> Remove</a>
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
import { mapGetters, mapState } from 'vuex'
import createComponent from './createComponent'
import loadingComponent from '@/components/loadingComponent'
import changePass from './changepassComponent'
import editComponent from './editComponent'

export default {
    name: 'userIndex',
    data: function(){
        return {
            showcreatemodal: false,
            showeditmodal: false,
            showchangepassmodal: false,
            loading: true,
            userlist: [],
            userData: {},
            search: '',
            typingTimer: '',
            doneTimingInterval : 500,
        }
    },
        watch: {
        search: function(newval){
        
           clearTimeout(this.typingTimer)
           if(newval.length > 0 ){
               this.typingTimer = setTimeout(()=>{
                this.loading = true
                this.userlist = []
                this.$store.dispatch("user/searchUser",newval).then(()=>{
                    this.loading = false,
                    this.userlist = this.users
                })
               },this.doneTimingInterval)
           }else{
                this.loading = true
                this.userlist = []
                this.$store.dispatch("user/getUsers").then(()=>{
                    this.loading = false,
                    this.userlist = this.users
                })
           }
        }
    },
    methods:{
         closemodal: function(){
            this.showcreatemodal = false
            this.showeditmodal = false
            this.showchangepassmodal = false
        },
        remove: function(index){
            if(confirm("Are you sure you want to remove this?")){
                const data = {
                    user: this.users[index],
                    index: index,
                }
                 this.$store.dispatch("user/removeUser",data)
            }
       
        },
        changepass: function(index){
            this.userData = this.userlist[index]
            this.userData.index = index
            this.showchangepassmodal = true
        },
        edit: function(index){
            this.userData = this.userlist[index]
            this.userData.index = index
            this.showeditmodal = true
        }
    },
    mounted(){
         this.$store.dispatch("activenav","usernav")
         this.$store.dispatch("user/getUsers").then(()=>{
             this.loading = false,
             this.userlist = this.users
         })
    },
    computed: {
        ...mapGetters('user',[
            'users'
        ]),
        ...mapState({
            userinfo: state=> JSON.parse(state.userinfo),
            // test: state=> state.street.apiUrl,
        }),
    },
    components: {
        createComponent,
        loadingComponent,
        changePass,
        editComponent
    }
}
</script>