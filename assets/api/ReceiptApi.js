import { DateTime } from "luxon";
import { DB } from "~/plugins/firebase";
const TABLE = "receipts";

export default class ReceiptApi {
    totalRecord = 0;

    async list (page = 1, perPage = 15, orderBy = "id", direction = "desc") {
        return DB.collection(TABLE)
            .orderBy(orderBy)
            .startAt(Math.max(0, (page - 1) * perPage))
            .limit(perPage)
            .get()
            .then(item => this._parseRecord(item));
    }

    async getNew () {
        return DB.collection(TABLE)
            .orderBy("id", "desc")
            .limit(1)
            .get()
            .then((item) => {
                return item.docs[0]
                    ? { id: item.docs[0].data().id + 1 }
                    : { id: 0 };
            });
    }

    async store (record = {}) {
        return DB.collection(TABLE).add(this._sanitizeRecord(record))
            .then(records => records.exists ? records.data() : {});
    }

    async update (record) {
        return DB.collection(TABLE)
            .add(this._sanitizeRecord(record));
    }

    _sanitizeRecord (record) {
        return {
            ...record,
            amount: parseFloat(
                record.amount
                    .replace(/[^\w\s\\.]/gi, "")
                    .replace("CA", "")),
        };
    }

    _parseRecord (item) {
        return item.empty
            ? []
            : item.docs.map(item => ({
                ...item.data(),
                donated_at: DateTime.fromJSDate(item.data().donated_at.toDate()).toISODate(),
            }));
    }
}
