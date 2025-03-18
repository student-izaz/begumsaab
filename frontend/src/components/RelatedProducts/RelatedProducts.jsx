import React, { useState, useEffect, useContext } from "react";
import SingleItem from "../SingleItem/SingleItem";
import './RelatedProducts.css';
import { AuthContext } from '../../Store/auth';

const RelatedProducts = ({ product }) => {
  const {API_URL} = useContext(AuthContext)
    
  const [relatedProducts, setRelatedProducts] = useState(null);
  const byCategory = product.category;
  const id = product._id;

  const findRelatedProducts = async () => {
    const response = await fetch(
      `${API_URL}/api/products/related-products/${byCategory}/${id}`
    );
    const data = await response.json();
    if (response.ok) {
      setRelatedProducts(data);
    }
  };

  useEffect(() => {
    findRelatedProducts();
  }, []);

  return (
    <div className="related-products">
      <h2>Related products</h2>
      {relatedProducts ? <SingleItem products={relatedProducts} /> : 'Loading...'}
    </div>
  );
};

export default RelatedProducts;
