export const fetchCategories = async () => {
  const response = await fetch("http://localhost:5000/api/categories");
  const data = await response.json();
  return data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(
    `http://localhost:5000/api/products/category/${category}`
  );
  const data = await response.json();
  return data;
};
