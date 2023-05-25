import { Avatar, Button } from "@mui/material";
import React, { useState, useEffect, memo } from "react";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import db from "../../firebase";
import "./TweetBox.css";

const TweetBox = memo(() => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  // ここはログイン機能を実装したら変更する
  const [userId, setUserId] = useState("it_engineer");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const user = collection(db, "users");
      const q = query(user, where("userId", "==", userId));
      const userSnapshot = await getDocs(q);
      const userData = userSnapshot.docs.map((doc) => doc.data());
      setUserData(userData[0]);
    };
    getUserData();
  }, [])
  
  const sendTweet = (e) => {
    const tweetId = uuidv4();
    e.preventDefault();
    const tweetRef = doc(db, "tweets", tweetId);
    setDoc(tweetRef, {
      userId: userId,
      text: tweetMessage,
      image: tweetImage,
      created_at: serverTimestamp(),
    });
    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={userData.icon} />
          <input
            type="text"
            placeholder="いまどうしてる？"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          />
        </div>
        <div className="tweetBox__buttons">
          <input
            className="tweetBox__imageInput"
            type="text"
            placeholder="画像のURLを入力してください"
            value={tweetImage}
            onChange={(e) => setTweetImage(e.target.value)}
          />
          <Button
            className="tweetBox__tweetButton"
            type="submit"
            onClick={sendTweet}
          >
            ツイートする
          </Button>
        </div>
      </form>
    </div>
  );
});

export default TweetBox;
