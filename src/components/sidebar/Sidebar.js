import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailIcon from '@mui/icons-material/Mail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PendingIcon from '@mui/icons-material/Pending';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Button } from "@mui/material";
import { useLocation } from 'react-router-dom';
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();
  return (
    <div className="sidebar">
      {/* ツイッターアイコン */}
      <TwitterIcon className="sidebar__twitterIcon" />
      {/* SidebarOption */}
      <nav className="sidebar__nav">
        <SidebarOption text="ホーム" Icon={HomeOutlinedIcon} IconA={HomeIcon} route="/" active={location.pathname === '/' ? true : false} />
        <SidebarOption text="話題を検索" Icon={SearchOutlinedIcon} IconA={SearchIcon} route="/" />
        <SidebarOption text="通知" Icon={NotificationsNoneIcon} IconA={NotificationsIcon} route="/" />
        <SidebarOption text="メッセージ" Icon={MailOutlineIcon} IconA={MailIcon} route="/" />
        <SidebarOption text="リスト" Icon={ListAltOutlinedIcon} IconA={ListAltOutlinedIcon} route="/" />
        <SidebarOption text="ブックマーク" Icon={BookmarkBorderOutlinedIcon} IconA={BookmarkIcon} route="/" />
        <SidebarOption text="プロフィール" Icon={PersonOutlinedIcon} IconA={PersonIcon} route="/profile" active={location.pathname === '/profile' ? true : false} />
        <SidebarOption text="もっと見る" Icon={PendingOutlinedIcon} IconA={PendingIcon} route="/" />
      </nav>
      {/* ツイートボタン */}
      <Button variant="outlined" className="sidebar__tweet"><AutoFixHighIcon className="sidebar__tweetIcon" /><p>ツイートする</p></Button>
    </div>
  );
}

export default Sidebar;
