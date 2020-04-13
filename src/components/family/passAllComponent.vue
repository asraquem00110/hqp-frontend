<template>
    <div>
      
     <span class="pageheader noprint"><i class="fa fa-print"></i> Quarantine Pass for All Family</span><hr class="noprint"/>
                        <router-link :to="{name: 'family'}" class="noprint"><button class="btn btn-primary float-left text-white"><span class="fa fa-arrow-left"></span> Back</button></router-link>
                       <button @click="printnow()" class="btn btn-primary float-right text-white noprint"><span class="fa fa-print"></span> Print</button>
            <br/>
                  <loadingComponent v-if="loading"/>
                <div class="" style="text-align:center;margin-top:20px;">
                   
                    <div class="col-md-6" v-for="(family,index) in familyList" :key="index">
                        <div class="passbody">
                                    <h2 style="margin-bottom: 30px;margin-top: 20px;font-weight:bold;color:blue;">BRGY. {{family.Address.Barangay.barangay.toUpperCase()}}</h2>
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
                          <canvas :id="`qrcodeImage${index}`" ref="qrcodeImage"></canvas>
                             <!-- <canvas :id="`qrcodeImage${index}`" :ref="'qrcodeImage'+index"></canvas> -->
                    </div>
                    <div class="col-md-7" style="text-align:left;">
                        <p style="margin-top: 40px;font-size: 12pt;">{{ family.family.toUpperCase()}}</p>
                        <p style="font-size: 12pt;font-weight:bold;">NAME OF FAMILY HEAD</p>
                        <p style="font-size: 12pt;">{{(family.Address.address + "," + family.Address.Street.street).toUpperCase()}}</p>
                        <p style="font-size: 12pt;font-weight:bold;">ADDRESS</p>
                    </div>
          
                </div>

                <hr/>
                <span class="float-left" style="font-weight: bold;font-size:8pt;">HOUSEHOLD NO: {{family.Address.householdNo}}</span>
                <span class="float-right" style="font-weight: bold;font-size:8pt;">PUNONG BARANGAY: {{family.Address.Barangay.chairman}}</span>
                <br/>
                        </div>
                    </div>
            
                </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
import { mapActions, mapGetters } from 'vuex'
import loadingComponent from "@/components/loadingComponent"
export default {
    name: 'passAll',
    data: function(){
        return {
           familyList: [],
            loading: true,
        }
    },
    mounted(){
        this.$store.dispatch("activenav","familynav")
        this.getAll().then(()=>{
             this.familyList = this.families
        })

        this.getAll().then(()=>{
            this.loading = false
                for(let x = 0 ; x < this.families.length; x++){
                    // console.log(this.$refs[`qrcodeImage${x}`][0])
                    // console.log(this.$refs['qrcodeImage'][x])
                    QRCode.toCanvas(this.$refs['qrcodeImage'][x], this.families[x].QrCode , function (error) {
                        if (error) console.error(error)
                    })

                   this.$refs['qrcodeImage'][x].style.width = "100%"
                   this.$refs['qrcodeImage'][x].style.height = "100%"

                }

                
        })

  
         
          
    },
    methods: {
         ...mapActions('family',[
            'getAll',
        ]),
    
        printnow: function(){
            window.print()
        },

    },
    computed: {
          ...mapGetters('family',[
            'families'
        ])
    },
    components: {
          loadingComponent,
    }
}
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