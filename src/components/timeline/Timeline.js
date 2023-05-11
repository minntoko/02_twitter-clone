import React, { useState, useEffect } from "react";
import "./Timeline.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";

function Timeline () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postData = collection(db, "post");
    getDocs(postData).then((querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [])
  
  return (
    <div className="timeline">
      {/* Header */}
      <div className="timeline__header">
        <h2>ホーム</h2>
      </div>
      {/* TweetBox */}
      <TweetBox />
      {/* Post */}
      {posts.map((post, index) => (
        <Post
          key={index}
          displayName={post.displayName}
          userName={post.userName}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default Timeline;
