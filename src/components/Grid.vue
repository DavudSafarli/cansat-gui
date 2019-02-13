<template>
  <div class="graphs-container">
    <v-data-table :items="table"
    expand
    :headers="headers"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.time }}</td>
      <td class="text-xs-right">{{ props.item.packetCount }}</td>
      <td class="text-xs-right">{{ props.item.altitude }}</td>
      <td class="text-xs-right">{{ props.item.speed }}</td>
      <td class="text-xs-right">{{ props.item.lon }}</td>
      <td class="text-xs-right">{{ props.item.lat }}</td>
      <td class="text-xs-right">{{ props.item.picIsTaken }}</td>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DGrid',
  data() {
    return {
      headers: [
        {
          text: 'Çalışma müddəti',
          align: 'left',
          sortable: false,
          value: 'time'
        },
        { text: `Paketlərin sayı`, value: 'packetCount' },
        { text: 'Hündürlük', value: 'altitude' },
        { text: 'Sürət', value: 'speed' },
        { text: 'C. en ', value: 'lon' },
        { text: 'C. uzunluq', value: 'lat' },
        { text: 'Şəkilin çəkilmə', value: 'picIsTaken' }
      ],
    };
  },
  computed: {
    ...mapGetters([
      'table',
    ])
  }
};
</script>

<style lang="scss" scoped>
td:not(:last-child){
  border-right: 1px solid #eee;
}
.graphs-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  .canvas-wrap{
    width: 100%;
    height: 33vh;
  }
}
</style>
