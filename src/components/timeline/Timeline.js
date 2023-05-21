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
    // ここでツイートとユーザー情報を取得する処理を書く
    const tweetsRef = collection(db, "tweets");
    const q = query(tweetsRef, orderBy("created_at", "desc"));
    // ツイートドキュメントのリアルタイムリスナーを設定
    onSnapshot(q, (queryTweets) => {
      setPosts(
        queryTweets.docs.map(async (doc) => {
          const tweet = doc.data();
          const tweetId = doc.id;

          // ユーザー情報を取得する
          const user = collection(db, "users");
          const tweetQ = query(user, where("user_id", "==", tweet.user_id));
          const userSnapshot = await getDocs(tweetQ);
          const userData = userSnapshot.docs.map((doc) => doc.data());
          return { ...tweet, ...userData[0], tweet_id: tweetId };
        })
      );
    });
  }, []);
  console.log(posts);

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
