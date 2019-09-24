export default function ({ redirect, route }) {
    if (route.name === "index" || route.name === "login") {
        return;
    }
    let store = JSON.parse(sessionStorage.getItem("vuex"));
    if (!store || !store.app.user.name) {
        return redirect("/");
    }
}
