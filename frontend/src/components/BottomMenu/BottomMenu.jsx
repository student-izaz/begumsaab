import React from "react";
import "./BottomMenu.css";
import { CiHome } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiBookLight } from "react-icons/pi";

const BottomMenu = () => {
  return (
    <div className="bottom-menu">
      <div className="bottom-menu-content">
        <nav>
          <a href="/" className="icon">
            <CiHome />
            <p className="bottom-menu-text">Home</p>
          </a>
          <a href="/" className="icon">
            <CiSearch  />
            <p className="bottom-menu-text">Search</p>
          </a>
          <a href="/" className="icon">
            <CiHeart />
            <p className="bottom-menu-text">Wishlist</p>
            <span className="wishlist">0</span>
          </a>
          <a href="/" className="icon">
            <PiBookLight />
            <p className="bottom-menu-text">Catalogue</p>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default BottomMenu;
