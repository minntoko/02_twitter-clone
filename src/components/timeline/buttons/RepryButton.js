import { ChatBubbleOutlineRounded } from "@mui/icons-material";
import "./Buttons.css";
import { memo } from "react";

const RepryButton = memo(() => {
  return (
    <div className="post__repryButton">
      <ChatBubbleOutlineRounded fontSize="small" />
    </div>
  )
});

export default RepryButton;