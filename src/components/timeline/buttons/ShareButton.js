import { FileUploadOutlined } from "@mui/icons-material";
import "./Buttons.css";
import { memo } from "react";

const ShareButton = memo(() => {
  return (
    <div className="post__shareButton">
      <FileUploadOutlined fontSize="small" />
    </div>
  );
});

export default ShareButton;