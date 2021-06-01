<template>
  <v-card>
    <v-toolbar color="primary">
      <v-toolbar-title class="data_table_card_title">
        Events
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-data-table :headers="headers" :items="this.$store.state.diffs"
        :items-per-page="5"
        class="elevation-1"> 
        <template v-slot:item.type="{item}">
          <v-chip pill>
            {{ item.eventType }}
          </v-chip>
        </template>
        <template v-slot:item.symbol="{item}">
          <v-chip pill>
            {{ item.symbol }}
          </v-chip>
        </template>
        <template v-slot:item.time="{item}">
          <v-chip pill>
            {{ convertTime(item.eventTime) }}
          </v-chip>
        </template>
          
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  data(){
      return{ 
        headers: [{
          text: 'Event type',
          align: 'center',
          sortable: false,
          value: 'type',
        },
        {
          text: 'Event symbol',
          align: 'center',
          sortable: false,
          value: 'symbol',
        },
          {
          text: 'Event time',
          align: 'center',
          sortable: false,
          value: 'time',
        }
        ]
      }
  },
  methods:{  
    convertTime(time){
      let unix_timestamp = time
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }
  }
}
</script>
