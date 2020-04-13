import Axios from "axios"

export default {
    namespaced: true,
    state: {
        streets: [], 
        apiUrl: "http://192.168.100.12:8080",
    },
    actions: {
        getPlainList: function(context,barangayId){
            Axios.get(`${context.rootState.apiUrl}/api/street/getPlainList/${barangayId}`,context.rootState.headerconfig)
            .then((res)=>{
                context.commit("setStreet",res.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }   
            })
        },
        searchStreet: function(context,data){

            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                        Axios.get(`${context.rootState.apiUrl}/api/street/getList/${data.bid}/${data.search}`,context.rootState.headerconfig)
                        .then((res)=>{
                            context.commit("setStreet",res.data)
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

        getList: function(context,id){
         
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                        Axios.get(`${context.rootState.apiUrl}/api/street/getList/${id}`,context.rootState.headerconfig)
                        .then((res)=>{
                            context.commit("setStreet",res.data)
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

        save: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/street/save`,data,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res)
                    if(!res.data.errors) context.commit("pushStreet",res.data)
                })  
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }   
                })
            })
        },

        updateStreet: function(context,data){
     
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/street/update/${data.id}`,data,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res)
                    if(!res.data.errors) context.commit("updateStreet",{street: res.data,index: data.index})
                })  
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                        reject(err)
                    }   
                })
            })
        },

        removeStreet: function(context,data){
            Axios.patch(`${context.rootState.apiUrl}/api/street/archive/${data.street.id}`,data,context.rootState.headerconfig)
            .then((res)=>{
                if(res.data=="archived") context.commit("removeStreet",data.index)
            })  
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }   
            })
        }
    },
    getters: {
        streets: function(state){
            return state.streets
        }
    },
    mutations: {
        setStreet: function(state,data){
            state.streets = data.data
        },
        pushStreet: function(state,data){
            state.streets.push(data)
        },
        updateStreet: function(state,data){
            state.streets[data.index] = data.street
        },
        removeStreet: function(state,index){
            state.streets.splice(index,1)
        }
    }
}