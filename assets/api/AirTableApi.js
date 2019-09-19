// src/utils/airtable.js
import Airtable from "airtable";
const LIST_TABLE = "捐贈列表";
const DONOR_TABLE = "捐贈者";

export default class AirTableApi {
    airtableBase;
    constructor (apiKey, baseId) {
        this.airtableBase = new Airtable({ apiKey, })
            .base(baseId);
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
}
