import React from "react";
import { Link } from "react-router-dom";
import "./SidebarOption.css";

function SidebarOption({ text, Icon, route, active }) {
  return (
    <Link to={route} className="sidebarOption__box">
      <div className={`sidebarOption ${active && "sidebarOption__active"}`}>
        <Icon />
        <h2>{text}</h2>
      </div>
    </Link>
  );
}

export default SidebarOption;
