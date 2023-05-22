import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import Sidevar from "../components/sidebar/Sidebar";
import Mypage from "../components/profile/Mypage.js";
import Widgets from "../components/widget/Widgets";

function Profile() {
  const profStyles = css`
    display: flex;
    justify-content: center;
    height: 100vh;
    max-width: 1265px;
    margin: 0 auto;
    padding: 0 10px;
    @media (max-width: 1077px) {
      padding: 0;
    }
    @media (max-width: 500px) {
      flex-direction: column-reverse;
      overflow: hidden;
      overscroll-behavior-y: none;
    }
  `;

  return (
    <div css={profStyles}>
      <Sidevar />
      <Mypage />
      <Widgets />
    </div>
  );
}

export default Profile;
