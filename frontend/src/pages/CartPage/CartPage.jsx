// src/pages/CartPage.js
import React, { useContext, useEffect, useState } from 'react';
import Cart from '../../components/CartItems/Cart';
import CartMessage from '../../components/CartMessage/CartMessage';

const CartPage = ({ userId }) => {

  return (
    <div>
      <Cart />
      <CartMessage />
    </div>
  );
};

export default CartPage;
