// src/pages/ProductDetailPage.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../services/productService';
import SingleProduct from '../../components/SingleProduct/SingleProduct';
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts'
import { AuthContext } from '../../Store/auth';

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { API_URL } = useContext(AuthContext);
  
  // console.log(product.category)
  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductDetails(productId,API_URL);
      setProduct(data);
    };
    getProduct();
  }, [productId]);

  return (
    <div>
      {product ? <SingleProduct product={product} /> : 'Loading...'}
      
      {product ? <RelatedProducts product={product}/> : 'Loading...'}
    </div>
  );
};

export default SingleProductPage;
