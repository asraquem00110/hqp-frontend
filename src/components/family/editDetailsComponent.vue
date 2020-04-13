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

                                <div class="form-group">
                                    <label>Family Name</label>
                                    <input type="text" class="form-control" v-model="family.family"/>
                                </div>

                                    <div class="form-group">
                                    <label>Household No</label>
                                    <input type="text" class="form-control" v-model="family.Address.householdNo"/>
                                </div>

                                    <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" class="form-control" v-model="family.Address.address"/>
                                </div>

                                <div class="form-group">
                                    <label>Barangay</label>
                                    <select @change="prepareStreet" class="form-control" v-model="family.Address.Barangay.id">
                                            <option v-for="(barangay,index) in barangays" :key="index" :value="barangay.id">{{barangay.barangay}}</option>
                                    </select>
                                </div>

                                    <div class="form-group">
                                    <label>Street</label>
                                    <select class="form-control" v-model="family.Address.Street.id">
                                        <option v-for="(street,index) in streets" :key="index" :value="street.id">{{street.street}}</option>
                                    </select>
                                </div>
                           <button class="btn btn-primary float-right" @click="update()"><span class="fa fa-check"></span> Update</button>
                </div>
            </div>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
    name: 'editfamilyDetails',
    data: function(){
        return{
            family: JSON.parse(JSON.stringify(this.familydata)),
            sD: true,
            errormsg: [],
        }
    },
    props: {
        familydata: {
            type: Object,
            required: true,
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
        closethis: function(){
            this.$emit("closemodal")
        },
        ...mapActions('barangay',[
            'getPlainList',
        ]),
         ...mapActions('street',{
            streetPlain: 'getPlainList',
            //   streetPlain2: 'getPlainList2',
         }),
         ...mapActions('family',[
             'updateDetails'
         ]),
        prepareStreet: function(){
            this.sD = false,
            this.family.Address.Street.id = null,
            this.streetPlain(this.family.Address.Barangay.id)
        },
        update: function(){
            const updatedData = {
                id: this.family.id,
                family: this.family.family,
                household: this.family.Address.householdNo,
                address: this.family.Address.address,
                addressID: this.family.Address.id,
                barangay: this.family.Address.Barangay.id,
                street: this.family.Address.Street.id,
            }

            this.updateDetails(updatedData).then((res)=>{
                if(res.data.errors){
                    this.errormsg = res.data.errors
                    this.$refs.errormessage.classList.add("show")
                }else{
                    this.closethis()
                }
            }).catch(err=>console.log(err))
        }
    },
    mounted(){
          this.getPlainList()
          this.streetPlain(this.family.Address.Barangay.id)
    }
}
</script>