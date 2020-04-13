<template>
    <div>
    <editDetails :familydata="familyInfo" v-if="showeditModal" @closemodal="closemodal"/>
  <span class="pageheader"><i class="fa fa-info"></i> Family Information(s)</span><hr/>
            <div class="col-md-12">
               <div class="card">
                   <div class="card-header"  style="background:#10362B;color:white;">
                       <router-link :to="{name: 'family'}"><button class="btn btn-default float-left text-white"><span class="fa fa-arrow-left"></span> Back</button></router-link>
                        <router-link :to="{name: 'familyPass', params: {id: familyInfo.id}}"><button class="btn btn-default float-right text-white"><span class="fa fa-print"></span> Generate Quarantine Pass</button></router-link>
                    </div>
                   <div class="card-body">
                                <div class="row">
                                    <div class="col-md-3">
                                             <div class="card" style="height: 100% !important;width: 100% !important;">
                                                  <div class="card-header bg-default"><h5 class="card-title">QR Code</h5></div>
                                                   <div class="card-body">
                                                          <canvas id="qrimage" ref="qrimage"></canvas>
                                                   </div>
                                             </div>
                                    </div>
                                    <div class="col-md-9">
                                            <div class="card">
                                                <div class="card-header bg-default"><h5 class="card-title">Details <button @click="showeditModal = true" class="btn btn-default float-right "><span class="fa fa-pen" style="cursor:pointer;color:green;"></span></button></h5></div>
                                                <div class="card-body">
                                                        <table class="table table-light table-bordered">
                                                            <tr>
                                                                <td style="width: 20%;">Family Name</td>
                                                                <td>{{familyInfo.family}}</td>
                                                            </tr>

                                                               <tr>
                                                                <td style="width: 20%;">HouseHold #</td>
                                                                <td>{{familyInfo.Address.householdNo}}</td>
                                                            </tr>
                                                                 <tr>
                                                                <td style="width: 20%;">Address</td>
                                                                <td>{{familyInfo.Address.address}}</td>
                                                            </tr>
                                                                 <tr>
                                                                <td style="width: 20%;">Street</td>
                                                                <td>{{familyInfo.Address.Street.street}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 20%;">Barangay</td>
                                                                <td>{{familyInfo.Address.Barangay.barangay}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td style="width: 20%;">Family Members</td>
                                                                <td>{{familyInfo.Members.length}}</td>
                                                            </tr>
                                                        </table>
                                                </div>
                                            </div>
                                    </div>
                                </div>

                   </div>   
               </div>


            </div>

           <div class="col-md-12">        
                <familyMembers :members.sync="familyInfo.Members"/>
           </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
import { mapActions , mapGetters } from 'vuex'
import familyMembers from "./membersComponent"
import editDetails from "./editDetailsComponent"
export default {
    name: 'familyDetails',
    data: function(){
        return {
            showeditModal: false,
        }
    },
    computed: {
       
        ...mapGetters('family',[
            'familyInfo'
        ])
    },
    methods: {
        ...mapActions('family',[
            'getFamily'
        ]),

        generateQrImage: function(elementID,codeString,height,width){
              QRCode.toCanvas(this.$refs[elementID], codeString , function (error) {
                    if (error) console.error(error)
                })
                this.$refs[elementID].style.width = height
                this.$refs[elementID].style.height = width

        },
        closemodal: function(){
            this.showeditModal = false
        }

    },
    mounted(){
        this.getFamily(this.$route.params.id).then(()=>{
           this.generateQrImage("qrimage",this.familyInfo.QrCode,"100%","100%")
        //    document.getElementById("qrimage").style.width = "100%"
        })
        .catch((err)=>{
            console.log(err)
        })
        this.$store.dispatch("activenav","familynav")
    },
    components: {
        familyMembers,
        editDetails
    }
}
</script>

<style scoped>

</style>