import Vue from "vue";

import VueLuxon from "vue-luxon";
Vue.use(VueLuxon, {
  serverZone: "America/New_York",
  serverFormat: "sql",
  clientZone: "locale",
  clientFormat: "locale",
  localeLang: null,
  localeFormat: {}, // see localeFormat below
});
