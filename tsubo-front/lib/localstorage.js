// localstorageを使うためのモジュール
// jsonとの変換もこのモジュールの中でおこないます

// createjarのデータをlocalstorageに保存
export const set_createjar_data = (grid_array, score) => {
    // grid_array : 作成したグリッドにあたる二次元配列 
    // score : 出来栄え点 
    // {"create_jar" : {"grid_data":xxxx , "score":xxxx}}

    let set_data = { "grid_data": grid_array, "score": score }

    // jsonへの変換
    let set_json_data = JSON.stringify(set_data);

    //localstorageへset
    localStorage.setItem('createjar_data', set_json_data);
    console.log("setしたデータを表示")
    console.log(set_json_data)

}


// createjarのデータをlocalstorageから取得
export const get_createjar_data = () => {

    // データをgetしjsonから変換
    let get_data = JSON.parse(localStorage.getItem('createjar_data'));

    console.log("getしたデータを表示")
    console.log(get_data)
    return get_data

}

// buildingjarのデータをlocalstorageに保存
export const set_buildingjar_data = (jar_count) => {
    // jar_count :  積み上げたオブジェクトの数　
    // {"buildingjar_data" : {"jar_count" : xxxx }}
    let set_data = { "jar_count": jar_count }

    // jsonへの変換
    let set_json_data = JSON.stringify(set_data);

    //localstorageへset
    localStorage.setItem('buildingjar_data', set_json_data);
    console.log("setしたデータを表示")
    console.log(set_json_data)

}


// buildingjarのデータをlocalstorageから取得
export const get_buildingjar_data = () => {

    // データをgetしjsonから変換
    let get_data = JSON.parse(localStorage.getItem('buildingjar_data'));

    console.log("getしたデータを表示")
    console.log(get_data)
    return get_data
}