export const fetchCategories = async (API_URL) => {
  const response = await fetch(`${API_URL}/api/categories`);
  const data = await response.json();
  return data;
};

export const fetchProductsByCategory = async (category, API_URL) => {
  const response = await fetch(`${API_URL}/api/products/category/${category}`);
  const data = await response.json();
  return data;
};
