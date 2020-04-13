import Axios from 'axios'

export default {
    namespaced: true,
    state: {
        family: [],
        familyDetails: {},
    },
    actions: {
        save: function(context,data){

            return new Promise((resolve,reject)=>{
                Axios.post(`${context.rootState.apiUrl}/api/family/newData`,data,context.rootState.headerconfig)
                .then((res)=>{
                    resolve(res)
                }).catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    } 
                    reject(err)            
                })
            })

        },

        savemember: function(context,data){
            let fd = new FormData
            fd.append("fname",data.member)
            fd.append("Bday",data.bday)
            fd.append("familyId",data.familyid)
            fd.append("gender",data.gender)
            fd.append("imgfile",data.imgfile)

            const headerconfig = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${context.rootState.accesstoken}`,
                }
            }

        return new Promise((resolve,reject)=>{

                Axios.post(`${context.rootState.apiUrl}/api/family/savemember`,fd,headerconfig)
                .then((res)=>{
                    resolve(res)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }   
                    reject(err)            
                })
            })

            
        },
        getAll: function(context){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    Axios.get(`${context.rootState.apiUrl}/api/family/getList`,context.rootState.headerconfig)
                    .then((res)=>{     
                            resolve(res)
                            context.commit('setfamily',res.data.data)              
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

        searchFamily: function(context,data){
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    Axios.get(`${context.rootState.apiUrl}/api/family/getList/${data}`,context.rootState.headerconfig)
                    .then((res)=>{     
                            resolve(res)
                            context.commit('setfamily',res.data.data)              
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

        getFamily: function(context,data){
            return new Promise((resolve,reject)=>{
                Axios.get(`${context.rootState.apiUrl}/api/family/getDetails/${data}`,context.rootState.headerconfig)
                .then((res)=>{
                resolve(res)
                context.commit("setFamilyDetails",res.data.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }       
                    reject(err)       
                })
          })
        },
        updateDetails: function(context,data){
        
            return new Promise((resolve,reject)=>{
                Axios.patch(`${context.rootState.apiUrl}/api/family/updateDetails/${data.id}`,data,context.rootState.headerconfig)
                    .then((res)=>{
                        resolve(res)
                        context.commit("setFamilyDetails",res.data.data)
                    })
                    .catch((err)=>{
                        if(err.response.status == 401 && err.response.data == "Unauthorized"){
                            context.dispatch("refreshtoken",null,{root:true})
                        }       
                        reject(err)       
                    })
            })
        },
        removeMember: function(context,data){
   
            Axios.delete(`${context.rootState.apiUrl}/api/family/removeMember/${data.id}`,context.rootState.headerconfig)
            .then((res)=>{
                 //console.log(res)
                context.commit("setFamilyDetails",res.data.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }     
                console.log(err)  
                 
            })
        },
        newmember: function(context,data){
            let fd = new FormData
            fd.append("fname",data.member)
            fd.append("Bday",data.bday)
            fd.append("familyId",data.familyid)
            fd.append("gender",data.gender)
            fd.append("imgfile",data.imgfile)

            const headerconfig = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${context.rootState.accesstoken}`,
                }
            }

        return new Promise((resolve,reject)=>{

                Axios.post(`${context.rootState.apiUrl}/api/family/newmember`,fd,headerconfig)
                .then((res)=>{
                    resolve(res)
                    context.commit("setFamilyDetails",res.data.data)
                })
                .catch((err)=>{
                    if(err.response.status == 401 && err.response.data == "Unauthorized"){
                        context.dispatch("refreshtoken",null,{root:true})
                    }   
                    reject(err)            
                })
            })
        },
        editMember: function(context,data){
            console.log(data)
            let fd = new FormData
            fd.append("fname",data.fname)
            fd.append("Bday",data.Bday)
            fd.append("img",data.img)
            fd.append("gender",data.gender)
            fd.append("familyId",data.FamilyId)
    
            if(data.imgfile) fd.append("imgfile",data.imgfile)
            const headerconfig = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${context.rootState.accesstoken}`,
                }
            }

        return new Promise((resolve,reject)=>{

                Axios.patch(`${context.rootState.apiUrl}/api/family/updateMember/${data.id}`,fd,headerconfig)
                .then((res)=>{
                    resolve(res)
                    context.commit("setFamilyDetails",res.data.data)
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
        families: function(state){
            return state.family
        },
        familyInfo: function(state){
            return state.familyDetails
        }
    },
    mutations: {
        setfamily: function(state,data){
            state.family = data
        },
        setFamilyDetails: function(state,data){
            state.familyDetails = data
        }
    }
}