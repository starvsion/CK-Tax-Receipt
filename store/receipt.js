export const state = () => ({
    receipts: [],
});

export const mutations = {
    setReceipts (state, receipts) {
        state.receipts = receipts;
    },
};

export const actions = {
    addReceipt ({ commit, state }, receipt) {
        commit("setReceipts", [...state.receipts, receipt]);
    },
};
