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
import { Button } from "@mui/material";

function Sidebar() {
  return (
    <div className="sidebar">
      {/* ツイッターアイコン */}
      <TwitterIcon className="sidebar__twitterIcon" />
      {/* SidebarOption */}
      <SidebarOption text="ホーム" Icon={HomeIcon} />
      <SidebarOption text="話題を検索" Icon={SearchIcon} />
      <SidebarOption text="通知" Icon={NotificationsNoneIcon} />
      <SidebarOption text="メッセージ" Icon={MailOutlineIcon} />
      <SidebarOption text="リスト" Icon={ListAltOutlinedIcon} />
      <SidebarOption text="ブックマーク" Icon={BookmarkBorderOutlinedIcon} />
      <SidebarOption text="プロフィール" Icon={PersonOutlinedIcon} />
      <SidebarOption text="もっと見る" Icon={PendingOutlinedIcon} />
      {/* ツイートボタン */}
      <Button variant="outlined" className="sidebar__tweet">ツイートする</Button>
    </div>
  );
}

export default Sidebar;
