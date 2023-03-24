<!-- リザルト画面 -->
<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue'
import LookRanking from "../dbComponents/AccessComponents/Lookranking";
import SetName from "../dbComponents/AccessComponents/SetName";
import SubmitScore from "../dbComponents/AccessComponents/SubmitScore"
import {
  get_buildingjar_data,
  get_createjar_data,
} from "../../lib/localstorage";

const router = useRouter();
console.log("リザルト");
const routerDemo = () => {
  router.push("/");
};

// ランキング取得
let ranking_records = LookRanking();

// スコアの取得
const my_grid_score = get_createjar_data().score;
const my_jar_count = get_buildingjar_data().jar_count;

// 総スコア計算
const P = 1;
const D = 20;
const my_final_score = my_grid_score * P + my_jar_count * D ?? 0;

// ランク計算
let my_quality;
console.log(my_quality);
if (my_final_score > 650) {
  my_quality = "S";
} else if (my_final_score >= 550) {
  my_quality = "A";
} else if (my_final_score >= 450) {
  my_quality = "B";
} else if (my_final_score >= 350) {
  my_quality = "C";
} else {
  my_quality = "D";
}

// ランキング格納
let top_5_records = {};
console.log(ranking_records);
for (let i = 0; i < 5; i++) {
  top_5_records[i] = ranking_records[i];
}

// スコア送信
const {status, rankNum} = SubmitScore({
  totalScore: my_final_score,
  podRank: my_quality,
  podCount: my_jar_count
})

// ユーザーネーム送信
const userName = ref('')
const sendUserName = () => {
  SetName( {userName: userName.value} )
}
</script>

<template>
  <!DOCTYPE html>
  <html>

  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap" rel="stylesheet" />
  </head>

  <body>
    <div class="background_sheet">
      <div class="result_my_score">スコア: {{ my_final_score }}</div>
      <div class="result_assessment">評価 : {{ my_quality }}</div>
      <div class="result_rankNum">順位: {{ rankNum }}</div>
      <div id="horizon"></div>

      <div class="ranking_records">
        <div class="records_row_header">
          <div class="rankNum_record">ランキング:</div>
          <div class="userName_record">プレイヤー:</div>
          <div class="totalScore_record">スコア:</div>
        </div>

        <div class="record_data_table">
          <div class="records_row_1">
            <div class="rankNum_record">{{ top_5_records[0].rankNum }}</div>
            <div class="userName_record">{{ top_5_records[0].userName }}</div>
            <div class="totalScore_record">
              {{ top_5_records[0].totalScore }}
            </div>
            <div class="record_delimiter_lines"></div>
          </div>

          <div class="records_row_2">
            <div class="rankNum_record">{{ top_5_records[1].rankNum }}</div>
            <div class="userName_record">{{ top_5_records[1].userName }}</div>
            <div class="totalScore_record">
              {{ top_5_records[1].totalScore }}
            </div>
            <div class="record_delimiter_lines"></div>
          </div>

          <div class="records_row_3">
            <div class="rankNum_record">{{ top_5_records[2].rankNum }}</div>
            <div class="userName_record">{{ top_5_records[2].userName }}</div>
            <div class="totalScore_record">
              {{ top_5_records[2].totalScore }}
            </div>
            <div class="record_delimiter_lines"></div>
          </div>

          <div class="records_row_4">
            <div class="rankNum_record">{{ top_5_records[3].rankNum }}</div>
            <div class="userName_record">{{ top_5_records[3].userName }}</div>
            <div class="totalScore_record">
              {{ top_5_records[3].totalScore }}
            </div>
            <div class="record_delimiter_lines"></div>
          </div>

          <div class="records_row_5">
            <div class="rankNum_record">{{ top_5_records[4].rankNum }}</div>
            <div class="userName_record">{{ top_5_records[4].userName }}</div>
            <div class="totalScore_record">
              {{ top_5_records[4].totalScore }}
            </div>
            <div class="record_delimiter_lines"></div>
          </div>
        </div>
      </div>

      <button class="title_back_button" @click="routerDemo">
        タイトルへ
      </button>

      <div class="result_username">ユーザーネーム</div>
      <div class="result_submit">
        <button class="result_submit_button" @click="sendUserName">投稿</button>
        <input class="input_name_form" v-model="userName" />
        <img class="twitter_icon" src="../img/twitter.png" />
      </div>
    </div>
  </body>

  </html>
</template>

<style scoped>
.ranking_records {
  color: #ffffff;
  font-family: "RocknRoll One", sans-serif;
  font-size: 100%;
}

.rankNum_record {
  position: absolute;
  left: 138px;
}

.userName_record {
  position: absolute;
  left: 367px;
}

.totalScore_record {
  position: absolute;
  left: 700px;
}

.records_row_header {
  position: absolute;
  top: 285px;
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
}

.record_data_table {
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 36px;
}

.record_delimiter_lines {
  position: absolute;
  width: 1057px;
  height: 0px;
  left: 132px;
  top: 38px;
  border: 1px solid #40444b;
  transform: rotate(-0.05deg);
}

.records_row_1 {
  position: absolute;
  top: 357px;
}

.records_row_2 {
  position: absolute;
  top: 421px;
}

.records_row_3 {
  position: absolute;
  top: 485px;
}

.records_row_4 {
  position: absolute;
  top: 549px;
}

.records_row_5 {
  position: absolute;
  top: 613px;
}

.background_sheet {
  box-sizing: border-box;
  position: absolute;
  width: 1338px;
  height: 817px;
  left: 303px;
  top: 83px;
  background: #282c34;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 10px;
}

.result_my_score {
  position: absolute;
  width: 446px;
  height: 87px;
  left: 118px;
  top: 56px;
  font-family: "RocknRoll One";
  font-style: normal;
  font-weight: 400;
  font-size: 60px;
  line-height: 87px;
  color: #ffffff;
}

.result_assessment {
  position: absolute;
  width: 167px;
  height: 58px;
  left: 121px;
  top: 157px;
  font-family: "RocknRoll One";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 58px;
  color: #ffffff;
}

.result_rankNum {
  position: absolute;
  width: 350px;
  height: 58px;
  left: 320px;
  top: 157px;
  font-family: "RocknRoll One";
  font-style: normal;
  font-weight: 400;
  font-size: 45px;
  line-height: 58px;
  color: #ffffff;
}

#horizon {
  position: absolute;
  width: 1066px;
  height: 0px;
  left: 122px;
  top: 255px;
  border: 0.5px solid #000000;
}

.result_username {
  font-family: "RocknRoll One", sans-serif;
  position: relative;
  top: 691px;
  left: 138px;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 43px;
}

.input_name_form {
  position: absolute;
  width: 525px;
  height: 48px;
  left: 134px;
  top: 744px;
  background: #d9d9d9;
}

.twitter_icon {
  width: 42px;
  height: auto;
  position: relative;
  top: 707px;
  left: 929px;
}

.title_back_button {
  box-sizing: border-box;
  position: absolute;
  width: 157px;
  height: 48px;
  left: 1350px;
  top: 766px;
  background-color: #479de3;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 10px;
  font-family: "RocknRoll One";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 36px;
  color: #ffffff;
}

.result_submit_button {
  box-sizing: border-box;
  position: absolute;
  width: 157px;
  height: 48px;
  left: 695px;
  top: 746px;
  background: #8cb84e;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 10px;
  font-family: "RocknRoll One";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 36px;
  color: #ffffff;
}
</style>
