import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

import barangay from "./barangay"
import user from "./user"
import street from "./street"
import family from "./family"
import dashboard from "./dashboard"

export default new Vuex.Store({
    // namespaced: true,
    modules: {
            barangay,
            user,
            street,
            family,
            dashboard,
    },
    state: {
        islogin: localStorage.getItem('islogin') || false,
        accesstoken: localStorage.getItem('accesstoken') || null,
        refreshtoken: localStorage.getItem('refreshtoken') || null,
        userinfo: localStorage.getItem('userinfo') || null,
        headerconfig: {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
            }
        },
        apiUrl: "https://hqp-backend-00110.herokuapp.com",
    },
    getters: {

    },
    actions: {
        activenav: function(context,data){
            const navs = document.querySelectorAll("aside ul li")
            navs.forEach((nav)=>{
                nav.classList.remove("active")
            })
            document.getElementById(`${data}`).classList.add("active")
        },
        authenticated: function(context,data){
            localStorage.setItem('accesstoken',data.data.accesstoken)
            localStorage.setItem('refreshtoken',data.data.refreshtoken)
            localStorage.setItem('userinfo',JSON.stringify(data.data.user))
            localStorage.setItem('islogin',true)
            context.commit('changetokenstate',data.data)
            context.commit('changeislogin',{status: true})
        },
        login: function(context,data){
            return new Promise((resolve,reject)=>{
         
                   axios.post(`${context.state.apiUrl}/api/auth/login`,data)
                   .then((res)=>{
                      
                        resolve(res)
                   })
                   .catch(err=>reject(err))
              
            })


           
        },
        logout: function(context){

                axios.delete(`${context.state.apiUrl}/api/auth/logout`,context.state.headerconfig)
                .then(()=>{
                    localStorage.removeItem('accesstoken')
                    localStorage.removeItem('refreshtoken')
                    localStorage.removeItem('userinfo')
                    localStorage.removeItem('islogin')
                    context.commit('changeislogin',{status: false})  
                })
                .catch((err)=>{
                    console.log(err)
                    // if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    //     context.dispatch("refreshtoken")
                    // }     
                    localStorage.removeItem('accesstoken')
                    localStorage.removeItem('refreshtoken')
                    localStorage.removeItem('userinfo')
                    localStorage.removeItem('islogin')
                    context.commit('changeislogin',{status: false})     
                })
   
           
        },

    
        refreshtoken:function(context){
            // console.log(context.state.refreshtoken)
         
                axios.post(`${context.state.apiUrl}/api/auth/refreshtoken`,{refreshtoken: context.state.refreshtoken})
                .then((res)=>{
                    console.log(res)
                    context.dispatch("authenticated",res)
                    window.location.reload()
                 
                })
                .catch(err=>{
                    if(((err.response.status == 403 || err.response.status == 401) && err.response.data.msg)){
                       context.dispatch("logout")
                       window.location.href = "/"
                    }
                    
                }
                )
      
        }

    },
    mutations: {
        changeislogin: function(state,data){
           state.islogin = data.status
        },
        changetokenstate: function(state,data){
            state.accesstoken = data.accesstoken
            state.refreshtoken = data.refreshtoken
            state.headerconfig.headers.Authorization = `Bearer ${data.accesstoken}`
            state.userinfo = JSON.stringify(data.user)
        }
       
    }

});
