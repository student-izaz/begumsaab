// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import Cart from '../../components/CartItems/Cart';
import CartMessage from '../../components/CartMessage/CartMessage';

const CartPage = ({ userId }) => {
  const [cart, setCart] = useState(null);

    const userId = '672f1920d55a3749fc7b3ec2';
  const fetchCart = async () => {
    const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
    const data = await response.json();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      {cart ? <Cart cart={cart} userId={userId} refreshCart={fetchCart} /> : 'Loading...'}
      <CartMessage />
    </div>
  );
};

export default CartPage;
