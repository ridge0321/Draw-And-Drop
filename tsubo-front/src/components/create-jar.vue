<!-- 壺作成画面 -->
<script setup>
import { useRouter } from "vue-router";
import { reactive, ref, watch } from 'vue';
import { set_createjar_data } from '../../lib/localstorage'
const router = useRouter()
// import { ref } from 'vue';
console.log('壺の作成')
const routerDemo = () => {
    const grid_score = calc_create_jar_score()
    set_createjar_data(grid_array, grid_score)
    router.push('/building-jar')
}


// 変更記録をスタック形式で保持する配列
let change_record_stack = []

// グリッドの行数と列数
const ROW_NUM = 16
const COLUMN_NUM = 14

// グリッド用二次元配列を定義する準備のための配列
let grid_array_initial_state = []

// グリッドのクラスを保持する変数
let grid_color_class = []

// grid_array_reserveにtrueを詰め込む
for (let i = 0; i < ROW_NUM; i++) {
    grid_array_initial_state[i] = []
    grid_color_class[i] = []

    for (let j = 0; j < COLUMN_NUM; j++) {
        grid_array_initial_state[i][j] = 1
        grid_color_class[i][j] = "true_grid_color"
    }
}

// 配列をreactiveで定義して監視
let grid_array = reactive(JSON.parse(JSON.stringify(grid_array_initial_state)))


const ans_grid_array = [
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
]


// 全てのグリッドの値の変更を監視する
for (let i = 0; i < grid_array.length; i++) {
    for (let j = 0; j < grid_array[i].length; j++) {
        watch(() => grid_array[i][j], (cr, prev) => {
            console.log("watched")
            console.log(cr, prev)

            if (cr == 1) {
                // 変更後の値がtrueなら "true_grid_color"
                grid_color_class[i][j] = "true_grid_color"
            } else {
                // falseなら "false_grid_color"
                grid_color_class[i][j] = "false_grid_color"
            }

        })
    }

}




// --------------------------------------------------------------
// functions

// 引数で受け取った配列をグリッドを保持している配列に転写する関数
const apply_array_to_grid = (grid_data) => {
    for (let i = 0; i < ROW_NUM; i++) {
        for (let j = 0; j < COLUMN_NUM; j++) {
            grid_array[i][j] = grid_data[i][j]
        }
    }
}




//  クリックされたグリッドの真偽値を反転させる関数
const change_grid_value = (i, j, is_push) => {
    // 引数：i,j      :反転させるグリッドの座標の添え字
    //       is_push :反転させた操作をstackに記録するかどうか（trueなら記録する）

    console.log(i, j);
    if (grid_array[i][j]) {
        grid_array[i][j] = 0
    } else {
        grid_array[i][j] = 1
    }

    if (is_push) {
        //現在のグリッドの配列をスタックに記録として保存
        change_record_stack.push(JSON.parse(JSON.stringify(grid_array)))

    }

    console.log(change_record_stack)
    console.log(grid_array.value)
}




// グリッドの状態をひとつ前に戻す関数
const restore_to_prev_state = () => {
    console.log("restore to prev state")
    if (change_record_stack.length > 0) {
        console.log("change record stack length >0")
        // stackから記録を取り出す

        // 最新のデータ（戻るボタンをクリックしたときに表示されているグリッドの表）を捨てる
        change_record_stack.pop()
        console.log("poped")

        // 最後尾のデータ（反映させたいグリッドの表）を取り出す
        let change_record;
        if (change_record_stack.length == 0) {

            // 戻る先が初期状態のとき
            change_record = grid_array_initial_state
            console.log("grid_array_initial_state")
            console.log(grid_array_initial_state)

        } else {
            // それ以外（通常の処理）
            change_record = change_record_stack[change_record_stack.length - 1]
        }

        console.log("change_record_stack")
        console.log(change_record_stack)
        console.log("change_record")
        console.log(change_record)

        // 変更する配列を反映させる
        apply_array_to_grid(change_record)

    } else {
        // stackが空の時（初期状態の時）
        console.log("change record stack length <0")
        apply_array_to_grid(grid_array_initial_state)
    }
}



