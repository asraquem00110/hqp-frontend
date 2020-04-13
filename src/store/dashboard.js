import Axios from 'axios'
export default {
    namespaced: true,
    state: {
        data: {},
    },
    actions: {
        getData: function(context){
            Axios.get(`${context.rootState.apiUrl}/api/dashboard/getData`,context.rootState.headerconfig)
            .then((res)=>{
                context.commit("setData",res.data)
            })
            .catch((err)=>{
                if(err.response.status == 401 && err.response.data == "Unauthorized"){
                    context.dispatch("refreshtoken",null,{root:true})
                }               
            })
        }
    },
    getters: {
        getData: function(state){
            return state.data
        }
    },
    mutations: {
        setData: function(state,data){
            state.data = data
        }
    }
}
