import React from "react";
import "./Header.css";
import HeaderOption from "./HeaderOption";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from "@material-ui/icons/Chat";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../features/userSlice";

function Header({ user }) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className="header">
      <div className="header__left">
        <img
          className="header__img"
          src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg"
          alt="Logo"
        />
        <div className="header__search">
          <SearchIcon />
          <input type="text" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccount} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messaging" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <HeaderOption logout={logOut} isAvatar avatar={user?.photoURL} title="me" />
      </div>
    </div>
  );
}

export default Header;
