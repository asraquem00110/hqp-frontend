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


                       <button type="button" class="float-right btn btn-primary" @click="update()"><span class="fa fa-check"></span> Update</button>
                    </form>
                </div>
            </div>
        </div>
</template>

<script>

export default {
    name: "edituser",
    props: {
        userData: {
            type: Object,
            required: true,
        }
    },
    data: function(){
        return{
            user: JSON.parse(JSON.stringify(this.userData)),
            errormsg: [],
        }
    },
    mounted(){

    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },

        update: function(){
                this.user.oldemail = this.userData.email
                this.$store.dispatch("user/updateUser",this.user).then((res)=>{
                    if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{
                        this.closethis()
                    }
                })

        },

    }
}
</script>