import { VerifiedUser } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState, forwardRef } from "react";
import RetweetButton from "./buttons/RetweetButton";
import LikeButton from "./buttons/LikeButton";
import RepryButton from "./buttons/RepryButton";
import ShareButton from "./buttons/ShareButton";
import "./Post.css";

const Post = forwardRef(
  ({ id, userId, displayName, userName, verified, text, avatar, image }, ref) => {
    // useStateでいいねの状態を保持
    const [retweet, setRetweet] = useState(false);
    const retweetSwitch = () => {
      setRetweet(retweet ? false : true);
    };
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
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
            <RetweetButton retweet={retweet} retweetSwitch={retweetSwitch} />
            <LikeButton id={id} userId={userId} />
            <ShareButton />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