// グリッドを初期状態の値にする関数
const restore_grid_to_initial_state = () => {
    // グリッドを初期状態に変更
    apply_array_to_grid(grid_array_initial_state)

    // 初期状態にすることをstackに記録
    change_record_stack.push(JSON.parse(JSON.stringify(grid_array_initial_state)))
}



// 壺の点数を計算する関数
const calc_create_jar_score = () => {
    let now_score = 0
    for (let i = 0; i < ROW_NUM; i++) {
        for (let j = 0; j < COLUMN_NUM; j++) {
            let ans = ans_grid_array[i][j]
            let grid = grid_array[i][j]

            if (grid == 1 && ans == 1) {
                now_score += 3
            } else if (grid == 1 && ans == 0) {
                now_score -= 1
            }
        }
    }

    // 点数を返す
    console.log(now_score)
    return now_score

}


</script>

<template>
    <div class="under_template">
        <button @click="routerDemo" class="go_to_next_page_button">次へ→</button>
        <button class="restore_to_prev_state_button" @click="restore_to_prev_state()">戻す</button>
        <button class="restore_grid_to_initial_state_button" @click="restore_grid_to_initial_state()">初期化</button>
        <div class="explanatory_note">
            <div class="explanatory_note_text">グリッドをクリックして、ツボをつくってみよう</div>
        </div>
        <div class="background_sheet">
            <div class="spacer"></div>
            <table class="grid_table">
                <tbody>
                    <tr v-for="(grid_row_array, i) in grid_array" :key="i">
                        <td v-bind:class="grid_color_class[i][j]" @click="change_grid_value(i, j, true)"
                            v-for="(grid_value, j) in grid_row_array" :key="j">
                            <div class="table_value"><br></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

</template>

<style scoped>
h1 {
    color: red;
    margin: 0;
}

.under_template {
    height: 70%;
}

.grid_table {

    padding: 10%;
    height: auto;
    border-collapse: collapse;

    margin-top: 0%;
    margin-right: auto;
    margin-bottom: 0;
    margin-left: auto;



}

.grid_table td {
    border: 5px solid #282c34;
}

.table_value {
    text-align: center;
    /* gridの大きさ　*/
    width: 33px;
    height: 33px;
    background-color: none;
}

.true_grid_color {
    background-color: rgb(140, 184, 78);
}

.false_grid_color {
    background-color: rgb(135, 141, 153);
}

.background_sheet {
    box-sizing: border-box;

    position: absolute;
    width: 1064px;
    height: 762px;
    left: 436px;
    top: 150px;

    background: #282C34;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

}

.spacer {
    padding-top: 60px;
}

.explanatory_note {

    position: absolute;
    width: 1124px;
    height: 80px;
    left: 406px;
    top: 35px;

    background: #282C34;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;




}



.explanatory_note_text {

    position: absolute;
    width: 933px;
    height: 30px;
    left: 234px;
    top: 23px;
    font-family: 'RocknRoll One';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 43px;
    color: #FFFFFF;

}

.go_to_next_page_button {
    position: absolute;
    width: 254px;
    height: 65px;
    left: 1594px;
    top: 836px;

    background: #479DE3;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    font-family: 'RocknRoll One';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 43px;

    color: #FFFFFF;
}


.restore_to_prev_state_button {
    box-sizing: border-box;

    position: absolute;
    width: 254px;
    height: 60px;
    left: 71px;
    top: 162px;

    background: #D19A66;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    font-family: 'RocknRoll One';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 43px;

    color: #FFFFFF;
}

.restore_grid_to_initial_state_button {

    position: absolute;
    width: 254px;
    height: 60px;
    left: 71px;
    top: 241px;

    background: #C24645;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    font-family: 'RocknRoll One';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 43px;

    color: #FFFFFF;
}
</style>


