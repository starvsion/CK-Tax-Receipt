<template>
    <div>
        <div class="d-flex justify-end mb-2 org-detail">
            <div>
                <img src="logo.png" class="logo">
                <br>正覺寺
                <b>Ching Kwok Temple of Toronto</b>
                <br>Affiliated with Tai Bay Buddhist Temple of Toronto
                <br>200 Bathurst Street, Toronto, ON, Canada, M5T 2S3, 416-603-8889
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
                    Charitable Organization Registration Number: 123456789000000
                </i>
            </p>
        </div>

        <div class="d-flex justify-start mb-2 receipt-content">
            <el-form ref="form" :model="receipt" label-position="left" label-width="300px">
                <el-form-item label="Date of Donation:">
                    <el-date-picker v-model="receipt.dateDonation" type="date" prefix-icon=" " placeholder="捐贈日期" />
                </el-form-item>
                <el-form-item label="Eligible Amount of donation:">
                    <input
                        v-model="receipt.amount"
                        v-currency
                        placeholder="捐贈數目"
                    >
                </el-form-item>
                <el-form-item label="Donor:">
                    <input v-model="receipt.donor" placeholder="捐贈者姓名">
                </el-form-item>
                <el-form-item label="Donor Address:">
                    <input v-model="receipt.address" placeholder="捐贈者地址">
                </el-form-item>
            </el-form>
        </div>
        <div class="text-left">
            <h5>Authorized Signature:</h5>
            <div class="signature" />
            <p>Signed By:</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Receipt",
    filters: {
        padding: toConvert =>  toConvert.toString().padStart(4, "0"),
    },
    props: {
        sn: {
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        receipt: {
            amount: 0,
            donor: "",
            address: "",
            dateDonation: "",
        },
    }),
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
            width: 20rem;
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
