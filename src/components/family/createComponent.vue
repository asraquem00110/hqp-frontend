<template>
    <div>
             
  <span class="pageheader"><i class="fa fa-plus"></i> Register New Family</span><hr/>
          <div class="col-md-12">
               <div class="card">
                   <div class="card-header"  style="background:#10362B;color:white;">
                       <router-link :to="{name: 'family'}"><button class="btn btn-default float-left text-white"><span class="fa fa-arrow-left"></span> Back</button></router-link>
                    </div>
                   <div class="card-body">
                        <div class="alert alert-danger alert-dismissible fade" ref="errormessage" role="alert">
                            <strong v-for="(error,index) in errormsg" :key="index">
                                    <span v-for="(msg,index2) in error" :key="index2">{{msg}}</span><br/>
                                </strong>   
                           
                        </div>

                           <div class="col-md-12">
                                <div class="row">
                                        <div class="col-md-4">
                                              <div class="card">
                                                  <div class="card-header bg-default"><h5 class="card-title">Family Details</h5></div>
                                                  <div class="card-body">
                                                        <div class="form-group">
                                                            <label>Family Name</label>
                                                            <input type="text" class="form-control" v-model="family.name"/>
                                                        </div>

                                                         <div class="form-group">
                                                            <label>Household No</label>
                                                            <input type="text" class="form-control" v-model="family.household"/>
                                                        </div>

                                                         <div class="form-group">
                                                            <label>Address</label>
                                                            <input type="text" class="form-control" v-model="family.address"/>
                                                        </div>

                                                        <div class="form-group">
                                                            <label>Barangay</label>
                                                            <select @change="prepareStreet" class="form-control" v-model="family.barangay">
                                                                    <option v-for="(barangay,index) in barangays" :key="index" :value="barangay.id">{{barangay.barangay}}</option>
                                                            </select>
                                                        </div>

                                                         <div class="form-group">
                                                            <label>Street</label>
                                                            <select class="form-control" :disabled="sD" v-model="family.street">
                                                                <option v-for="(street,index) in streets" :key="index" :value="street.id">{{street.street}}</option>
                                                            </select>
                                                        </div>
                                                  </div>
                                              </div>
                                                <hr/>
                                  <button class="btn btn-primary float-left" @click="save()"><span class="fa fa-check"></span> Save</button>
                                        </div>
                                        <div class="col-md-8">
                                                <div class="card">
                                                  <div class="card-header bg-default"><h5 class="card-title">Family Members</h5></div>
                                                  <div class="card-body">
                                                

                                                        <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th width="20%">Image</th>
                                                                        <th>Fullname</th>
                                                                        <th>Gender</th>
                                                                        <th>Birthday</th>
                                                                        <th width="10%"><button class="form-control" style="color:green;" @click="addmember"><span class="fa fa-plus"></span> </button></th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                    <tr v-for="(member,index) in family.members" :key="index">
                                                                        <td>
                                                                        <img alt="1x1 Picture" class="form-control" :src="member.img" style="height:100px;" @click="showuploadfile(index)"/>
                                                                        <input type="file" style="display:none;" class="form-control" @change="onFileChange($event,index)" ref="imgFile" accept=".png,.jpg,.jpeg">
                                                                        </td>
                                                                        <td><input type="text" class="form-control" ref="listmember" v-model="member.member"/></td>
                                                                        <td><select class="form-control" v-model="member.gender"><option>Male</option><option>Female</option></select></td>
                                                                        <td><input type="date" class="form-control" ref="listbday" v-model="member.bday"/></td>
                                                                        <td><button class="form-control" style="color:maroon;" @click="remove_member(index)"><span class="fa fa-minus"></span> </button></td>
                                                                    </tr>
                                                                </tbody>

                                                        </table>

                                                  </div>
                                              </div>
                                        </div>


                                </div>
                                
                           </div>
                      
                   </div>
               </div>
          </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'newFamily',
    data: function(){
        return {
            family: {
                name: '',
                household: '',
                address: '',
                barangay: '',
                street: '',
                members: [],
            },
            sD: true,
            errormsg: [],
        }
    },
    computed: {
        ...mapGetters('barangay',[
            'barangays',
        ]),
        ...mapGetters('street',[
            'streets',
        ]),
    },
    methods: {
        ...mapActions('barangay',[
            'getPlainList',
        ]),
         ...mapActions('street',{
            streetPlain: 'getPlainList',
            //   streetPlain2: 'getPlainList2',
         }),
        prepareStreet: function(){
            this.sD = false,
            this.streetPlain(this.family.barangay)
        },
        showuploadfile: function(index){
            this.$refs.imgFile[index].click()
        },
        onFileChange: function(e,index){
   
           let files = e.target.files;
         

                if(files.length == 0){
                    console.log("empty");
                }else{
                    let reader = new FileReader();
                    reader.onload = (e)=> {
                            this.family.members[index].img = e.target.result
                        }

                        reader.readAsDataURL(files[0]);
                }

                this.family.members[index].imgfile = e.target.files[0];
        },
        addmember: function(){
            this.family.members.push({member: '', bday: '',img: `${this.$store.state.apiUrl}/public/images/default.png`,imgfile: null,gender: "Male"})
        },
        remove_member: function(index){
            this.family.members.splice(index,1)
        },
        save: function(){
            let membercheck = true
            for(let x = 0 ; x < this.family.members.length ; x++){
                if(this.family.members[x].member == "" || this.family.members[x].bday == ""){
                       this.$refs.listmember[x].classList.add("alert-danger")
                       this.$refs.listbday[x].classList.add("alert-danger")
                       membercheck = false
                }else{
                      this.$refs.listmember[x].classList.remove("alert-danger")
                      this.$refs.listbday[x].classList.remove("alert-danger")
                }
            }

            if(membercheck){
                this.$store.dispatch("family/save",this.family).then((res)=>{
                    if(res.data.errors){
                        this.errormsg = res.data.errors
                        this.$refs.errormessage.classList.add("show")
                    }else{

                        let result = true
                        this.family.members.forEach((member)=>{
                            member.familyid = res.data.familyid
                            this.$store.dispatch("family/savemember",member)
                            .then(()=>{
                                
                            }).catch((err)=>{
                                console.log(err)
                                result = false
                            })
                        })
                        if(result) {
                            this.initinputs()
                        }else{
                            console.log("not ok")
                            // remove all related records with family ID
                        }
                        
                    }
                }).catch((err)=>{
                     if(err.response.status == 500){
                         alert("Something went wrong !! Please Try again !!")
                     }
                })
               
            }

           
        },

        initinputs: function(){
                this.errormsg = []
                this.$refs.errormessage.classList.remove("show")
                for (let property in this.family){
                    if(property!= "members"){
                        this.family[property] = ""
                    }else{
                        this.family[property] = []
                    }
                
                }
         }
    },
    mounted(){
        this.getPlainList()
        this.$store.dispatch("activenav","familynav")
    }
}
</script>

<style scoped>
    #memberlist {
        list-style-type: none;
        padding:0;
        display: inline-block;
    }

    #memberlist li {
        display: inline-block;
        widows: 100%;
    }
    
</style>