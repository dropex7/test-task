import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueNativeSock from 'vue-native-websocket'
import { store } from './store'

Vue.use(VueNativeSock, 'wss://stream.binance.com:9443', {
    connectManually: true
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')