import { memo, useContext } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { UserDataContext } from "../providers/userDataProvider";
import { Link } from "react-router-dom";
import "./Mypage.css";
import ProfArea from "./ProfArea";

const Mypage = memo(() => {
  const { userData } = useContext(UserDataContext);
  return (
    <div className="mypage">
      <div className="mypage__header">
        <Link to="/" className="mypage__backBtn">
          <KeyboardBackspaceIcon />
        </Link>
        <div className="mypage__displayName">
          <h2>{userData.displayName}</h2>
          <span>〇〇件のツイート</span>
        </div>
      </div>
      <ProfArea />
    </div>
  );
});

export default Mypage;
