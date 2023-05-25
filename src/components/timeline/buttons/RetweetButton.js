import { Repeat } from "@mui/icons-material";
import { memo, useState } from "react";
import "./Buttons.css";

const RetweetButton = memo(({ retweet, retweetSwitch }) => {
  const [retweetCount, setRetweetCount] = useState(0);
  const retweetCountUp = () => {
    if (retweet) {
      setRetweetCount(retweetCount - 1);
    } else {
      setRetweetCount(retweetCount + 1);
    }
  };
  return (
    <div
      className="retweetBox"
      onClick={() => {
        retweetSwitch();
        retweetCountUp();
      }}
    >
      <div className="post__retweetButton" onClick={retweetSwitch}>
        <Repeat
          fontSize="small"
          className={`post__retweet ${retweet ? "post__retweetActive" : ""}`}
        />
      </div>
      <span className={`retweetButton__retweetCount ${retweetCount !== 0 ? "likeButton__likeActive" : ""}`}>{retweetCount}</span>
    </div>
  );
});

export default RetweetButton;
