import React, { useState, useEffect } from "react";
import SingleItem from "../SingleItem/SingleItem";
import './RelatedProducts.css';

const RelatedProducts = ({ product }) => {
  // console.log(product)
    
  const [relatedProducts, setRelatedProducts] = useState(null);
  const byCategory = product.category;
  const id = product._id;

  const findRelatedProducts = async () => {
    const response = await fetch(
      `http://localhost:5000/api/products/related-products/${byCategory}/${id}`
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
