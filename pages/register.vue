<template>
    <el-form
        ref="form"
        class="w-75 text-center"
        :model="model"
        :rules="rules"
        @submit.native.prevent="register"
    >
        <h1 class="text-center">
            Register 註冊
        </h1>
        <el-form-item label="Secret 密匙" prop="auth_pass">
            <el-input
                v-model="model.auth_pass"
                prefix-icon="el-icon-unlock"
            />
        </el-form-item>
        <el-form-item prop="email" label="Email 電郵">
            <el-input
                v-model="model.email"
                prefix-icon="el-icon-user"
            />
        </el-form-item>
        <el-form-item prop="password" label="Password 密碼">
            <el-input
                v-model="model.password"
                show-password
                prefix-icon="el-icon-lock"
            />
        </el-form-item>
        <el-form-item prop="password_confirm" label="Password Confirm 密碼確認">
            <el-input
                v-model="model.password_confirm"
                show-password
                prefix-icon="el-icon-lock"
            />
        </el-form-item>
        <el-form-item>
            <el-button native-type="submit" type="primary" block style="margin-top: 2rem">
                Register 註冊
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import AuthProvider from "~/assets/api/AuthProvider";

export default {
    name: "Login",
    layout: "CardLayout",
    data () {
        const validatePassConfirm = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("Please input the password again 請輸入密碼確認"));
            } else if (value !== this.model.password) {
                callback(new Error("Two passwords don't match 密碼不一致，請檢查 o(╯□╰)o"));
            } else {
                callback();
            }
        };
        return {
            model: {
                email: "",
                password: "",
                password_confirm: "",
                auth_pass: "",
            },
            loading: false,
            rules: {
                auth_pass: [
                    {
                        required: true,
                        message: "Secret Key is required 請輸入密匙",
                        trigger: "blur",
                    },
                ],
                email: [
                    {
                        required: true,
                        message: "Email is required 請輸入電郵",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "Password is required 請輸入密碼", trigger: "blur" },
                ],
                password_confirm: [
                    { validator: validatePassConfirm, trigger: "blur" },
                ],
            },
            authProvider: new AuthProvider(),
        };
    },
    methods: {
        async register () {
            await this.$refs.form.validate(async (valid) => {
                if (!valid) {
                    return this.$message("Please double check your input 請檢查您的輸入");
                }

                await this.authProvider.create(this.model);
            });
        },
    },
};
</script>

<style scoped lang="scss">

</style>
