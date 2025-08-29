export const fetchCategories = async (API_URL) => {
  const response = await fetch(`${API_URL}/api/categories`);
  const data = await response.json();
  return data;
};

export const fetchProductsByCategory = async (API_URL, category) => {
  console.log("Fetching products for category: ", category);
  const response = await fetch(`${API_URL}/api/products/category/${category}`);
  const data = await response.json();
  return data;
};
