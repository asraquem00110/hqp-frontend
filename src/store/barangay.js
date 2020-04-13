import Axios from "axios"

export default {
    namespaced: true,
    state: {
        barangays: [],
    },
    actions: {
        searchBarangay: function(context,data){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    Axios.get(`${context.rootState.apiUrl}/api/barangay/getList/${data}`,context.rootState.headerconfig)
                    .then((res)=>{     
                            resolve(res)
                            context.commit('setbarangay',res.data.data)              
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
        getPlainList: function(context){
            Axios.get(`${context.rootState.apiUrl}/api/barangay/getPlainList`,context.rootState.headerconfig)
            .then((res)=>{     
                    context.commit('setbarangay',res.data.data)              
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        },
        getList: function(context){

                // Axios.get(`${context.rootState.street.apiUrl}/api/barangay/getList`,context.rootState.headerconfig)

            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    Axios.get(`${context.rootState.apiUrl}/api/barangay/getList`,context.rootState.headerconfig)
                    .then((res)=>{     
                            resolve(res)
                            context.commit('setbarangay',res.data.data)              
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
        saveBarangay: function(context,data){

            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/barangay/save`,data,context.rootState.headerconfig)
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
        updateBarangay: function(context,data){
            
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/barangay/update/${data.id}`,data,context.rootState.headerconfig)
                .then((res)=>{     
                            resolve(res)
                            if(!res.data.errors) context.commit("editList",{data:res.data,index: data.index})
                           
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }               
                })
            })
        },
        removeBarangay: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/barangay/archive/${data.barangay.id}`,data,context.rootState.headerconfig)
            .then((res)=>{     
                        if(res.data == "archived") context.commit("removeBarangay",data.index)
                       
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        }
    },
    getters: {
        barangays: function(state){
            return state.barangays
        }
    },
    mutations: {
        setbarangay: function(state,data){
            state.barangays = data
        },

        updateList: function(state,data){
            state.barangays.push(data)
        },

        editList: function(state,data){
            state.barangays[data.index] = data.data
        },
        removeBarangay: function(state,index){
            state.barangays.splice(index,1)
        }
    }
}