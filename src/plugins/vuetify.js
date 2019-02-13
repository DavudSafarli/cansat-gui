import Vue from 'vue';
import Vuetify, {
  VApp,
  VContainer,
  VLayout,
  VFlex,
  VCard,
  VCardText,
  VTabs,
  VTab,
  VTabItem,
  VTabsItems,
  VBtn,
  VIcon,
  VDataTable,
  VExpansionPanel,
  VExpansionPanelContent,
} from 'vuetify/lib';

import 'vuetify/src/stylus/app.styl';
import 'vuetify/dist/vuetify.css';

Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VApp,
    VContainer,
    VLayout,
    VFlex,
    VCard,
    VCardText,
    VTabs,
    VTab,
    VTabItem,
    VTabsItems,
    VBtn,
    VIcon,
    VDataTable,
    VExpansionPanel,
    VExpansionPanelContent,
  },
});
