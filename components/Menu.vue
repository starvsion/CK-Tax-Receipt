<template>
    <el-menu :default-active="$route.path" router mode="horizontal" class="menu-bar">
         <el-menu-item>
             <img src="/logo.png" class="menu-logo">
            ChingKok Temple 正覺寺
        </el-menu-item>
        <template v-if="! $store.state.app.user.name">
            <el-menu-item index="/login">
                <i class="el-icon-user-solid"/>
                Login 登錄
            </el-menu-item>
            <el-menu-item index="/register">
                <i class="el-icon-circle-plus"/>
                Register 註冊
            </el-menu-item>
        </template>
        <el-menu-item index="/logout" v-else>
            <i class="el-icon-scissors"/>
            Logout
        </el-menu-item>
        <el-submenu index="/receipt" v-if="$store.state.app.user.name">
            <template slot="title">
                <i class="el-icon-s-order"/> Receipt 收據
            </template>
            <el-menu-item index="/receipt/">
                <i class="el-icon-circle-plus"/>
                Form 表格
            </el-menu-item>
            <el-menu-item index="/receipt/list">
                <i class="el-icon-s-grid"/>
                Table 列表
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "Menu",
};
</script>

<style scoped>
    .menu-logo {
        height: 3rem;
    }
</style>
