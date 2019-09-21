// src/utils/airtable.js
import Airtable from "airtable";

const LIST_TABLE = "捐贈列表";
const DONOR_TABLE = "捐贈者";

export default class AirTableApi {
    airtableBase;

    constructor () {
        this.airtableBase = new Airtable({ apiKey: process.env.atApiKey, })
            .base(process.env.atBaseId);
    }

    async getDonors () {
        const result = await this.airtableBase(DONOR_TABLE).select({
            fields: ["名字", "聯系電話", "電郵", ],
            view: "viwI7WafvVReYZvWG",
        }).all();
        return result;
    }

    async getListByDonor (donorName, year) {
        const donations = await this.airtableBase(LIST_TABLE).select({
            filterByFormula: `AND(YEAR({捐贈日期}) = ${year} ,{捐贈者} = '${donorName}')`,
            view: "viwFnCQ5D8HRSPC7r",
        }).all();

        if (donations.length < 1) {
            return {};
        }

        const idList = donations
            .map(item => item.fields["捐贈記錄號"])
            .filter(item => item)
            .sort((a, b) => a - b)
            .concat(",");

        const donor = await this.airtableBase(DONOR_TABLE).select({
            filterByFormula: `AND(NOT({ID列表} = ''),FIND(ARRAYJOIN({ID列表}), '${idList}'))`,
            view: "viwe1hO8jp4biM3sv",
        }).all();

        return { donations, donor: donor[0].fields, };
    }

    getReceiptNumber () {
        return this.airtableBase("Receipt").select({
            fields: ["id", "Amount", ],
            maxRecords: 1,
            sort: [{ field: "id", direction: "desc", }, ],
        })
            .firstPage()
            .then((records) => {
                if (!records || records.length < 1) {
                    return this.insertEmptyReceipt();
                }

                if (records[0].fields.Amount <= 0) {
                    return this.insertEmptyReceipt();
                }

                return records[0].fields.id;
            });
    }

    insertEmptyReceipt () {
        return this.airtableBase("Receipt").create([{ fields: {}, }, ])
            .then(records => records[0].fields.id);
    }

    saveReceipt (name, amount) {
        return this.airtableBase("Receipt").create({ fields: {
            Name: name,
            Amount: amount,
        }, })
            .then(records => records[0].fields.id);
    }
}
