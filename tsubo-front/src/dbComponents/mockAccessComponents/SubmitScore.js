const SubmitScore = (props) => {
    const { totalScore, podRank, podCount } = props;

    console.log(`propsトータルスコア：${totalScore}`);
    console.log(`props壺のランク：${podRank}`);
    console.log(`propsポッドの数：${podCount}`);

    const rankNum = Math.round(Math.random()*100);
    console.log(`ランダムなランキングを返却：${rankNum}`);

    const status = 200;
    console.log(`ステータス：${status}`)

    return(
        {
            status:status,
            rankNum:rankNum
        }
    )
}

export default SubmitScore;