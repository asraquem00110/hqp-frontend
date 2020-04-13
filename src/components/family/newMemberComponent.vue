<template>
     <div class="modal">
            <div class="modal-content modal-50">
                <div class="modal-header"><span class="close-modal" @click="closethis()">&times;</span></div>
                <div class="modal-body">
                         <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <strong v-for="(error,index) in errormsg" :key="index">
                                    <span v-for="(msg,index2) in error" :key="index2">{{msg}}</span><br/>
                                </strong>   
                           
                        </div>

                        <div class="col-md-6">
                             <img :style="imgstyle" :src="member.img" @click="showuploadfile()"/>
                              <input type="file" style="display:none;" ref="imgupload" accept=".png,.jpg,.jpeg" @change="onFileChange($event)"/>    
                        </div>
                        <div class="col-md-6">
                                <div class="form-group">
                                    <label>Full Name</label>
                                    <input class="form-control" type="text" v-model="member.member"/>
                                </div>

                                <div class="form-group">
                                    <label>Gender</label>
                                    <select class="form-control" v-model="member.gender">
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>
                                
                                </div>

                                  <div class="form-group">
                                    <label>Birth Day</label>
                                    <input class="form-control" type="date" v-model="member.bday"/>
                                </div>
                                <button class="btn btn-primary float-right" @click="saveMember()"><span class="fa fa-check"></span> Save</button>
                        </div>
                       
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'newMember',
    data: function(){
        return {
            member: {
                familyid: this.$route.params.id,
                member: '',
                bday: '',
                gender: '',
                img: `${this.$store.state.apiUrl}/public/images/default.png`,
                imgfile: null,
            },
            imgstyle: {
                height: "100%",
                width: "100%",
            },
            errormsg: [],
          
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },
        showuploadfile: function(){
            this.$refs.imgupload.click()
        },
        onFileChange: function(e){
             let files = e.target.files
             
                if(files.length == 0){
                    console.log("empty");
                }else{
                    let reader = new FileReader();
                    reader.onload = (e)=> {
                            this.member.img = e.target.result
                        }

                        reader.readAsDataURL(files[0]);
                }
                this.member.imgfile = e.target.files[0]
        },
        saveMember: function(){
           this.$store.dispatch("family/newmember",this.member).then((res)=>{
               if(res.data.errors){
                   this.errormsg = res.data.errors
                   this.$refs.errormessage.classList.add("show")
               }else{
                   this.closethis()
               }
           })
        }
    }
}
</script>