<template>
    <el-card class="receipt-table">
        <div slot="header">
            <h1>Receipts 收據列表</h1>
            <el-button style="float: right; padding: 0 1rem; margin: -1rem" type="text" @click="print">
                Print 打印
            </el-button>
        </div>
        <el-table
            stripe
            highlight-current-row
            height="750px"
            :data="receiptList"
            @selection-change="updateToPrint"
        >
            <el-table-column
                type="selection"
                width="55"
            />
            <el-table-column
                prop="id"
                label="id 序列號"
                width="180"
            />
            <el-table-column
                prop="donor"
                label="Name 姓名"
                width="180"
            />
            <el-table-column
                prop="address"
                label="Address 地址"
            />
            <el-table-column
                prop="amount"
                label="Amount 數目"
            >
                <template slot-scope="scope">
                    <el-input v-model="scope.row.amount" v-currency disabled/>
                </template>
            </el-table-column>
            <el-table-column
                prop="donated_at"
                label="Donation Date 捐贈日期"
            />
        </el-table>
        <el-pagination
            class="text-center"
            layout="prev, next"
            :total="50"
        />
    </el-card>
</template>

<script>
import ReceiptApi from "../assets/api/ReceiptApi";

export default {
    name: "ReceiptTable",
    asyncComputed: {
        async receiptList () {
            return this.receiptApi.list(this.page, this.perPage);
        },
    },
    data: () => ({
        page: 1,
        perPage: 15,
        receiptApi: new ReceiptApi(),
        toPrint: [],
    }),
    computed: {
        total () {
            return this.receiptApi.totalRecord;
        },
    },
    methods: {
        print () {
            this.$router.push({
                name: "receipt.multiple",
                params: { receipts: this.toPrint },
            });
        },
        updateToPrint (val) {
            this.toPrint = val;
        },
    },
};
</script>

<style scoped lang="scss">
    .receipt-table::v-deep {
        width: 75%;
        height: 95vh;

        .el-input.is-disabled {
            > input {
                background-color: unset;
                color: #606266;
                border-color: transparent;
                padding: 0;
            }
        }
    }
</style>
