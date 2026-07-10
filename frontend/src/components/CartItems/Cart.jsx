import React, { useEffect, useState } from "react";
import "./Cart.css";
import CartMessage from "../CartMessage/CartMessage";
import { AuthContext, useAuth } from "../../Store/auth";
import { useContext } from "react";


const Cart = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true); // Added loading state
  const { user } = useAuth();

  const { cartItems, fetchCart, API_URL, removeFromCart } = useContext(AuthContext);

  useEffect(() => {
    fetchCart();
  }, []);

  // Disable page scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const findSubTotal = () => {
    let subTotal = 0;
    cartItems.map((item) => {
      subTotal += item.productId.price * item.quantity;
    });
    return subTotal;
  };

  useEffect(() => {
    findSubTotal();
  }, []);

  const updateQuantity = async (item, action) => {
    const userId = user._id;
    const itemId = item.productId._id;
    await fetch(
      `${API_URL}/api/cart/updateItemQuantity/${itemId}/${userId}/${action}`
    );
  };
  
  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={onClose}>
        x
      </button>
      <h6>
        SHOPPING CART <span className="noOfCartItem">{cartItems.length}</span>
      </h6>

      {cartItems.length === 0 ? (
        <CartMessage />
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.productId._id}>
              <img src={item.productId.image} alt="image" />
              <div className="cart-item-content">
                <p className="item-title">{item.productId.name}</p>
                <div className="handle-item-price">
                  <div className="update-quantity">
                    <span onClick={() => updateQuantity(item, "decrease")}>
                      -
                    </span>
                    <p>{item.quantity}</p>
                    <span onClick={() => updateQuantity(item, "increase")}>
                      +
                    </span>
                  </div>
                  <div className="item-price">
                    <p className="item-price">
                      ₹ {item.productId.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                style={{
                  border: "0",
                  outline: "none",
                  padding: "0",
                  cursor: "pointer",
                  position: "absolute",
                  right: "0px",
                  fontFamily: "Roboto",
                  background: "#fff",
                }}
              >
                x
              </button>
            </div>
          ))}

          <div className="cart-footer">
            <div className="cart-footer-content">
              <div className="cart-subtotal">
                <p>SUBTOTAL</p>
                <p>{`₹ ${findSubTotal()}`}</p>
              </div>
              <p className="checkout-btn">
                <a href="/checkout">CHECKOUT</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
