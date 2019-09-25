import { MessageBox } from "element-ui";
import { auth, DB, GoogleProvider } from "~/plugins/firebase";

export default class AuthProvider {
    addLoginResultToStore (result) {
        const user = {
            id: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            photo: result.user.photoURL,
            phone: result.user.phoneNumber,
        };
        window.$nuxt.$store.commit("app/setUser", user);
        window.$nuxt.$store.commit("app/setCredential", result.credential);

        window.$nuxt.$router.push("receipt");
    }

    loginWithGoogle () {
        auth.signInWithPopup(GoogleProvider)
            .then(this.addLoginResultToStore)
            .catch((e) => {
                MessageBox.alert(e.message);
            });
    }

    login ({ email, password }) {
        auth.signInWithEmailAndPassword(email, password)
            .then(this.addLoginResultToStore)
            .catch((e) => {
                MessageBox.alert(e.message);
            });
    }

    async create ({ email, password, auth_pass }) {
        DB.collection("Global")
            .where("usage", "==", "register")
            .where("password", "==", auth_pass)
            .get()
            .then((document) => {
                if (document.empty) {
                    return MessageBox.alert("Secret Key is invalid 您的密匙無效");
                }

                auth.createUserWithEmailAndPassword(email, password)
                    .then(() =>
                        MessageBox.alert("User Created 您的用戶賬號已經建立")
                            .then(() => window.$nuxt.$router.push({ name: "index" }))
                    )
                    .catch(error => MessageBox.alert(error.toString()));
            });
    }
}
