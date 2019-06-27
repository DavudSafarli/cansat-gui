<template>
  <div id="telemetry">
    <v-expansion-panel expand color="red" dark v-model="panel">
      <v-expansion-panel-content>
        <div slot="header">
          KOMANDALAR
        </div>
        <v-layout justify-center class="px-4 py-1" wrap>
          <v-flex>
            <v-btn color="success" style="text-transform: none" @click="reset">Ready</v-btn>
          </v-flex>
           <v-flex>
            <v-btn color="red" @click="start">Connect</v-btn>
          </v-flex>
          <v-flex>
            <v-btn color="cyan" @click="start">Test</v-btn>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header">TELEMETRIYA</div>

        <v-layout wrap align-center justify-center class="py-1">
          <v-flex xs12 class="py-2"
          v-for="(v, k, i) of current" :key="k">
            <v-layout class="px-4">

              <v-flex xs8 class="subheading grey--text text--lighten-2">
                {{telemetry[i]}}:
              </v-flex>
              <v-flex xs4 text-xs-center class="subheading teal--text text--accent-1">
                {{v}}
              </v-flex>

            </v-layout>
            <v-divider v-if="i + 1!= 8"></v-divider>
          </v-flex>
          
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DTelemetry',
  computed: {
    ...mapGetters([
      'current',
    ])
  },
  data() {
    return {
      panel: [true, true],
      telemetry: [
        'Komanda ID',
        'Çalışma müddəti',
        'Paketlərin sayı',
        'Hündürlük',
        'Sürət',
        'C. en',
        'C. uzunluq',
        'Şəkilin çəkilməsi',
      ]
    };
  },
  methods: {
    start(){
      this.$store.dispatch('test') 
    },
    reset(){
      this.$store.dispatch('reset') 
    }
  }
}
</script>

<style>
#telemetry{
  height: 100%;
  /* background-color: #324353; */
}
.v-expansion-panel__container{
  background-color: #2c3e50!important;
}
.v-expansion-panel__body{
  background-color: #34495e;
}
</style>
