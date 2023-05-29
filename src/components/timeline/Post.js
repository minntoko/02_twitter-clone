import { VerifiedUser } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState, forwardRef, memo } from "react";
import RetweetButton from "./buttons/RetweetButton";
import { Repeat } from "@mui/icons-material";
import LikeButton from "./buttons/LikeButton";
import RepryButton from "./buttons/RepryButton";
import ShareButton from "./buttons/ShareButton";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../firebase";
import "./Post.css";

const Post = forwardRef(
  (
    { displayName, userName, verified, text, icon, image, tweetId, userId },
    ref
  ) => {
    // リツイートテーブルからリツイートしたユーザーのIDを取得
    const [retweetData, setRetweetData] = useState("");
    const [originalTweetId, setOriginalTweetId] = useState(tweetId);
    const [retweetId, setRetweetId] = useState("");
    const getRetweetData = async () => {
      const retweetCollection = collection(db, "retweets");
      const q = query(retweetCollection, where("retweetId", "==", tweetId));
      // qが空かどうかを判定
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return;
      } else {
        // querySnapshotの中身を取得
        querySnapshot.forEach((doc) => {
          setRetweetData(doc.data().userId);
          setOriginalTweetId(doc.data().tweetId);
          setRetweetId(doc.data().retweetId);
        });
      }
    };
    getRetweetData();
    return (
      <div className="post" ref={ref}>
        {retweetData && (
          <div className="post__retweetMessage">
            <Repeat className="post__retweetIcon" />
            {`${retweetData}さんがリツイートしました`}
          </div>
        )}
        <div className="post__box">
          <div className="post__avatar">
            <Avatar src={icon} />
          </div>
          <div className="post__content">
            <div className="post__header">
              <h3>{displayName}</h3>
              <span className="post__special">
                {verified ? <VerifiedUser className="post__badge" /> : null}@
                {userName}
              </span>
            </div>
            <div className="post__body">
              <div className="post__description">
                <p>{text}</p>
              </div>
              {image && (
                <div className="post__img">
                  <img src={image} />
                </div>
              )}
            </div>
            <div className="post__footer">
              <RepryButton />
              <RetweetButton tweetId={originalTweetId} retweetId={retweetId} userId={userId} />
              <LikeButton tweetId={originalTweetId} />
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default memo(Post);
