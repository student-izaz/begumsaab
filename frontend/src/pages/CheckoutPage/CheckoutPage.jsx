import { useEffect, useState } from "react";
import "./CheckoutPage.css";
import { useAuth } from "../../Store/auth";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state  
  const {user} = useAuth();

  const [checkoutInfo, setCheckoutInfo] = useState({
    first_name: "",
    last_name: "",
    country: "",
    address: "",
    city: "",
    state: "",
    pin_code: "",
    phone: "",
    email: "",
    payment_mode: "",
  });

  const handleChange = (e) => {
    setCheckoutInfo({
      ...checkoutInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
      if (user) {
        const fetchCartItems = async () => {
          try {
            const userId = user._id; 
            const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
            const data = await response.json();
          
            if (response.ok) {
              setCartItems(data.cartItems);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error("Failed to fetch cart items", error);
          } finally {
            setLoading(false); // Set loading to false when fetch is complete
          }
        };
  
        fetchCartItems();
      }
    }, [user]);

    const amountDetail = () => {
      let total = 0;
      cartItems.map((item) => {
        total+=item.productId.price 
      })
      return total;
    }
    useEffect(()=>{
      amountDetail();
    })

  return (
    <div className="checkout-container">
      <form className="checkout-form flex cg-30" onSubmit={handleSubmit}>
        <div className="personal_order_info flex flex-col rg-20">
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              name="first_name"
              value={checkoutInfo.first_name}
              className="input-text"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              className="input-text"
              name="last_name"
              value={checkoutInfo.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="country-name">Country/Region</label>
            <input
              type="text"
              name="country"
              value={checkoutInfo.country}
              className="input-text"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="address">Street address</label>
            <input
              type="text"
              className="input-text"
              placeholder="House number and street name"
              onChange={handleChange}
              name="address"
              value={checkoutInfo.address}
              required
            />
            <input
              type="text"
              className="input-text"
              placeholder="Apartment,suit,unit,etc. (optional)"
              onChange={handleChange}
              // name="address"
              // value={checkoutInfo.address}
            />
          </div>
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="city">Town / City</label>
            <input
              type="text"
              className="input-text"
              name="city"
              value={checkoutInfo.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="state">State</label>
            <input
              type="text"
              className="input-text"
              name="state"
              value={checkoutInfo.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="pinCode">PIN Code</label>
            <input
              type="text"
              className="input-text"
              name="pin_code"
              value={checkoutInfo.pin_code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              className="input-text"
              name="phone"
              value={checkoutInfo.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row flex flex-col rg-10">
            <label htmlFor="email" name="city" value={checkoutInfo.city}>
              Email
            </label>
            <input
              type="email"
              className="input-text"
              onChange={handleChange}
              name="email"
              value={checkoutInfo.email}
              required
            />
          </div>
        </div>

        <div
          className="checkout-review-order flex rg-40 flex-col"
          id="order-review"
        >
          <div className="order-review-table">
            <div className="order-review-row heading flex align-center space-btw">
              <p>PRODUCT</p>
              <p>SUBTOTAL</p>
            </div>
            {
              cartItems.map((item)=>(
                <div key={item._id} className="order-review-row row-2 flex align-center space-btw">
              <p className="product-name">{item.productId.name}</p>
              <p className="price">{item.productId.price}</p>
            </div>
              ))
            }
            <div className="order-review-row flex align-center space-btw">
              <p className="text">Subtotal</p>
              <p className="subtotal">{amountDetail()}</p>
            </div>
            <div className="order-review-row">
              <p className="text">Shipping</p>
              <p>Free shipping</p>
            </div>
            <div className="order-review-row total-amt flex align-center space-btw">
              <p className="text">Total</p>
              <p className="total">{amountDetail()}</p>
            </div>
          </div>
          <div className="checkout-payment flex flex-col rg-20">
            <ul className="flex flex-col rg-10">
              <li className="flex col-gap-10">
                <input
                  type="radio"
                  name="payment_mode"
                  id="cash_on_delivery"
                  onChange={handleChange}
                  value="cash_on_delivery"
                  required
                />
                <label htmlFor="">Cash on delivery</label>
              </li>
              <li className="flex col-gap-10">
                <input
                  type="radio"
                  name="payment_mode"
                  id="CCAvenue"
                  onChange={handleChange}
                  value="CCAvenue"
                  required
                />
                <label htmlFor="">CCAvenue CCAvenue</label>
              </li>
              <li className="flex col-gap-10">
                <input
                  type="radio"
                  name="payment_mode"
                  id="credit_card"
                  onChange={handleChange}
                  value="credit"
                  required
                />
                <label htmlFor="">Credit Card/Debit Card/NetBanking</label>
              </li>
              <li className="rzp-img">
                <img
                  src="../../assets/rzp_payment_icon.svg"
                  alt="rzp-payment_icon"
                />
              </li>
            </ul>
            <div className="privacy-policy-text">
              <p>
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our
                <a href="#" className="privacy-policy-link">
                  privacy policy.
                </a>
              </p>
            </div>
            <label className="flex col-gap-10">
              <input type="checkbox" required/>
              <span className="term-and-condition-checkbox-text">
                I have read and agree to the website
                <a href="#" className="term-and-condition-link">
                  terms and conditions *
                </a>
              </span>
            </label>
            <button type="submit" className="proceed-to-pay-btn">
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
