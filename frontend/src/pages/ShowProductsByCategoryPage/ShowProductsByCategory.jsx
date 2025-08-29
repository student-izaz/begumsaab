// src/pages/CategoryPage.js
import React, { useEffect, useState } from 'react';
import { fetchProductsByCategory } from '../../api/api';
import ProductList from '../../components/ProductList/ProductList';
import { useParams } from 'react-router-dom';
import ShowMessage from '../../components/ShowMessage/ShowMessage';
import { AuthContext } from '../../Store/auth';


const ShowProductByCategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const {API_URL} = useContext(AuthContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProductsByCategory(API_URL, category);
        setProducts(data || []); // Ensure data is set as an array
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set to empty array on error
      }
    };
    getProducts();
  }, [category]);

  return (
    <div>
      {products.length >= 0 ? <ProductList products={products} /> : <ShowMessage message={"Sorry, No Product In This Category..."}/>}
    </div>
  );
};

export default ShowProductByCategoryPage;
