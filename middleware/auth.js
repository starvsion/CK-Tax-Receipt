export default function ({ redirect, route }) {
    if (["index", "login", "register"].includes(route.name)) {
        return;
    }
    const store = JSON.parse(sessionStorage.getItem("vuex"));
    if (!store || !store.app.user.name) {
        return redirect("/");
    }
}
