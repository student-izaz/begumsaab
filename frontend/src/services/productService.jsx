export const fetchProductDetails = async (productId,API_URL) => {
  const response = await fetch(
    `${API_URL}/api/products/${productId}`
  );
  return response.json();
};

export const fetchOriginalPakistanWear = async (API_URL) => {
  const response = await fetch(
    `${API_URL}/api/product-category/original-pakistani-suits`
  );
  return response.json();
};

