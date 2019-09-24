<template>
    <div v-loading="isBusy" class="bg">
        <div class="utility">
            <el-button type="primary" @click="printReceipt(false)">
                Print 打印
            </el-button>
            <el-badge :value="receipts.length">
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
import A4Paper from "~/components/A4Paper";
import receipt from "~/components/Receipt";
import AirTableApi from "~/assets/api/AirTableApi";

export default {
    name: "Receipt",
    components: {
        "a4-paper": A4Paper,
        receipt,
    },
    data: () => {
        return {
            airTableApi: new AirTableApi(),
            receipt: {
                atId: "",
                id: -1,
                amount: 0,
                donor: "",
                address: "",
                dateDonation: "",
            },
            isBusy: true,
            showAll: false,
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
            const snObject = await this.airTableApi.getReceiptNumber();
            this.receipt.atId = Object.keys(snObject)[0];
            this.receipt.id = snObject[this.receipt.atId];
        },
        async printReceipt (saveOnly = false) {
            if (this.$refs.receipt !== undefined) {
                this.$refs.receipt.$refs.form.validate((valid) => {
                    if (!valid) {
                        this.$message("Please double check your input 請檢查您的輸入");
                    }
                });
            }

            this.isBusy = false;

            this.airTableApi.saveReceipt(this.receipt.atId, this.receipt.donor, this.receipt.amount);

            if (!saveOnly) {
                window.print();
            } else {
                this.addReceipt(this.receipt);
            }

            this.receipt = {
                id: 0,
                atId: "",
                amount: 0,
                donor: "",
                address: "",
                dateDonation: "",
            };

            await this.getReceiptId();

            this.isBusy = false;
        },
        ...mapActions({
            addReceipt: "receipt/addReceipt",
        }),
    },
};
</script>

<style lang="scss" scoped>
    .bg {
        background: rgb(204, 204, 204);

        @media print {
            background: unset;
        }
    }

    .utility {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
</style>
