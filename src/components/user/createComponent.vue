<template>
      <div class="modal">
            <div class="modal-content modal-50">
                <div class="modal-header"><span class="close-modal" @click="closethis()">&times;</span></div>
                <div class="modal-body">
                    <form class="form-horizontal">
                         <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <strong v-for="(error,index) in errormsg" :key="index">
                                    <span v-for="(msg,index2) in error" :key="index2">{{msg}}</span><br/>
                                </strong>   
                           
                        </div>

                     <div class="form-group">
                          <label>Fullname</label>
                          <input type="text" class="form-control" v-model="user.fullname" />
                         
                      </div>

                    <div class="form-group">
                          <label>Email Address</label>
                          <input type="email" class="form-control" v-model="user.email" />
                         
                      </div>

                    <div class="form-group">
                          <label>Password</label>
                          <input type="password" class="form-control" v-model="user.password" />
                         
                      </div>

                    <div class="form-group">
                          <label>Confirm Password</label>
                          <input type="password" class="form-control" v-model="user.password_confirmation"/>
                         
                      </div>

                       <button type="button" class="float-right btn btn-primary" @click="save()"><span class="fa fa-check"></span> Create</button>

                    </form>
                </div>
            </div>
        </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "createuser",
    data: function(){
        return{
            user: {
                fullname: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },

        save: function(){
            this.saveuser(this.user).then((res)=>{
                if(res.data.errors){
                    this.errormsg = res.data.errors
                    this.$refs.errormessage.classList.add("show")
                }else{
                    this.closethis()
                }
            }).catch((err)=>{
                 console.log(err)
            })
        },

        ...mapActions('user',[
            'saveuser'
        ]),

    }
}
</script>