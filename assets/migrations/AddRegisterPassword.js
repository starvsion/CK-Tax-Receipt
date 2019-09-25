import { DB } from "../../plugins/firebase";

DB.collection("Global")
    .doc("passwords")
    .set({
        usage: "register",
        password: "123456",
    })
    .then(result => console.log(result))
    .catch(error => console.error(error));
