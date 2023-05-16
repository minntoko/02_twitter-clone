import { Repeat } from "@mui/icons-material";

const RetweetButton = ({ retweet, retweetSwitch }) => {
  return (
    <div className="post__retweetButton" onClick={retweetSwitch}>
      <Repeat
        fontSize="small"
        className={`post__retweet ${retweet ? "post__retweetActive" : ""}`}
      />
    </div>
  )
}

export default RetweetButton;
