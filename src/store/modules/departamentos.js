export default {
    namespaced: true,
    state: {
        departamentos : [],
        provincias:[],
        distritos:[]
    },
    mutations: {
        setDepartamentos(state,payload) {
            state.departamentos = payload
        },
        setProvincias(state,payload){
            state.provincias = payload
        },
        setDistrito(state,payload){
            state.distritos = payload
        }
        }
    };
    