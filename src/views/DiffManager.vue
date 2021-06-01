<template>
  <v-card class="fill-height">
    <v-toolbar color="blue">
      <v-toolbar-title class="page_card_title">
        Exchange events
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center mr-5">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              >
              {{$store.state.tempSymbol}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in symbols"
              :key="index"
              @click="changeSymbol(item)"
              >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-btn @click='returnToHomePage'>Назад</v-btn>
    </v-toolbar>
    <v-card-text>
      <eventsTable/>
    </v-card-text>
  </v-card>
</template>

<script>
import { SYMBOLS } from '../values'
import eventsTable from '../components/eventsTable'

export default{
  name:'DiffManager',
  data:() => ({
    symbols: SYMBOLS
  }),
  components:{eventsTable},
  methods:{
    changeSymbol(currentSymbol){
      //Изменение текущего символа
      this.$store.commit('changeTempSymbol', currentSymbol)
      //Очистка массива с сообщениями об изменениях
      this.$store.commit('clearDiffs')
      //Отключение от текущего подключения по WS
      this.$disconnect()
      this.$router.push('/')
    },
    //Роут на начальную страницу
    returnToHomePage(){
      this.$disconnect()
      this.$router.push('/')
    }
  }
}
</script>