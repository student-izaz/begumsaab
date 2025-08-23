import "./Header.css";
import { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { AuthContext } from "../../Store/auth";



const Header = ({toggleCart, toggleMobileMenu, cartItem}) => {
    const { cartItems } = useContext(AuthContext);

  return (
    <header className="site-header">
      <div className="site-header-content">
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <IoIosMenu className="icon"/>
        </div>
        <div className="site-brand-logo">
          <img src="../../../assets/site-logo.webp" alt="begum saab" />
        </div>
        <div className="site-navigation">
          <nav>
            <a href="">Sale</a>
            <Link to="/product-category/original_pakistan_wear">OriginalPakistanWear</Link>
            <a href="">FreshArrival</a>
          </nav>
        </div>
        <div className="site-tools">
          <div className="search_icon icon">
            <CiSearch />
          </div>
          <div className="user_icon icon">
            <CiUser />
            <div className="toggle-user-opt">
              <Link to="/my-account">Login / Register</Link>
            </div>
          </div>
          <div className="cart_icon icon" onClick={toggleCart}>
            <CiShoppingCart />
            <span>{cartItems?cartItems.length:0}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
