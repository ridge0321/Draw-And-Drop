import db from "../Firebase";
import { doc, updateDoc } from "firebase/firestore";

const SetName = async (props) => {
    const { userName } = props;
    try{
        const checkID = sessionStorage.getItem("checkID");
        await updateDoc(doc(db, "rankingDB", checkID),{
            userName: String(userName)
        })
        sessionStorage.clear();
        return({
            status:200
        })
    } catch(e){
        console.log(e);
        return({
            status:400
        })
    }
};

export default SetName;