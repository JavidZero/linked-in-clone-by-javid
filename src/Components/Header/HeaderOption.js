import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@material-ui/core";

function HeaderOption({ Icon, title, isAvatar, avatar, logout }) {
  return (
    <div onClick={logout} className="headerOption">
      {Icon && <Icon className="headerOption__icon" />}
      {isAvatar && <Avatar className="headerOption__icon" src={avatar} />}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  );
}

export default HeaderOption;
