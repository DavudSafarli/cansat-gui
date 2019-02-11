<template>
  <div id="index">
    <v-app>
      <v-container fluid grid-list-xs fill-height>
        <v-layout row fill-height>
          <v-flex md4 lg3 class="hidden-sm-and-down">
            <v-card dark color="secondary">
              <v-card-text class="px-0">4</v-card-text>
            </v-card>
          </v-flex>

          <v-flex sm12 md8 lg9 fill-height>
            <v-tabs v-model="model" color="#e74c3c" slider-color="#f1c40f" icons-and-text>
              <v-tab :href="'#tab-1'">
                <v-icon x-large color="#fff">show_chart</v-icon>
              </v-tab>
              <div class="tab-seperator"></div>
              <v-tab :href="'#tab-2'">
                <v-icon large color="#fff">table_chart</v-icon>
              </v-tab>
            </v-tabs>

            <!-- <v-layout class="layout-full-width" column fill-height> -->

              <v-tabs-items max v-model="model">
                <v-tab-item  :value="'tab-1'">
                  <d-graph></d-graph>
                </v-tab-item>

                <v-tab-item :value="'tab-2'">
                  <d-grid></d-grid> 
                </v-tab-item>

              </v-tabs-items>
            <!-- </v-layout> -->

          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Chart from 'chart.js/dist/Chart.bundle';

let myLineChart;
export default {
  
  data() {
    return {
      model: 'tab-1',
    };
  },
};
</script>

<style>
#index{
  height: 100vh;
}
.v-tabs__slider{
  height: 3px;
}
.layout-full-width{
}
.v-window{
  height: calc(100% - 72px);
}
.v-window__container, .v-window-item{
  height: calc(100%);
}
</style>
