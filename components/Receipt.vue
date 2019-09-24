<template>
    <div>
        <div class="d-flex justify-end mb-2 org-detail">
            <div>
                <img src="logo.png" class="logo">
                <br>正覺寺
                <b>Ching Kwok Temple of Toronto</b>
                <br>Affiliated with Tai Bay Buddhist Temple of Toronto
                <br>300 Bathurst Street, Toronto, ON, Canada, M5T 2S3, 416-603-8889
            </div>
        </div>
        <h3>
            Receipt No:
            <span class="text-red number-text">{{ sn | padding }}</span>
        </h3>
        <div class="mb-2">
            <h3>OFFICIAL DONATION RECEIPT FOR INCOME TAX PURPOSES</h3>
            <p>
                <i>
                    Charitable Organization Registration #: <b>119208361 RR 0001</b>
                </i>
            </p>
        </div>

        <div class="d-flex justify-start mb-2 receipt-content">
            <el-form
                ref="form"
                :model="receipt"
                :rules="rules"
                label-position="left"
                label-width="300px"
                hide-required-asterisk
                inline-message>
                <el-form-item label="Date of Donation:" prop="dateDonation">
                    <el-date-picker
                        v-model="receipt.dateDonation"
                        type="date"
                        prefix-icon=" "
                        placeholder="捐贈日期"
                        :picker-options="pickerOptions"
                        />
                </el-form-item>
                <el-form-item label="Eligible Amount of donation:" prop="amount">
                    <input
                        v-model="receipt.amount"
                        v-currency
                        placeholder="捐贈數目"
                    >
                </el-form-item>
                <el-form-item label="Donor:" prop="donor">
                    <input v-model="receipt.donor" placeholder="捐贈者姓名">
                </el-form-item>
                <el-form-item label="Donor Address:">
                    <input v-model="receipt.address" placeholder="捐贈者地址">
                </el-form-item>
            </el-form>
        </div>
        <el-row type="flex" align="bottom" justify="space-around">
            <el-col :span="8">
                <div class="text-left">
                    <h5>Authorized Signature 簽名:</h5>
                    <div class="signature" />
                    <p>Signed By（經手人）:</p>
                </div>
            </el-col>
            <el-col :span="8">
                <slot name="note">
                    Submit this copy with your tax return
                </slot>
            </el-col>
            <el-col :span="8">
                <p class="text-right">
                    Canadian Revenue Agency
                    <a href="https://canada.ca/charities-giving">canada.ca/charities-giving</a>
                </p>
            </el-col>
        </el-row>
</div>
</template>

<script>
export default {
    name: "Receipt",
    filters: {
        padding: toConvert => toConvert.toString().padStart(4, "0"),
    },
    props: {
        sn: {
            type: Number,
            default: 0,
        },
        value: {
            type: Object,
            default: () => ({
                amount: 0,
                donor: "",
                address: "",
                dateDonation: "",
            }),
        },
    },
    data: () => ({
        pickerOptions: {
            shortcuts: [{
                text: "Today 今天",
                onClick (picker) {
                    picker.$emit("pick", new Date());
                },
            }, {
                text: "Yesterday 昨天",
                onClick (picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit("pick", date);
                },
            }, {
                text: "A week ago 一週前",
                onClick (picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit("pick", date);
                },
            } ],
        },
        rules: {
            amount: [
                { required: true, message: "Please Enter amount 請輸入數目", trigger: "blur" },
            ],
            donor: [
                { required: true, message: "Please Enter Donor Name 請輸入捐贈者姓名", trigger: "blur" },
            ],
            dateDonation: [
                { required: true, message: "Please Enter Donation Date 請輸入捐贈日期", trigger: "blur" },
            ],
        },
    }),
    computed: {
        receipt: {
            get () {
                return this.value;
            },
            set (val) {
                this.$emit("change", val);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
    .receipt-content::v-deep {
        font-size: 18px;

        input {
            border: 0;
            background-color: #eaf4ea;
            padding: 0.5rem;
            font-weight: bold;
            width: 30rem;
            border-radius: 0;
            height: 40px;
            line-height: 40px;
            color: #000;
        }

        .el-form {
            width: 100%;

            .el-form-item {
                margin-bottom: 12px;
            }

            .el-form-item__label {
                font-weight: bold;
                text-transform: uppercase;
                color: #000;
            }
        }
    }
</style>
