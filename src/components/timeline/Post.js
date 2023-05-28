import { VerifiedUser } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React, { useState, forwardRef, memo } from "react";
import RetweetButton from "./buttons/RetweetButton";
import LikeButton from "./buttons/LikeButton";
import RepryButton from "./buttons/RepryButton";
import ShareButton from "./buttons/ShareButton";
import "./Post.css";

const Post = forwardRef(
  ({ displayName, userName, verified, text, icon, image, tweetId, userId }, ref) => {
    return (
      <div className="post" ref={ref}>
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
            <RetweetButton tweetId={tweetId} />
            <LikeButton tweetId={tweetId} />
            <ShareButton />
          </div>
        </div>
      </div>
    );
  }
);

export default memo(Post);
