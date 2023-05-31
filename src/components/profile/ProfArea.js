import { memo, useContext, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { UserDataContext } from "../providers/userDataProvider";
import "./ProfArea.css";
import { useState } from "react";

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
      </div>
    </div>
  );
});

export default ProfArea;
