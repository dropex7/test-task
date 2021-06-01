import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        tempSymbol: 'BTCUSDT',
        diffs: []
    },
    mutations: {
        changeTempSymbol(state, symbol) {
            state.tempSymbol = symbol
        },
        addNewDiff(state, message) {
            state.diffs.push(message)
        },
        clearDiffs(state) {
            state.diffs = []
        }
    }
})