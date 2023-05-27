import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Button } from "@mui/material";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      {/* ツイッターアイコン */}
      <TwitterIcon className="sidebar__twitterIcon" />
      {/* SidebarOption */}
      <nav className="sidebar__nav">
        <SidebarOption text="ホーム" Icon={HomeIcon} route="/" active />
        <SidebarOption text="話題を検索" Icon={SearchIcon} route="/" />
        <SidebarOption text="通知" Icon={NotificationsNoneIcon} route="/" />
        <SidebarOption text="メッセージ" Icon={MailOutlineIcon} route="/" />
        <SidebarOption text="リスト" Icon={ListAltOutlinedIcon} route="/" />
        <SidebarOption text="ブックマーク" Icon={BookmarkBorderOutlinedIcon} route="/" />
        <SidebarOption text="プロフィール" Icon={PersonOutlinedIcon} route="profile" />
        <SidebarOption text="もっと見る" Icon={PendingOutlinedIcon} route="/" />
      </nav>
      {/* ツイートボタン */}
      <Button variant="outlined" className="sidebar__tweet"><AutoFixHighIcon className="sidebar__tweetIcon" /><p>ツイートする</p></Button>
    </div>
  );
}

export default Sidebar;
