import { memo, useContext, useState, useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { UserDataContext } from "../providers/userDataProvider";
import { Link } from "react-router-dom";
import "./Mypage.css";
import ProfArea from "./ProfArea";
import db from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Mypage = memo(() => {
  const [tweetCount, setTweetCount] = useState(0);
  const { userData } = useContext(UserDataContext);
    useEffect(() => {
    const fetchTweetCount = async () => {
      const tweetsRef = collection(db, 'tweets');
      const q = query(tweetsRef, where("userId", "==", userData.userId));
      const querySnapshot = await getDocs(q);
      setTweetCount(querySnapshot.size);
    };

    fetchTweetCount();
  }, [userData.userId]);
  return (
    <div className="mypage">
      <div className="mypage__header">
        <Link to="/" className="mypage__backBtn">
          <KeyboardBackspaceIcon />
        </Link>
        <div className="mypage__displayName">
          <h2>{userData.displayName}</h2>
          <span>{tweetCount}件のツイート</span>
        </div>
      </div>
      <ProfArea />
    </div>
  );
});

export default Mypage;
