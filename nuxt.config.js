export default {
    mode: "spa",
    /*
** Headers of the page
*/
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: process.env.npm_package_description || "" },
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        ],
    },
    env: {
        baseUrl: process.env.BASE_URL || "localhost:3000",
        atApiKey: "keyaHoTXlpqFRSit8",
        atBaseId: "appKrXJhvc7Iwzayr",
    },
    /*
** Customize the progress-bar color
*/
    loading: { color: "#fff" },
    /*
** Global CSS
*/
    css: [
        "element-ui/lib/theme-chalk/index.css",
        "@/assets/sass/app.scss",
    ],
    /*
** Plugins to load before mounting the App
*/
    plugins: [
        "@/plugins/element-ui",
        "@/plugins/vue-luxon",
        "@/plugins/plugins",
        "@/plugins/firebase",
        { src: "~/plugins/vuex-persist", ssr: false },

    ],
    /*
** Nuxt.js modules
*/
    modules: [
        "@nuxtjs/axios",
    ],
    /*
** Build configuration
*/
    build: {
        transpile: [/^element-ui/],
        /*
** You can extend webpack config here
*/
        extend (config, ctx) {
            config.devtool = ctx.isClient ? "eval-source-map" : "inline-source-map";

            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/,
                });
            }
        },
    },
    router: {
        middleware: "auth",
    },
};
