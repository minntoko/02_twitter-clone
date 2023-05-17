import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import "./Buttons.css";

const LikeButton = ({ like, likeSwitch }) => {
  return (
    <div className="likeBox">
      <div
        className={`post__likeButton ${like ? "post__likeActive" : ""}`}
        onClick={likeSwitch}
      >
        {like ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </div>
    </div>
  );
};

export default LikeButton;
