<template>
    <el-container>
        <el-header>Tax Receipt 生成器</el-header>
        <el-main>
            <el-form>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="捐獻者">
                            <el-autocomplete
                                :fetch-suggestions="fetchDonors"
                                @select="fetchDonation"
                            >
                                <template
                                    #default="{ item }"
                                >{{ item["名字"] }} ({{ item["聯系電話"] }} {{ item["電郵"] }})</template>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年份">
                            <el-select v-model="year">
                                <el-option
                                    v-for="item in Array.from(Array(10), (_, index) => new Date().getFullYear() - index)"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div v-if="donationData && donationData.length > 0">
                <header class="App__header">
                    <address>
                        布施者 Donor : <strong>{{ donorData["名字"] }}</strong>
                        <br />
                        電郵 Email : {{  donorData["電郵"] ||"N/A" }}
                        <br />
                       聯繫電話 Contact Number :  {{  donorData["聯繫電話"] || "N/A" }}
                    </address>
<br>
                    <address class="App__personal-address">
                        正覺寺 ChingKok Temple of Toronto |
                        200 Bathurst Street |
                        +1 646 123 4567 
                    </address>
                </header>
                <br>

                <main class="App__main">
                    <el-card v-for="({fields}, key) in donationData" :key="key">
                        數目： <b>{{fields["數目"]}}</b>
                        備註： <b>{{fields["備註"]}}</b>
                        日期： <b>{{fields["捐贈日期"]}}</b>
                    </el-card>
                </main>

                <footer class="App__footer">
                  總數： {{ donorData["捐赠总额"] }}
                </footer>
            </div>
        </el-main>
        <el-footer>
            ©
            <a href="http://www.cktemple.com/">Ching Kwok Buddhist Temple</a>
            {{ new Date().getFullYear() }}
        </el-footer>
    </el-container>
</template>

<script>
import AirTableApi from "@/assets/api/AirTableApi";

export default {
    name: "Index",
    data: () => ({
        airTableApi: new AirTableApi(
            process.env.atApiKey,
            process.env.atBaseId
        ),
        donationData: null,
        donorData: null,
        year: new Date().getFullYear(),
    }),
    methods: {
        fetchDonors(queryString, callback) {
            this.airTableApi.getDonors().then(donors =>
                callback(
                    donors.map(donor => ({
                        ...donor.fields,
                        atId: donor.getId()
                    }))
                )
            );
        },
        fetchDonation(donorData) {
            this.airTableApi.getListByDonor(donorData["名字"], this.year)
            .then(({donations, donor}) => {
                this.donationData = donations;
                this.donorData = donor;
            }) ;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
