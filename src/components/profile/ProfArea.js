import { memo, useContext } from "react";
import { Avatar, Button } from "@mui/material";
import { UserDataContext } from "../providers/userDataProvider";
import "./ProfArea.css";

const ProfArea = memo(() => {
  const { userData } = useContext(UserDataContext);
  return (
    <div className="profArea">
      <img src={`${userData.cover}`} alt="cover" className="profArea__cover" />
      <div className="profArea__prof">
        <img src={`${userData.icon}`} alt="icon" className="profArea__icon" />
        <div className="profArea__iconBox">
          <div>
            <Button className="profArea__followButton">プロフィールを編集</Button>
          </div>
        </div>
        <h2 className="profArea__displayName">{userData.displayName}</h2>
        <span>@{userData.userId}</span>
      </div>
    </div>
  );
});

export default ProfArea;
