<template>
     <div class="card">

                    <newMember @closemodal="closemodal" v-if="shownewMember"/>
                    <editMember :editMember="editData" @closemodal="closemodal" v-if="showeditMember"/>
                   <div class="card-header"  style="background:#10362B;color:white;">Family Members<button @click="shownewMember=true" class="btn btn-primary float-right"><span class="fa fa-plus"></span> New</button></div>
                   <div class="card-body">

                        <div class="col-md-3" v-for="(member,index) in members" :key="index">
                                <div class="card">
                                    <div class="card-body" style="position:relative;">
                                          <button @click="removemember(index)" class="btn btn-default float-right"><span class="fa fa-times" style="color:maroon;"></span></button>
                                             <button @click="editmember(index)" class="btn btn-default float-right"><span class="fa fa-pen" style="color:green;"></span></button>
  <!-- <img v-if="member.img != null && member.img && member.img != ''" style="position:relative;height: 150px;width:100%;margin-top:10px;margin-left:2px" :src="`${apiUrl}/public/images/families/${member.img}`"/> -->
                                            <img v-if="member.img != null && member.img && member.img != ''" style="position:relative;height: 150px;width:100%;margin-top:10px;margin-left:2px" :src="`https://00110xd.000webhostapp.com/citPublic/uploads/${member.img}`"/>
                                            <img v-else style="position:relative;height: 150px;width:100%;margin-top:10px;margin-left:2px" :src="`${apiUrl}/public/images/default.png`"/>
                                            <table class="table">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th colspan="2" style="text-align:center;">Informations</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Name</td>
                                                        <td>{{member.fname}}</td>
                                                    </tr>
                                                      <tr>
                                                    <td>Gender</td>
                                                        <td>{{member.gender}}</td>
                                                    </tr>
                                                     <tr>
                                                        <td>Birthday</td>
                                                        <td>{{formatBday(member.Bday)}}</td>
                                                    </tr>
                                                     <tr>
                                                        <td>Age</td>
                                                        <td>{{findAge(member.Bday)}} yrs. old</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        
                    
                                    </div>
                                </div>
                        </div>
                        
                   </div>

               </div>
</template>

<script>
import { calculateAge , formatBdayDate } from "@/helper/helper"
import newMember from "./newMemberComponent"
import editMember from "./editMemberComponent"
export default {
    name: 'familyMembers',
    props: {
        members: {
            type: Array,
            required: true,
        }
    },
    data: function(){
        return {
            familyMembers: JSON.parse(JSON.stringify(this.members)),
            apiUrl: this.$store.state.apiUrl,
            shownewMember: false,
            showeditMember: false,
            editData: {},
        }
    },
    methods: {
        findAge: function(bday){
           return calculateAge(bday)
        },
        formatBday: function(bday){
            return formatBdayDate(bday)
        },
        removemember: function(index){
            if(confirm("Are you sure you want to remove this?")){
                this.$store.dispatch("family/removeMember",this.members[index])
            }
        },
        editmember: function(index){
            this.editData = this.members[index]
            this.showeditMember = true
        },
        closemodal: function(){
            this.shownewMember = false
            this.showeditMember = false
        }
    },
    components: {
        newMember,
        editMember,
    }

}
</script>
