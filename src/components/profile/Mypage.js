import React from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import "./Mypage.css";
import ProfArea from "./ProfArea";

function Mypage() {
  return (
    <div className="mypage">
      <div className="mypage__header">
        <Link to="/" className="mypage__backBtn">
          <KeyboardBackspaceIcon />
        </Link>
        <div className="mypage__displayName">
          <h2>ITエンジニア</h2>
          <span>123件のツイート</span>
        </div>
      </div>
      <ProfArea />
    </div>
  );
}

export default Mypage;
