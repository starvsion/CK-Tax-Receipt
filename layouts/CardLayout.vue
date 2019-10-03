<template>
    <div class="card-layout">
        <el-row type="flex" justify="center" align="center" class="w-100">
            <el-col :span="12" :xs="22">
                        <ck-menu />
                <el-card class="w-100">
                    <nuxt />
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Menu from "../components/Menu";
export default {
    name: "CardLayout",

    components: { "ck-menu": Menu },
};
</script>
<style scoped lang="scss">
    .card-layout::v-deep {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #35495e;

        .el-card__body {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            h1 {
                padding-top: 1em;
                padding-bottom: 1em;
            }
        }
    }
</style>
