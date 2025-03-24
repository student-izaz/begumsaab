import React, { useEffect, useState, useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";
import { addToCart } from "../../services/cartservice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Store/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../Store/auth";

const SingleItem = ({ products }) => {
  const [cartItemsIds, setcartItemsIds] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loadingState, setLoadingState] = useState(null); // Track loading per product
  const { API_URL } = useContext(AuthContext);

  const handleAddToCart = async (userId, productId, productName) => {
    try {
      setLoadingState(productId); // Set the loading state for the specific product
      const data = await addToCart(userId, productId, API_URL);
      setcartItemsIds(data.products);
      toast.success('Item Added');
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item. Please try again.");
    } finally {
      setLoadingState(null); // Reset the loading state
    }
  };

  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="single-item-container">
      <ul className="products">
        {products.map((item) => (
          <li className="product" key={item._id}>
            <div className="product-wrapper">
              <div
                className="product-wrapper-img"
                onClick={() => handleImageClick(item._id)}
              >
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-wrapper-content">
                <h2 className="product-title">{item.name}</h2>
                <span className="price">{`₹ ${item.price}`}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(user._id, item._id, item.name)}
                  disabled={loadingState === item._id} // Disable button if loading
                >
                  {loadingState === item._id ? (
                    <>
                      <AiOutlineLoading className="loading_icon icon" />
                      Add to cart
                    </>
                  ) : (
                    <>
                      <CiShoppingCart className="icon" />
                      Add to cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleItem;
