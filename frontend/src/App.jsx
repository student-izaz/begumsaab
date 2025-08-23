import React, { useContext, useState, useEffect } from "react";
import Header from "./components/header/Header";
import BottomMenu from "./components/BottomMenu/BottomMenu";
import { Outlet } from "react-router-dom";
import Cart from "./components/CartItems/Cart";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import TopMarque from "./components/TopMarque/TopMarque";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "./Store/auth";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [cartItem, setCartItem] = useState([]);
  // const {user} = useContext(AuthContext);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }
  
    // const getCartLength = async () => {
    //   if(user){
    //     const response = await fetch(`http://localhost:5000/api/cart/${user._id}`);
    //     const data = await response.json()
    //     setCartItem(data.cartItems)
    //   }
    // }
  
    // useEffect(()=>{
    //   getCartLength()
    // },[user])

  return (
    <div className="app">
        <TopMarque />
        <Header toggleCart={toggleCart} toggleMobileMenu={toggleMobileMenu} />
        <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu}/>
        <Cart isOpen={isCartOpen} onClose={toggleCart}/>
        {/* When the cart is open, disable page interactions */}
        {isCartOpen && <div className="overlay" onClick={toggleCart}></div>}
        {isMobileMenuOpen && <div className="overlay" onClick={toggleMobileMenu}></div>}
        <Outlet />
        <BottomMenu />
    </div>
  );
};

export default App;
