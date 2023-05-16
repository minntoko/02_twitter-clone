import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const LikeButton = ({ like, likeSwitch }) => {
  return (
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
  );
};

export default LikeButton;