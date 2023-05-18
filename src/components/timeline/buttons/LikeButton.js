import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import "./Buttons.css";

const LikeButton = ({ like, likeSwitch }) => {
  const [likeCount, setLikeCount] = useState(0);
  const likeCountUp = () => {
    if (like) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };
  return (
    <div
      className="likeBox"
      onClick={() => {
        likeSwitch();
        likeCountUp();
      }}
    >
      <div className={`post__likeButton ${like ? "post__likeActive" : ""}`}>
        {like ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </div>
      <span className={`likeButton__likeCount ${likeCount !== 0 ? "likeButton__likeActive" : ""}`}>{likeCount}</span>
    </div>
  );
};

export default LikeButton;
