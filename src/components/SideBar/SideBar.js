import React from "react";
import { Menu } from "semantic-ui-react";
import UserInfo from "./UserInfo/UserInfo";
import Channels from "./Channels/Channels";
import PrivateChat from "./PrivateChat/PrivateChat";
import FavouriteChannels from "./FavouriteChannels/FavouriteChannels";

import "./SideBar.css";

export const SideBar = () => {
  return (
    <Menu vertical fixed="left" borderless size="large" className="side_bar">
      <UserInfo />
      <FavouriteChannels />
      <Channels />
      <PrivateChat />
    </Menu>
  );
};
