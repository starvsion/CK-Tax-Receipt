<template>
    <div class="bg">
        <receipt-table/>
    </div>
</template>

<script>
import ReceiptTable from "../../components/ReceiptTable";

export default {
    name: "ReceiptTable",
     head: {
        title: "Tax List 收據列表",
    },
    components: {
        "receipt-table": ReceiptTable,
    },
};
</script>

<style lang="scss" scoped>
    .bg {
        background: rgb(204, 204, 204);
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
