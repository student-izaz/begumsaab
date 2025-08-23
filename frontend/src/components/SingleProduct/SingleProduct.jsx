import React, { useContext } from "react";
import "./SingleProduct.css";
import { addToCart } from "../../services/cartservice";
import { AuthContext, useAuth } from "../../Store/auth";

const SingleProduct = ({ product }) => {
  const {user} = useAuth();
  const {API_URL} = useContext(AuthContext);
  const handleAddToCart = async (userId, productId, productName) => {
    const data = await addToCart(userId, productId, API_URL);
    alert(`Item add in cart : ${productName}`);
  };
  
  return (
  <>
    <div className="sub-header">
      <p>{`Home / ${product.name}`}</p>
    </div>
    <div className="site-single-product">
      <div className="single-product-img">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="single-product-details">
        <h1 className="product-title">{product.name}</h1>
        <h2 className="product-price">
          ₹<span className="org-price">6000</span>₹{product.price}
        </h2>
        <div>
          <h6>YOU SAVE ₹1,000.00 | 10% Discount</h6>
          <hr />
          <p>• 5% Cash Back on Every Order.</p>
          <p>• 10 Days Easy Returns. No Questions Asked.</p>
          <p>• 100% Original & Genuine Product Direct from Brand.</p>
          <hr />
        </div>
        <button
          className="add-to-cart-btn"
          onClick={() =>
            handleAddToCart(user._id, product._id, product.name)
          }
        >
          Add To Cart
        </button>
        <div className="category">{`Category : ${product.category}`}</div>
        <div className="trust-badge-box">
          <img src="../assets/Untitled-6.webp" alt="image" />
        </div>
      </div>
    </div>
  </>
  );
};

export default SingleProduct;
