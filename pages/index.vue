<template>
    <login />
</template>

<script>
import login from "~/components/Login";

export default {
    name: "Index",
    data() {
        return {
            title: "Index",
        };
    },
    components: {
        login,
    },
    layout: "CardLayout",
};
</script>

<style lang="scss" scoped>

</style>
