import React from "react";

import "./LinkWithIcon.css";
import { NavLink } from "react-router-dom";

const LinkWIthIcon = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title}
      <img className="link_emoji" src={emoji} alt="" />
    </NavLink>
  );
};

export default LinkWIthIcon;
