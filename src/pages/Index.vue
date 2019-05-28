<template>
  <div id="index">
    <v-app >
      <v-container fluid grid-list-xs fill-height>
        <v-layout  row fill-height>
          <v-flex :class="{'md4 lg3': true, 'hidden': hidden, 'hidden-sm-and-down': true}">
            <d-telemetry></d-telemetry>
            <div class="toggle"></div>
          </v-flex>

          <v-flex :class="{xs12: hidden, 'sm12 md8 lg9': !hidden, 'fill-height': true}">
            <v-tabs height="50" v-model="model" color="#e74c3c" slider-color="#f1c40f" icons-and-text>
              <v-tab :href="'#tab-1'">
                <v-icon medium color="#fff">show_chart</v-icon>
              </v-tab>
              <div class="tab-seperator"></div>
              <v-tab :href="'#tab-2'">
                <v-icon color="#fff">table_chart</v-icon>
              </v-tab>
              <!-- <v-tab :href="'#tab-3'">
                <v-icon large color="#fff">3d_rotation</v-icon>
              </v-tab> -->
              <v-spacer></v-spacer>
              <div class="toggle">
                <v-icon @click="hidden = !hidden" medium color="#fff">menu</v-icon>
              </div>
            </v-tabs>

            <!-- <v-layout class="layout-full-width" column fill-height> -->

            <v-tabs-items max v-model="model">
              <v-tab-item :transition="false" :reverse-transition="false" :value="'tab-1'">
                <d-graph></d-graph>
              </v-tab-item>

              <v-tab-item :transition="false" :reverse-transition="false" :value="'tab-2'">
                <d-grid></d-grid>
              </v-tab-item>

              <!-- <v-tab-item :value="'tab-3'">
                <d-image></d-image>
              </v-tab-item> -->

            </v-tabs-items>
            <!-- </v-layout> -->

          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
// eslint-disable-next-line
import Chart from 'chart.js/dist/Chart.bundle';

export default {
  data() {
    return {
      model: 'tab-1',
      hidden: true,
    };
  },
  methods: {
    reveal() {
      this.hidden = false;
    }
  }
};
</script>

<style lang='scss'>
.toggle{
  align-self: center;
  padding-right: 30px;  
  border-radius: 10px 0 0 0;
}
.hidden{
  position: absolute; 
  transform: translateX(-100%);
  z-index: 500;
}
.container{
  padding: 0;
}
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
  max-height: calc(100% - 72px);
}
.v-window__container, .v-window-item{
  max-height: calc(100%);
  height: 100%;
}
.v-window__container{
  transition: none;
}
.fill-height{
  max-height: 100vh;
}
</style>
