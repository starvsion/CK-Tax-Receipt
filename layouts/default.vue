<template>
    <div>
        <ck-menu />
        <nuxt />
    </div>
</template>

<script>
import Menu from "../components/Menu";

export default {
    name: "DefaultLayout",
    components: { "ck-menu": Menu },
    data () {
        return {
            activeLink: "",
        };
    },

};
</script>

<style>
    html {
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
        margin: 0;
    }
</style>
