import Vue              from "vue";
import VueCurrencyInput from "vue-currency-input";

const pluginOptions = {
    globalOptions: {
        currency: "CAD",
        locale: "en"
    },
};
Vue.use(VueCurrencyInput, pluginOptions);
