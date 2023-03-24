import db from "../Firebase"

const LookRankig = async () => {
    const rankingList = Array()
    
    const dbcollection = await db.collection("rankingDB");

    const snapshot = await dbcollection.orderBy("totalScore", "desc").limit(10).get()
    console.log(snapshot)
    var i = 1
    snapshot.forEach( doc => {
        let rankerInfo = {
        status: 200,
        rankNum: i,
        userName: `${doc.data().userName}`,
        totalScore: `${doc.data().totalScore}`,
        podRank: `${doc.data().podRank}`,
        podCount: `${doc.data().podCount}`,
        }
        rankingList.push(rankerInfo)
        i = i + 1
    })
    
    return(rankingList)
}

export default LookRankig;