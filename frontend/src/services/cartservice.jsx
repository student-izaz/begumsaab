//This file contains functions for interacting with the backend using the fetch API.

export const addToCart = async (userId, productId, API_URL) => {
  const response = await fetch(`${API_URL}/api/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
  return response.json();
};

export const removeFromCart = async (userId, productId) => {
  const response = await fetch("http://localhost:5000/api/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
  return response.json();
};


export const getCartItems = async (cartItemsIds) => {
  const response = await fetch(`http://localhost:5000/api/cart/${cartItemsIds}`);
  return response.json();
};
