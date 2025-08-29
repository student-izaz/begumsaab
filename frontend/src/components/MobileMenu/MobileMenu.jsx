// src/components/CartSidebar.js
import React, { useState, useEffect } from "react";
import "./MobileMenu.css";
import { useAuth } from "../../Store/auth";

const MobileMenu = ({ isOpen, onClose }) => {
  const [isMobileMenu, setMobileMenu] = useState("menu");
  const { user } = useAuth();

  // Disable page scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen,user]);

  return (
    <div className={`mobile-menu-sidebar ${isOpen ? "open" : ""}`}>
      <div className="mobile-menu-category">
        <div className="menu-options">
          <div
            className={`mobile-menu ${isMobileMenu == "menu" ? "active" : ""}`}
            onClick={() => setMobileMenu("menu")}
          >
            <p>Menu</p>
          </div>
          <div
            className={`mobile-category ${
              isMobileMenu == "category" ? "active" : ""
            }`}
            onClick={() => setMobileMenu("category")}
          >
            <p>Category</p>
          </div>
        </div>
        {isMobileMenu == "menu" ? <MenuList /> : <CategoryList />}
      </div>
    </div>
  );
};

export default MobileMenu;

export const MenuList = () => {
  const { isLoggedIn } = useAuth();
  const { user } = useAuth();
  return (
    <div className="menu-list">
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="#">Sales on Latest Brand</a>
        </li>
        <li>
          <a href="#">Shop By Brand</a>
        </li>
        <li>Fresh Arrival</li>
        <li>Lawn Collection</li>
        <li>Party & Festive Collection</li>
        <li>Winter Collection</li>
        {!isLoggedIn ? (
          <li>
            <a href="/my-account">Login / Register</a>
          </li>
        ) : (
          <li>
            <a href="/logout">Logout</a>
          </li>
        )}
        {/* ✅ Admin link only if user.isAdmin */}
        {user?.isAdmin && (
          <li>
            <a href="/admin">Admin</a>
          </li>
        )}
      </ul>
    </div>
  );
};

export const CategoryList = () => {
  const [selectCategory, setSelectCategory] = useState(null)

  return (
    <div className="menu-list">
      <ul>
        <li onClick={()=>setSelectCategory("adan's libas fuchsia chapter1 1")}>Adan’s Libas Fuchsia Chapter 1</li>
        <li>Alizeh Dhaagay Vol-2</li>
        <li>Alizeh Mehfil-e-Uroos</li>
        <li>Asim Jofa Aira Collection</li>
        <li>Chevron Luxury Lawn Collection</li>
        <li>Charizma Tabeer Silk Edit</li>
        <li>Charizma Vasl Embroidered</li>
        <li>Charizma Dastan-E-Jashan</li>

        <li>Asim Jofa Aira Collection</li>
        <li>Chevron Luxury Lawn Collection</li>
        <li>Charizma Tabeer Silk Edit</li>
        <li>Charizma Vasl Embroidered</li>
        <li>Charizma Dastan-E-Jashan</li>

        <li>Asim Jofa Aira Collection</li>
        <li>Chevron Luxury Lawn Collection</li>
        <li>Charizma Tabeer Silk Edit</li>
        <li>Charizma Vasl Embroidered</li>
        <li>Charizma Dastan-E-Jashan</li>
      </ul>
    </div>
  );
};
