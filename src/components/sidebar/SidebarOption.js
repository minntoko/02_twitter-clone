import React from "react";
import "./SidebarOption.css";

function SidebarOption({ text, Icon, active }) {
  return (
    <div className="sidebarOption__box">
      <div className={`sidebarOption ${active && "sidebarOption__active"}`}>
        <Icon />
        <h2>{text}</h2>
      </div>
    </div>
  );
}

export default SidebarOption;
