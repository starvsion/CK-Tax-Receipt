<template>
    <div class="bg">
        <div class="utility text-center">
            <el-button type="primary" @click="print">
                Print 打印
            </el-button>
            <el-button type="info" @click="$router.go(-1)">
                Go Back 返回
            </el-button>
        </div>
        <a4-paper v-for="(receipt, key) in toPrint" :key="key">
            <template>
                <receipt v-model="toPrint[key]" :sn="receipt.id" />
            </template>
            <template #bottom>
                <receipt v-model="toPrint[key]" :sn="receipt.id">
                    <template #note>
                        Keep This Copy For Your Record
                    </template>
                </receipt>
            </template>
        </a4-paper>
    </div>
</template>

<router>
    {
        props : {receipts:true},
        name: "receipt.multiple"
    }
</router>
<script>
import A4Paper from "~/components/A4Paper";
import receipt from "~/components/Receipt";
import printFn from "~/assets/helper/print";

export default {
    name: "Multiple",
    components: {
        "a4-paper": A4Paper,
        receipt,
    },
    data () {
        return {
            toPrint: [],
            print: printFn,
        };
    },
    mounted () {
        this.toPrint = this.$route.params.receipts;
    },
};
</script>

<style scoped>

</style>
