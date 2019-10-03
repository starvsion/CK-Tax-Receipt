import Vue from "vue";
import VueCurrencyInput from "vue-currency-input";
import AsyncComputed from "vue-async-computed";

const pluginOptions = {
    globalOptions: {
        currency: "CAD",
        locale: "en",
        decimalLength: 0,
    },
};
Vue.use(VueCurrencyInput, pluginOptions);
Vue.use(AsyncComputed);
