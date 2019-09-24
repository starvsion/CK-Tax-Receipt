<template>
    <div class="bg" v-loading="isBusy">
        <div class="utility">
            <el-button type="primary" @click="printReceipt">
                Print 打印
            </el-button>
        </div>
        <a4-paper id="printMe">
            <template>
                <receipt v-model="receipt" :sn="sn" ref="receipt" />
            </template>
            <template #bottom>
                <receipt v-model="receipt" :sn="sn">
                    <template #note>
                        Keep This Copy For Your Record
                    </template>
                </receipt>
            </template>
        </a4-paper>
    </div>
</template>

<script>
import A4Paper from "@/components/A4Paper";
import receipt from "@/components/Receipt";
import AirTableApi from "@/assets/api/AirTableApi";

export default {
    name: "Index",
    components: {
        "a4-paper": A4Paper,
        receipt,
    },
    data: () => {
        return {
            airTableApi: new AirTableApi(),
            sn: -1,
            id: "",
            receipt: {
                amount: 0,
                donor: "",
                address: "",
                dateDonation: "",
            },
            isBusy: true,
        };
    },
    async mounted () {
        await this.getReceiptId();
        this.isBusy = false;
    },
    methods: {
        async getReceiptId () {
            const snObject = await this.airTableApi.getReceiptNumber();
            this.id = Object.keys(snObject)[0];
            this.sn = snObject[this.id];
        },
        async printReceipt () {
            this.$refs.receipt.$refs.form.validate(async valid => {
                if (!valid) {
                    this.$message("Please double check your input 請檢查您的輸入");
                    return;
                }

                this.isBusy = false;

                this.airTableApi.saveReceipt(this.id, this.receipt.donor, this.receipt.amount);

                window.print();

                this.receipt = {
                    amount: 0,
                    donor: "",
                    address: "",
                    dateDonation: "",
                };

                await this.getReceiptId();

                this.isBusy = false;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    .bg {
        background: rgb(204, 204, 204);

        @media print {
            background:unset;
        }
    }
</style>
