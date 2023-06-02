import { memo, useContext, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { UserDataContext } from "../providers/userDataProvider";
import { useState } from "react";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import "./ProfArea.css";
import OwnTweet from "./tweets/OwnTweet";
import Reply from "./tweets/Reply.js";
import Media from "./tweets/Media.js";
import Liketweet from "./tweets/Liketweet.js";

const ProfArea = memo(() => {
  const { userData } = useContext(UserDataContext);
  const [ownTweet, setOwnTweet] = useState(true); 
  const [reply, setReply] = useState(false); 
  const [media, setMedia] = useState(false); 
  const [likeTweet, setlikeTweet] = useState(false); 

  const showOwnTweet = () => {
    setOwnTweet(true);
    setReply(false);
    setMedia(false);
    setlikeTweet(false);
  };

  const showReply = () => {
    setOwnTweet(false);
    setReply(true);
    setMedia(false);
    setlikeTweet(false);
  };

  const showMedia = () => {
    setOwnTweet(false);
    setReply(false);
    setMedia(true);
    setlikeTweet(false);
  };

  const showLikeTweet = () => {
    setOwnTweet(false);
    setReply(false);
    setMedia(false);
    setlikeTweet(true);
  };

  const formatDescription = (description) => {
    if (!description) return null;
    const lines = description.split('\\n');
    return lines.map((line, index) => <span key={index} style={{ display: 'block' }}>{line}</span>);
  };

  return (
    <div className="profArea">
      <img src={`${userData.cover}`} alt="cover" className="profArea__cover" />
      <div className="profArea__prof">
        <img src={`${userData.icon}`} alt="icon" className="profArea__icon" />
        <div className="profArea__iconBox">
          <Button className="profArea__followButton">プロフィールを編集</Button>
        </div>
        <div className="profArea__nameArea">
          <h2 className="profArea__displayName">{userData.displayName}</h2>
          <span>@{userData.userId}</span>
        </div>
        <div className="profArea__desp">
          <p>
            {formatDescription(userData.description)}
          </p>
        </div>
        <div className="profArea__account">
          <span><RoomOutlinedIcon />名古屋</span>
          <span><a href="/"><LinkOutlinedIcon />http://localhost:3000/</a></span>
          <span><CalendarMonthOutlinedIcon />2023年5月からTwitterを利用しています</span>
        </div>
        <div className="profArea__folow">
          <a href="/">
            <span><b>1129</b></span>
            <span>フォロー中</span>
          </a>
          <a href="/">
            <span><b>89.4万</b></span>
            <span>フォロワー</span>
          </a>
        </div>
      </div>
      <nav className="profArea__nav">
        <div className={`${ownTweet && "profArea__active"}`} onClick={showOwnTweet}>
          ツイート
          <span className="profArea__bar"></span>
        </div>
        <div className={`${reply && "profArea__active"}`} onClick={showReply}>
          返信
          <span className="profArea__bar"></span>
          </div>
        <div className={`${media && "profArea__active"}`} onClick={showMedia}>
          メディア
          <span className="profArea__bar"></span>
        </div>
        <div className={`${likeTweet && "profArea__active"}`} onClick={showLikeTweet}>
          いいね
          <span className="profArea__bar"></span>
        </div>
      </nav>
      {ownTweet && <OwnTweet />}
      {reply && <Reply />}
      {media && <Media />}
      {likeTweet && <Liketweet />}
    </div>
  );
});

export default ProfArea;
