export const addToCart = async (userId, productId, API_URL) => {
  const response = await fetch(`${API_URL}/api/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
  return response.json();
};

export const removeFromCart = async (userId, productId, API_URL) => {
  const response = await fetch(`${API_URL}/api/cart/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, productId }),
  });
  return response.json();
};


export const getCartItems = async (cartItemsIds, API_URL) => {
  const response = await fetch(`${API_URL}/api/cart/${cartItemsIds}`);
  return response.json();
};
