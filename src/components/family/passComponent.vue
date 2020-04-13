<template>
    <div>
          <span class="pageheader noprint"><i class="fa fa-print"></i> Quarantine Pass for {{familyInfo.family}} Family</span><hr class="noprint"/>
        
     
                        <router-link :to="{name: 'familyDetails',params: {id: id}}" class="noprint"><button class="btn btn-primary float-left text-white"><span class="fa fa-arrow-left"></span> Back</button></router-link>
                       <button @click="printnow()" class="btn btn-primary float-right text-white noprint"><span class="fa fa-print"></span> Print</button>
            <br/>
        <div class="" style="text-align:center;margin-top:20px;">
            
            <div class="col-md-6">
                 <div class="passbody">
                <h2 style="margin-bottom: 30px;margin-top: 20px;font-weight:bold;color:blue;">BRGY. {{familyInfo.Address.Barangay.barangay.toUpperCase()}}</h2>
                <p style="font-weight:bold;color:maroon;font-size: 20pt;margin-bottom:30px;">HOME QUARANTINE PASS</p>

                <span style="font-size: 16pt;font-weight:bold;margin-bottom:30px;">
                    EKSKLUSIBONG GAMIT NG ISANG MIYEMBRO<br/>
                    LAMANG NG BAWAT PAMILYA NA TAGABILI<br/>
                    NG KAILANGANG GAMOT AT PAGKAIN.
                </span>
                <hr/>
                <span style="font-size: 11pt;font-weight:bold;margin-bottom:30px;">
                    HUHULIHIN ANG SINO MANG WALANG <span style="color:maroon;">HOME QUARANTINE PASS</span>
                </span>
                <hr/>
                <div class="row">
           
                    <div class="col-md-5">
                             <canvas id="qrimage" ref="qrimage"></canvas>
                    </div>
                    <div class="col-md-7" style="text-align:left;">
                        <p style="margin-top: 40px;font-size: 12pt;">{{familyInfo.family.toUpperCase()}}</p>
                        <p style="font-size: 12pt;font-weight:bold;">NAME OF FAMILY HEAD</p>
                        <p style="font-size: 12pt;">{{(familyInfo.Address.address + "," + familyInfo.Address.Street.street).toUpperCase()}}</p>
                        <p style="font-size: 12pt;font-weight:bold;">ADDRESS</p>
                    </div>
          
                </div>

                <hr/>
                <span class="float-left" style="font-weight: bold;font-size:8pt;">HOUSEHOLD NO: {{familyInfo.Address.householdNo}}</span>
                <span class="float-right" style="font-weight: bold;font-size:8pt;">PUNONG BARANGAY: {{familyInfo.Address.Barangay.chairman}}</span>
                <br/>
            </div>
            </div>
   
           
        </div>
          
    </div>
</template>

<script>
import QRCode from 'qrcode'
import { mapActions , mapGetters } from 'vuex'

export default {
    name: "pass",
     data: function(){
        return {
            id: this.$route.params.id
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
        printnow: function(){
            window.print()
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
    }

}
// window.print()
</script>

<style scoped>
@media print {
    .noprint {
        display: none;
    }
}


 @page {
    /* size:  27.94cm 21.59cm; */
    /* margin: 5mm 10mm 5mm 10mm; */
} 

div.passbody {
     border: 4px solid black;
     padding: 10px;
     width: 100%;
     page-break-after: auto;
     page-break-inside: avoid;
     /* margin-bottom: 20px; */
}

</style>