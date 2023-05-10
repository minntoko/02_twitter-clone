import React from "react";
import "./Timeline.css";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";

function Timeline () {
  const postData = collection(db, "post");
  getDocs(postData).then((querySnapshot) => {
    console.log(querySnapshot.docs.map((doc) => doc.data()));
  });
  return (
    <div className="timeline">
      {/* Header */}
      <div className="timeline__header">
        <h2>ホーム</h2>
      </div>
      {/* TweetBox */}
      <TweetBox />
      {/* Post */}
      <Post
        displayName="ITエンジニア"
        userName="it_engineer"
        verified={true}
        text="初めてのツイート"
        avatar="https://pbs.twimg.com/profile_images/1259823801967079425/EgoCaYUj.jpg"
        image="https://images.unsplash.com/photo-1558126319-c9feecbf57ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2064&q=80"
      />
    </div>
  );
}

export default Timeline;
