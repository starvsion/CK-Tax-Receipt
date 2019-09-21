<template>
    <div class="bg">
        <a4-paper>
            <template>
                <receipt :sn="sn1" />
            </template>
            <template #bottom>
                <receipt :sn="sn2" />
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
            sn1: -1,
            sn2: -2,
        };
    },
    async mounted () {
        this.sn1 = await this.airTableApi.getReceiptNumber();
        this.sn2 = await this.airTableApi.getReceiptNumber();

        if (this.sn1 === this.sn2) {
            this.sn2 ++;
        }
    },
};
</script>

<style lang="scss" scoped>
    .bg {
        background: rgb(204, 204, 204);
    }
</style>
