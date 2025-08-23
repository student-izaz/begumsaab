import './CartMessage.css'
import { CiShoppingCart } from "react-icons/ci";

const CartMessage = () => {
  return (
    <div className="cart-message">
      <CiShoppingCart className='icon'/>
      <p>No products in the cart.</p>
      <a href="/">Continue Shoppoing</a>
    </div>
  );
};

export default CartMessage;
