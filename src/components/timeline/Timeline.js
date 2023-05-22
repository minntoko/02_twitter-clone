import React, { useState, useEffect } from "react";
import "./Timeline.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import db from "../../firebase";
import FlipMove from "react-flip-move";

function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const tweetsRef = collection(db, "tweets");
    const q = query(tweetsRef, orderBy("created_at", "desc"));
  
    onSnapshot(q, async (queryTweets) => {
      const newTweetPromises = queryTweets.docs.map(async (doc) => {
        const tweet = doc.data();
        const tweetId = doc.id;
  
        const userRef = collection(db, "users");
        const tweetQ = query(userRef, where("user_id", "==", tweet.user_id));
        const userSnapshot = await getDocs(tweetQ);
        const userData = userSnapshot.docs.map((doc) => doc.data());
        console.log(userData[0]);
        return {
          id: tweetId,
          displayName: userData[0].displayName,
          userName: userData[0].user_id,
          verified: userData[0].verified,
          text: tweet.text,
          image: tweet.image,
          icon: userData[0].icon,
        };
      });
  
      const newTweets = await Promise.all(newTweetPromises);
      setPosts(newTweets);
    });
  }, []);

  return (
    <div className="timeline">
      {/* Header */}
      <div className="timeline__header">
        <h2>ホーム</h2>
      </div>
      {/* TweetBox */}
      <TweetBox />
      {/* Post */}
      <FlipMove>
        {posts.map((post, index) => (
          <Post
            key={index}
            displayName={post.displayName}
            userName={post.userName}
            verified={post.verified}
            text={post.text}
            avatar={post.icon}
            image={post.image}
            like_count={0}
            retweet_count={2}
            className="timeline__post"
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Timeline;
