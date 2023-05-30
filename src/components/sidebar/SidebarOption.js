import { useNavigate } from "react-router-dom";
import "./SidebarOption.css";

function SidebarOption({ text, Icon, IconA, route, active }) {
  console.log(active);
  const navigate = useNavigate();

  const handleClickOption = () => {
    navigate(route);
  };
  return (
    <div className="sidebarOption__box" onClick={handleClickOption}>
      <div className={`sidebarOption ${active && "sidebarOption__active"}`}>
        {active ? <IconA /> : <Icon />}
        <h2>{text}</h2>
      </div>
    </div>
  );
}

export default SidebarOption;
