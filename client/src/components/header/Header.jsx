import React from "react";
import './header.css';

function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className ="headerTitlehead">Weducate</span>
            <span className ="headerTitleline">Way to Educate</span>
        </div>
        <img className ="header-image" src={require("../image/background1.jpg")} alt="background" />
    </div>
)};

export default Header;
