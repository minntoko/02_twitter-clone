import { Avatar, Button } from "@mui/material";
import React, { useState, useContext, memo } from "react";
import { UserDataContext } from "../providers/userDataProvider";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import db from "../../firebase";
import "./TweetBox.css";

const TweetBox = memo(() => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const { userData } = useContext(UserDataContext);
  
  const sendTweet = (e) => {
    const tweetId = uuidv4();
    e.preventDefault();
    const tweetRef = doc(db, "tweets", tweetId);
    setDoc(tweetRef, {
      userId: userData.userId,
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
