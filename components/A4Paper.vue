<template>
    <div class="a4">
        <div class="receipt first" id="print">
            <slot/>
        </div>
        <div class="receipt" id="print">
            <slot name="bottom"/>
        </div>
    </div>
</template>

<script>
    export default {};
</script>

<style lang="scss" scoped>
    div.a4 {
        background: white;
        display: block;
        margin: 0.5cm auto;

        box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
        width: 21cm;
        height: 27.9cm;

        @media print {
            margin: 0;
            box-shadow: unset;
            width: 100%;
        }


        .receipt {
            height: 50%;
            font-size: 14px;
            padding: .5rem;

            &.first {
                border-bottom: 1px dashed #000;
            }
        }
    }
</style>
