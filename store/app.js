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
