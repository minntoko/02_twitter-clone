import { Repeat } from "@mui/icons-material";
import { memo, useContext, useState } from "react";
import { UserDataContext } from "../../providers/userDataProvider";
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  onSnapshot,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import db from "../../../firebase";
import "./Buttons.css";

const RetweetButton = memo(({ tweetId }) => {
  const [retweet, setRetweet] = useState(false);
  const [retweetCount, setRetweetCount] = useState(0);
  const { userData } = useContext(UserDataContext);

  const getRetweetData = async () => {
    let retweetDatas = [];
    const retweetCollection = collection(db, "retweets");
    const q = query(retweetCollection, where("tweetId", "==", tweetId));
    onSnapshot(q, (querySnapshot) => {
      retweetDatas = querySnapshot.docs.map((doc) => doc.data());
      setRetweetCount(retweetDatas.length);
      retweetDatas.forEach((retweetData) => {
        if (
          retweetData.userId === userData.userId &&
          retweetData.tweetId === tweetId
        ) {
          setRetweet(true);
        }
      });
    });
  };
  getRetweetData();

  const retweetSwitch = () => {
    setRetweet(retweet ? false : true);
  };

  const retweetCountUp = async () => {
    if (retweet) {
      setRetweetCount(retweetCount - 1);
      const retweetCollection = collection(db, "retweets");
      const q = query(
        retweetCollection,
        where("tweetId", "==", tweetId),
        where("userId", "==", userData.userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        const userRetweetRef = doc(db, "retweets", document.id);
        await deleteDoc(userRetweetRef);
      });
      setRetweet(false);
    } else {
      setRetweetCount(retweetCount + 1);
      await addDoc(collection(db, "retweets"), {
        retweetId: uuidv4(),
        userId: userData.userId,
        tweetId: tweetId,
        created_at: serverTimestamp(),
      });
    }
  };
  return (
    <div
      className="retweetBox"
      onClick={() => {
        retweetSwitch();
        retweetCountUp();
      }}
    >
      <div className="post__retweetButton" onClick={retweetSwitch}>
        <Repeat
          fontSize="small"
          className={`post__retweet ${retweet ? "post__retweetActive" : ""}`}
        />
      </div>
      <span
        className={`retweetButton__retweetCount ${
          retweetCount !== 0 ? "likeButton__likeActive" : ""
        }`}
      >
        {retweetCount}
      </span>
    </div>
  );
});

export default RetweetButton;
