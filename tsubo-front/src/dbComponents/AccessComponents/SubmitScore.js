import db from "../Firebase";
import { collection, getFirestore, getCountFromServer, query, where } from 'firebase/firestore';

const SubmitScore = async (props) => {
    const { totalScore, podRank, podCount } = props;
    var status = Number()

    const dbcollection = await db.collection("rankingDB");
    
    const newDoc = await dbcollection.doc().id
    dbcollection.doc(newDoc).set({
        userName: "無名の壺職人",
        totalScore: Number(totalScore),
        podRank: String(podRank),
        podCount: Number(podCount),
    }).then((res) => {
        status = 200 
    }).catch((error) => {
        console.log(error);
        status = 400
    });

    //ランキング順位取得用の識別IDを格納
    sessionStorage.setItem('checkID', newDoc);
    const checkID = sessionStorage.getItem('checkID');
    var rankNum = Number()
    const myrank = await db.collection('rankingDB').where("totalScore", ">", totalScore).get().then(snap => {
        rankNum = snap.size 
        return{
            status: status,
            rankNum: rankNum
        };
     });
    
    return myrank

}

export default SubmitScore;