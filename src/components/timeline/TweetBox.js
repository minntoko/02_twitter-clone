import { Avatar, Button } from "@mui/material";
import React, { useState, useContext, memo } from "react";
import { UserDataContext } from "../providers/userDataProvider";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import db from "../../firebase";
import "./TweetBox.css";

const TweetBox = memo(() => {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const { userData } = useContext(UserDataContext);

  const isMessageEmpty = tweetMessage.trim() === "";
  const isImageEmpty = tweetImage.trim() === "";
  const tweetEmpty = isMessageEmpty && isImageEmpty;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      sendTweet(e);
    }
  };

  const sendTweet = (e) => {
    e.preventDefault();
    if ( tweetEmpty ) {
      return;
    }
    const tweetId = uuidv4();
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
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="tweetBox__buttons">
          <input
            className="tweetBox__imageInput"
            type="text"
            placeholder="画像のURLを入力してください"
            value={tweetImage}
            onChange={(e) => setTweetImage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            className={`tweetBox__tweetButton ${
              tweetEmpty && "tweetBox__tweetButton--disabled"
            }`}
            disableRipple={tweetEmpty}
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
