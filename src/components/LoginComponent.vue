<template>
    <div style="text-align:center;">
        <div v-if="successlogin">
        <img src="../assets/loader.gif" style="width: 100px;height:100px;margin-bottom: 20px;"/><br/>
        <span style="font-size: 12pt;font-weight:bold">Loading ... Please Wait !</span>
        </div>
        <div class="container"  v-else>
            <div class="card" id="logindiv">
                    <div class="card-body">
                        <div style="text-align:center">
                        <span id="systemTitle">HQP Management System</span>
                        </div>
                              <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <strong v-for="(error,index) in errormsg" :key="index">
                                   <span v-for="(msg,index2) in error" :key="index2">{{msg}}<br v-if="msg.length > 1"/></span>
                            </strong>
                           
                            </div>
                        <div class="form-group" style="margin-top: 20px;">     
                         <input type="text" class="form-control" placeholder="username" v-model="user.email"/>
                         </div>
                          <div class="form-group">
                        <input type="password" class="form-control" placeholder="password" v-model="user.password"/>
                          </div>
                        <button class="btn btn-primary form-control" @click="login">Login</button>
                        
                    </div>
            </div>

        </div>
        <!-- <div class="modal">
            <div class="modal-content modal-50">
                <div class="modal-header"><span class="close-modal">&times;</span></div>
                <div class="modal-body">
                    sdfd
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'login',
    data: function(){
        return {
            user: {
                email: "raquem.alvin@gmail.com",
                password: "Lxgiwyl1234", 
            },
            successlogin: false,
            errormsg: [],
        }
    },
    methods: {
        login: function(){
       
             this.$store.dispatch('login',this.user).then((res)=>{
                if(res.data.errors){
                      this.errormsg = res.data.errors
                      this.$refs.errormessage.classList.add("show")
                }else{
                    this.showloadingScreen(res)
                    .then((res)=>{
                        this.$store.dispatch('authenticated',res)
                    })
                }
                
                    
             }).catch((err)=>{
                 if(err.response.status == 401 && err.response.data.msg){
                      this.errormsg = err.response.data.msg
                      this.$refs.errormessage.classList.add("show")
                 }
             })

        },
        showloadingScreen: function(res){
            return new Promise((resolve,reject)=>{
                try {
                   this.successlogin = true
                    setTimeout(()=>{
                        resolve(res)
                    },1500)
                }catch(err){
                    reject(err)
                }
              
            })
        }
    }
}
</script>

<style scoped>
    #logindiv {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 500px;
        height: 380px;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 1px 2px 1px black;
    }

    img {
        margin-top: 50px;
    }

    #systemTitle {
        font-size: 24pt;
    }
</style>
