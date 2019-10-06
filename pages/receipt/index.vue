<template>
    <div v-loading="isBusy" class="bg">
        <div class="utility text-center">

            <el-button type="primary" @click="printReceipt(false)" v-if="! receipts.length">
                Print 打印
            </el-button>
            <span v-else>
                <el-button type="primary" @click="print()" v-if="showAll">
                Print 打印
            </el-button>
            </span>
            <el-badge :value="receipts.length" v-if="!showAll">
                <el-button type="success" @click="printReceipt(true)">
                    Save 保存
                </el-button>
            </el-badge>
            <el-button v-if="receipts.length > 0" type="info" @click="showAll=!showAll">
                <span v-if="showAll">Go Back 返回添加界面</span>
                <span v-else>Preview All 預覽全部</span>
            </el-button>
        </div>
        <a4-paper v-if="! showAll">
            <template>
                <receipt ref="receipt" v-model="receipt" />
            </template>
            <template #bottom>
                <receipt v-model="receipt">
                    <template #note>
                        Keep This Copy For Your Record
                    </template>
                </receipt>
            </template>
        </a4-paper>
        <div v-else>
            <a4-paper v-for="(receipt, key) in receipts" :key="key">
                <template>
                    <receipt v-model="receipts[key]" :sn="receipt.id" />
                </template>
                <template #bottom>
                    <receipt v-model="receipts[key]" :sn="receipt.id">
                        <template #note>
                            Keep This Copy For Your Record
                        </template>
                    </receipt>
                </template>
            </a4-paper>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ReceiptApi from "../../assets/api/ReceiptApi";
import A4Paper from "~/components/A4Paper";
import receipt from "~/components/Receipt";
import printFn from "~/assets/helper/print";

export default {
    name: "ReceiptIndex",
     head: {
        title: "Receipt Form - 收據表格",
    },
    components: {
        "a4-paper": A4Paper,
        receipt,
    },
    data: () => {
        return {
            receiptApi: new ReceiptApi(),
            receipt: {
                id: -1,
                amount: 0,
                donor: "",
                address: "",
                donated_at: "",
            },
            isBusy: true,
            showAll: false,
            title: "Receipt Form",
        };
    },
    computed: {
        ...mapState({ receipts: state => state.receipt.receipts }),
    },
    async mounted () {
        await this.getReceiptId();
        this.isBusy = false;
    },
    methods: {
        async getReceiptId () {
            Object.assign(this.receipt, await this.receiptApi.getNew());
        },
        async printReceipt (saveOnly = false, validate = true) {
            let isValid = validate;
            if (this.$refs.receipt !== undefined) {
                await this.$refs.receipt.$refs.form.validate(valid => isValid = valid);
            }

            if (!isValid) {
                this.$message("Please double check your input 請檢查您的輸入");
                return;
            }

            this.isBusy = false;

            await this.receiptApi.store(this.receipt);

            if (!saveOnly) {
                return this.print();
            }

            this.addReceipt(this.receipt);
            this.reset();
        },
        print () {
            printFn(() => this.reset());
        },
        ...mapActions({
            addReceipt: "receipt/addReceipt",
        }),
        async reset () {
            this.receipt = {
                id: 0,
                atId: "",
                amount: 0,
                donor: "",
                address: "",
                donated_at: "",
            };

            await this.getReceiptId();

            this.isBusy = false;
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
