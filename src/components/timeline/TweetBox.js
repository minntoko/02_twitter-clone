import { Avatar, Button } from "@mui/material";
import React from "react";
import "./TweetBox.css";

function TweetBox() {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar />
          <input type="text" placeholder="いまどうしてる？" />
        </div>
        <div className="tweetBox__buttons">
          <input
            className="tweetBox__imageInput"
            type="text"
            placeholder="画像のURLを入力してください"
          />
          <Button className="tweetBox__tweetButton" type="submit">
            ツイートする
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
