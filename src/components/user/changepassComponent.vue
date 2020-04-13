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
                          <label>Password</label>
                          <input type="password" class="form-control" v-model="user.password" />
                         
                      </div>

                    <div class="form-group">
                          <label>Confirm Password</label>
                          <input type="password" class="form-control" v-model="user.password_confirmation"/>
                         
                      </div>

                       <button type="button" class="float-right btn btn-primary" @click="changepass()"><span class="fa fa-check"></span> Change Pass</button>
                  
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
    name: "changepassword",
    props: {
        userData: {
            type: Object,
            required: true,
        }
    },
    data: function(){
        return{
            user: {
                password: "",
                password_confirmation: "",
            },
            userInfo: JSON.parse(JSON.stringify(this.userData)),
            errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },

        changepass: function(){
            const changepassdata = {
                data: this.user,
                id: this.userInfo.id,
                index: this.userInfo.index,
            }
            this.$store.dispatch("user/changepass",changepassdata).then((res)=>{
               if(res.data.errors){
                   this.errormsg = res.data.errors
                   this.$refs.errormessage.classList.add("show")
               }else{
                   this.closethis()
               }
            }).catch((err)=>console.log(err))
        }

    }
}
</script>