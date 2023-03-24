const SetName = (props) => {
    const { userName } = props;

    console.log(`propsユーザネーム：${userName}`);

    const status = 200;
    console.log(`ステータス：${status}`)

    return(
        {
            status:200
        }
    )
}

export default SetName;