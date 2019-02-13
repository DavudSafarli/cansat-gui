<template>
  <div id="telemetry">
    <v-expansion-panel expand color="red" dark>
      <v-expansion-panel-content>
        <div slot="header">
          
        </div>
        <div>Salam</div>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header">
          Davud
        </div>
        <div>Salam</div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
  <!-- <v-card height="100%" color="#2c3e50" dark>
    <v-card-text class="px-0">4</v-card-text>
  </v-card> -->
</template>

<script>
export default {
  name: 'DTelemetry',
}
</script>

<style>
#telemetry{
  height: 100%;
  background-color: #324353;
}
.v-expansion-panel__container{
  background-color: #374d63!important;
}
</style>
