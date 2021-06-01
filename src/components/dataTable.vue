<template>
  <v-simple-table
    fixed-header
    height="82vh"
    >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">
            Amount
          </th>
          <th class="text-center">
            Price
          </th>
          <th class="table_total_el text-center">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in orders"
          :key="index"
          >
          <td>{{ item[1] }}</td>
          <td>{{ item[0] }}</td>
          <td class="table_total_el">{{ (item[0]*item[1]).toFixed(8) }}</td>
          </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>

export default {
  name: 'dataTable',
  props:{
    orders: Array,
  },
};
</script>

<style>
@media only screen and (max-width : 800px){
  .table_total_el{
    display: none;
  }
}

</style>