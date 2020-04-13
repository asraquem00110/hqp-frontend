import Axios from "axios"

export default {
    namespaced: true,
    state: {
        users: [],
    },
    actions: {
        getUsers: function(context){
            return new Promise((resolve,reject)=>{

              setTimeout(()=>{
                    Axios.get(`${context.rootState.apiUrl}/api/user/getList`,context.rootState.headerconfig)
                    .then((res)=>{     
                            context.commit('setuser',res.data.data)     
                            resolve(res)         
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                        }               
                        reject(err)
                    })
              },300)

          })
        },

        searchUser: function(context,data){

            return new Promise((resolve,reject)=>{

                setTimeout(()=>{
                      Axios.get(`${context.rootState.apiUrl}/api/user/getList/${data}`,context.rootState.headerconfig)
                      .then((res)=>{     
                              context.commit('setuser',res.data.data)     
                              resolve(res)         
                      })
                      .catch((err)=>{
                          if(err.response.status == 401 && err.response.data == "Unauthorized"){
                              context.dispatch("refreshtoken",null,{root:true})
                          }               
                          reject(err)
                      })
                },300)
  
            })
            
        },
        saveuser: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/user/save`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("updateList",res.data)
                           
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        removeUser: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/user/archive/${data.user.id}`,data,context.rootState.headerconfig)
            .then((res)=>{
                if(res.data=="archived") context.commit("removeUser",data.index)
            })  
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }   
            })
        },
        changepass: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/user/changepass/${data.id}`,data.data,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res)
                    if(!res.data.errors) context.commit("updateUser",{user: res.data,index: data.index})
                })  
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }   
                    reject(err)
                })
            })
        },
        updateUser: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/user/update/${data.id}`,data,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res)
                    if(!res.data.errors) context.commit("updateUser",{user: res.data,index: data.index})
                })  
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }   
                    reject(err)
                })
            })
        }
    },
    getters: {
        users: function(state){
            return state.users
        }
    },
    mutations: {
        setuser: function(state,data){
            state.users = data
        },

        updateList: function(state,data){
            state.users.push(data)
        },
        removeUser: function(state,index){
            state.users.splice(index,1)
        },
        updateUser: function(state,data){
            state.users[data.index] = data.user
        }
    }

}