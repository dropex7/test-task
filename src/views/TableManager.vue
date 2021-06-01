<template>
  <v-container class="pa-0 " fluid>
    <v-card>
      <v-toolbar color="blue">
        <v-toolbar-title class="page_card_title">Stock exchange</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="$router.push('/diffs')">Перейти к diffs</v-btn>
      </v-toolbar>
      <v-card-text>
        <v-row class="text-center">
          <v-col cols="12"
            md="6"
            sm="12" >
            <v-card >
              <v-toolbar color="primary">
                <v-toolbar-title class="data_table_card_title">Asks</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <dataTable :orders="data.asks" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12"
            md="6"
            sm="12">
            <v-card>
              <v-toolbar color="primary">
                <v-toolbar-title class="data_table_card_title">Bids</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <dataTable :orders="data.bids" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { getDataFromBinance } from '../backend'
import dataTable from '../components/dataTable'

  export default {
    name: 'TableManager',
    components:{
      dataTable
    },
    data: () => ({
      data: null
    }),
    async created() {
     await this.loadData()
     this.loadDataFromWS()
    },
    methods:{
      async loadData () {
        try {
            const loadedData = await getDataFromBinance(this.$store.state.tempSymbol) 
            this.data = loadedData
            this.data.asks.reverse()
            this.data.bids.reverse()
        }
        catch (e) {
          alert(e.message)
        } 
      },
      loadDataFromWS () {
      try {
        let path = this.$store.state.tempSymbol.toLowerCase()
        this.$connect(`wss://stream.binance.com:9443/ws/${path}@depth`)
        this.$options.sockets.onerror = () => {
          throw new Error('There is no connection to the server')
        }
        this.$options.sockets.onmessage = (event) => {
          let data = JSON.parse(event.data)
          //Фильтрация нулевых сделок
          let asks = data.a.filter(ask => ask[1] != 0) 
          let bids = data.b.filter(bid => bid[1] != 0)
          //Создания объекта сообщения об изменении
          let message = {
            "eventType": data.e,
            "symbol" : data.s,
            "eventTime": data.E
          }
          //Добавление в глобальный массив
          this.$store.commit('addNewDiff', message)
          asks.reverse()
          bids.reverse()
          asks.map((ask) =>{this.data.asks.unshift(ask)})
          bids.map((bid) =>{this.data.bids.unshift(bid)})

        }
      } catch (e) {
        alert(e.message)
      }
    }
    }
  }
</script>

<style>
.data_table_card_title, .page_card_title{
  color:#f5f5f5;
}
@media only screen and (max-width : 580px){
  .data_table_column{
    max-width: none;
  }
  .row{
    flex-direction: column;
  }
}
</style>