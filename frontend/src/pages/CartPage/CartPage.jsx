// src/pages/CartPage.js
import React, { useContext, useEffect, useState } from 'react';
import Cart from '../../components/CartItems/Cart';
import CartMessage from '../../components/CartMessage/CartMessage';
import { AuthContext } from '../../Store/auth';

const CartPage = ({ userId }) => {
  const [cart, setCart] = useState(null);
  const {API_URL} = useContext(AuthContext);

    // const userId = '672f1920d55a3749fc7b3ec2';
  const fetchCart = async () => {
    const response = await fetch(`${API_URL}/api/cart/${userId}`);
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
