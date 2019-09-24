<template>
    <div class="login">
        <el-card class="login-card">
            <h1>Login 登錄</h1>
            <el-form
                ref="form"
                class="login-form"
                :model="model"
                :rules="rules"
                @submit.native.prevent="login"
            >
                <el-form-item prop="username" label="Email 電郵">
                    <el-input
                        v-model="model.username"
                        placeholder="Username"
                        prefix-icon="fas fa-user"
                    />
                </el-form-item>
                <el-form-item prop="password" label="Password 密碼">
                    <el-input
                        v-model="model.password"
                        placeholder="Password"
                        type="password"
                        prefix-icon="fas fa-lock"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button class="login-button" type="primary" block>
                        Login 登錄
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button
                        class="login-button"
                        type="primary"
                        @click.prevent="$store.dispatch('app/loginWithGoogle')"
                    >
                        Sign in with <b>Google</b> 登錄
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Login",
    data () {
        return {
            model: {
                username: "",
                password: "",
            },
            loading: false,
            rules: {
                username: [
                    {
                        required: true,
                        message: "Username is required",
                        trigger: "blur",
                    },
                    {
                        min: 4,
                        message: "Username length should be at least 5 characters",
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "Password is required", trigger: "blur" },
                    {
                        min: 5,
                        message: "Password length should be at least 5 characters",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
};
</script>

<style scoped lang="scss">
    .login::v-deep {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #35495e;

        .login-button {
            width: 100%;
        }

        .login-card {
            width: 50%;
        }

        .login-form {
            width: 290px;

            > * {
                padding: .5rem;
            }
        }

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

        .forgot-password {
            margin-top: 10px;
        }
    }

</style>
