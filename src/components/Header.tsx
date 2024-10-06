import { Settings } from "../svg";

import { type Navigator } from "react-router-dom";

const Header = ({
  selected,
  reactNavigator,
}: {
  selected: string;
  reactNavigator: Navigator;
}) => {
  return (
    <div className="header">
      <input
        type="text"
        placeholder="Поиск..."
        onChange={() => {
          console.log(123);
        }}
        className="header-input"
      />
      <Settings
        style={{
          opacity: selected == "/settings" ? "1" : "0.7",
          transform:
            selected == "/settings" ? "rotate(0deg)" : "rotate(180deg)",
          transition: "0.5s",
        }}
        onClick={() => reactNavigator.push("/settings")}
      />
    </div>
  );
};

export default Header;
