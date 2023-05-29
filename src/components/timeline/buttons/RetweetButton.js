import { Repeat } from "@mui/icons-material";
import { memo, useContext, useState } from "react";
import { UserDataContext } from "../../providers/userDataProvider";
import {
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import db from "../../../firebase";
import "./Buttons.css";

const RetweetButton = memo(({ tweetId, retweetId, userId }) => {
  const [retweet, setRetweet] = useState(false);
  const [retweetCount, setRetweetCount] = useState(0);
  const { userData } = useContext(UserDataContext);

  const getRetweetData = async () => {
    let retweetDatas = [];
    const retweetCollection = collection(db, "retweets");
    const q = query(retweetCollection, where("tweetId", "==", tweetId));
    onSnapshot(q, (querySnapshot) => {
      setRetweet(false);
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
      // リツイートしたツイートを削除
      getRetweetData();
      if (retweetId) {
        const retweetTweetRef = doc(db, "tweets", retweetId);
        await deleteDoc(retweetTweetRef);
      } else {
        // リツイートテーブルにツイートIDとuserIdが一致するデータがなければ、ツイートを削除
        const retweetCollection = collection(db, "retweets");
        const q = query(
          retweetCollection,
          where("tweetId", "==", tweetId),
          where("userId", "==", userData.userId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (document) => {
          const userRetweetRef = doc(db, "tweets", document.data().retweetId);
          await deleteDoc(userRetweetRef);
        });
      }
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
      const retweetId = uuidv4();
      await addDoc(collection(db, "retweets"), {
        retweetId: retweetId,
        userId: userData.userId,
        tweetId: tweetId,
        created_at: serverTimestamp(),
      });
      // リツイートするツイートのデータを取得
      const retweetPost = async () => {
        const tweetDocRef = doc(db, "tweets", tweetId);
        const tweetDoc = await getDoc(tweetDocRef);
        const tweetData = tweetDoc.data();

        const tweetText = tweetData.text;
        const tweetImage = tweetData.image;

        // リツイート用のツイートを作成
        const retweetTweetRef = doc(db, "tweets", retweetId);
        await setDoc(retweetTweetRef, {
          userId: userId,
          text: tweetText,
          image: tweetImage,
          created_at: serverTimestamp(),
        });
      };
      retweetPost();
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
