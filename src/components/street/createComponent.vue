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
                          <label>Street</label>
                          <input type="text" class="form-control" v-model="street.street" />
                         
                            </div>


                            <div class="form-group">
                                <label>Purok Leader</label>
                                <input type="text" class="form-control" v-model="street.purokLeader"/>
                            </div>

                             <button type="button" class="float-right btn btn-primary" @click="save()"><span class="fa fa-check"></span> Create</button>

                         </form>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    name: 'createStreet',
    data: function(){
        return {
            street: {
                street: '',
                barangayId: this.$route.params.id,
                purokLeader: '',
            },
            errormsg: [],
        }
    },
    methods: {
        closethis: function(){
            this.$emit('closemodal')
        },
        save: function(){
            this.$store.dispatch("street/save",this.street)
            .then((res)=>{
                if(res.data.errors){
                    this.errormsg = res.data.errors
                    this.$refs.errormessage.classList.add("show")
                }else{
                    this.closethis()
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

}
</script>