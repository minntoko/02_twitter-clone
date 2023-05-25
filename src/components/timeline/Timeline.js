import {  memo, useContext } from "react";
import { TweetContext } from "../providers/tweetProvider";
import FlipMove from "react-flip-move";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Timeline.css";

const Timeline = memo(() => {
    const tweets = useContext(TweetContext);
  console.log(tweets);
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
            displayName={tweet.displayName}
            userName={tweet.userName}
            verified={tweet.verified}
            text={tweet.text}
            icon={tweet.icon}
            image={tweet.image}
            className="timeline__post"
          />
        ))}
      </FlipMove>
    </div>
  );
});

export default Timeline;
