import { auth, GoogleProvider } from "~/plugins/firebase";

export const state = () => ({
    user: {},
    credential: {},
});

export const mutations = {
    setUser (state, user) {
        state.user = user;
    },
    setCredential (state, credential) {
        state.credential = credential;
    },
};

export const actions = {
    loginWithGoogle ({ commit }) {
        auth.signInWithPopup(GoogleProvider)
            .then((result) => {
                const user = {
                    email: result.user.email,
                    name: result.user.displayName,
                    photo: result.user.photoURL,
                    phone: result.user.phoneNumber,
                };
                commit("setUser", user);
                commit("setCredential", result.credential);

                this.$router.push("/receipt");
            }).catch((e) => {
                this.$notify(e.message);
                console.log(e);
            });
        sessionStorage.setItem("key", "value");
    },
};
