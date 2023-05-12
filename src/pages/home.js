import React from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import Sidevar from "../components/sidebar/Sidebar";
import Timeline from "../components/timeline/Timeline";
import Widgets from "../components/widget/Widgets";


function Home() {
  const homeStyles = css`
    display: flex;
    height: 100vh;
    max-width: 1265px;
    margin: 0 auto;
    padding: 0 10px;
  `;

  return (
    <div css={homeStyles}>
      <Sidevar />
      <Timeline />
      <Widgets />
    </div>
  );
}

export default Home;
