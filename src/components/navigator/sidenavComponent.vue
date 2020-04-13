<template>
    <aside>
             <span id="toggle-button">&#9776;</span>
             <div id="accountinfo">
              
                      <div class="col-4">
                            <a href="profile.html"><img src="../../assets/default.png" style="width: 80px;" id="imageinfo"></a>
                         </div>
                         <div class="col-7" style="padding-top: 13px" id="nameinfo">
                                <span style="font-weight: bold;">Welcome</span><br/>
                                <div v-if="userinfo!=null">
                                <span>{{userinfo.fullname}}</span><br/>
                                <small style="color:lightgray;">{{userinfo.email}}</small>
                                </div>
                         </div>
                     </div>
        

            <ul>
                <li id="dashboardnav"><router-link :to="{name: 'dashboard'}"><i class="fa fa-chart-pie"></i> <i class="navtext"> Dashboard</i></router-link></li>
                <!-- <li ref="" class="dropdown">
                <a href="javascript:void(0)"><i class="fa fa-city "></i> <i class="navtext"> Manage Barangays</i></a>
                         <div class="dropdown-content">
                            <a href="javascript:void(0)"><i class="fa fa-calendar"></i> Schedule</a>
                            <a href="javascript:void(0)"><i class="fa fa-edit"></i> Activity</a>
                        </div>
                </li> -->
                <li id="barangaynav"><router-link :to="{name: 'barangay'}"><i class="fa fa-city"></i> <i class="navtext"> Manage Barangays</i></router-link></li>
                <!-- <li ref="streetnav"><a href="#"><i class="fa fa-home"></i> <i class="navtext"> Manage Streets</i></a></li> -->
                <!-- <li ref="addressnav"><a href="#"><i class="fa fa-street-view"></i> <i class="navtext"> Manage Address</i></a></li> -->
                <li id="familynav"><router-link :to="{name: 'family'}"><i class="fa fa-users"></i> <i class="navtext"> Manage Families</i></router-link></li>
                <li class="navtitle" style="background:#081B15;color:gray"><span style="opacity: 0">Others</span></li>
                <li id="usernav"><router-link :to="{name: 'user'}"><i class="fa fa-cogs"></i> <i class="navtext"> Manage Users</i></router-link></li>
                <li ref="familynav"><a href="javascript:void(0)" @click="logout"><i class="fa fa-power-off"></i> <i class="navtext"> Logout</i></a></li>
            </ul>

    </aside>
</template>

<script>

export default {
    name: 'sidenav',
    methods: {
        logout:function(){
            if(confirm("Leave this Application?")){
                 this.$store.dispatch("logout")
                 this.$router.replace("/")
            }
           
        }
    },
    computed: {
        userinfo: function(){
            return JSON.parse(this.$store.state.userinfo)
        }
    },
    mounted(){
     
    },
}
</script>

<style scoped>
  aside span#toggle-button {
    font-size: 32pt;
    font-weight: bold;
    color: white;
    float: right;
    margin-right: 10px;
    cursor: pointer;
    }

</style>