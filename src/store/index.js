import {createStore} from "vuex"

export default createStore({
    state: {
        minAmount: 15000,
        maxAmount: 1000000,
        minTerm: 2,
        maxTerm: 12,
        percent: 2.7,
    },
    getters: {
        getMinAmount(state){
            return state.minAmount
        },
        getMaxAmount(state){
            return state.maxAmount
        },
        getMinTerm(state){
            return state.minTerm
        },
        getMaxTerm(state){
            return state.minTerm
        },
        getPercent(state){
            return state.percent
        }
    },
    mutations: {
        setMinAmount(state, value){
            state.minAmount = value
        },
        setMaxAmount(state, value){
            state.maxAmount = value
        },
        setMinTerm(state, value){
            state.minTerm = value
        },
        setMaxTerm(state, value){
            state.minTerm = value
        },
        setPercent(state, value){
            state.percent = value
        }
    },
    actions: {

    },
    modules: {

    }
})