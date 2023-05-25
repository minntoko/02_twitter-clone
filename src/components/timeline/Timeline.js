import {  memo, useContext } from "react";
import { TweetContext } from "../providers/tweetProvider";
import FlipMove from "react-flip-move";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Timeline.css";

const Timeline = memo(() => {
  const { tweets } = useContext(TweetContext);
  return (
    <div className="timeline">
      <div className="timeline__header">
        <h2>ホーム</h2>
      </div>
      <TweetBox />
      <FlipMove>
        {tweets.map((tweet) => (
          <Post
            key={tweet.tweetId}
            className="timeline__post"
          />
        ))}
      </FlipMove>
    </div>
  );
});

export default Timeline;
