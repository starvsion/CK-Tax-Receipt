<template>
    <login />
</template>

<script>
import login from "~/components/Login";

export default {
    name: "Index",
    head: {
        title: "Login 登錄",
    },
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
