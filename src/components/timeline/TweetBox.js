import { Avatar, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
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

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  // ここはログイン機能を実装したら変更する
  const [user_id, setUser_id] = useState("it_engineer");
  const [userData, setUserData] = useState({});

  // ユーザー情報を取得する
  useEffect(() => {
    const getUserData = async () => {
      const user = collection(db, "users");
      const q = query(user, where("user_id", "==", user_id));
      const userSnapshot = await getDocs(q);
      const userData = userSnapshot.docs.map((doc) => doc.data());
      setUserData(userData[0]);
    };
    getUserData();
  }, [])
  
  const sendTweet = (e) => {
    const tweet_id = uuidv4();
    e.preventDefault();
    const tweetRef = doc(db, "tweets", tweet_id);
    setDoc(tweetRef, {
      user_id: user_id,
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
}

export default TweetBox;
