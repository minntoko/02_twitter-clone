import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";
import "./TweetBox.css";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();
    addDoc(collection(db, "posts"), {
      displayName: "ITエンジニア",
      userName: "it_engineer",
      verified: true,
      text: tweetMessage,
      avatar: "https://pbs.twimg.com/profile_images/1259823801967079425/EgoCaYUj.jpg",
      image: tweetImage,
      timestamp: serverTimestamp(),
    });
    setTweetMessage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar />
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
