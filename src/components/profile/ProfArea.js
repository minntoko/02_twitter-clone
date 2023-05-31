import { memo, useContext, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { UserDataContext } from "../providers/userDataProvider";
import { useState } from "react";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import "./ProfArea.css";

const ProfArea = memo(() => {
  const { userData } = useContext(UserDataContext);
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
    </div>
  );
});

export default ProfArea;
