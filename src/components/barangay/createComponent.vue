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
                          <label>Barangay</label>
                          <input type="text" class="form-control" v-model="barangay.barangay" />
                         
                      </div>

                       <div class="form-group">
                          <label>Code</label>
                          <input type="text" class="form-control" placeholder="Sample Format is A0001-A" v-model="barangay.code" />
                         
                      </div>

                       <div class="form-group">
                          <label>District</label>
                          <select class="form-control" v-model="barangay.district">
                              <option>1</option>
                              <option>2</option>
                          </select>
                      </div>

                       <div class="form-group">
                          <label>Chairman</label>
                          <input type="text" class="form-control" v-model="barangay.chairman"/>
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
    name: "createbarangay",
    data: function(){
        return{
            barangay: {
                barangay: "",
                code: "",
                district: 1,
                chairman: "",
            },
            errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit("closemodal")
        },

        save: function(){
            this.saveBarangay(this.barangay).then((res)=>{
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
        ...mapActions('barangay',[
            'saveBarangay'
        ]),
    }
}
</script>