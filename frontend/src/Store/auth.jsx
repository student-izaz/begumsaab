import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const authorizationToken = token;

  const checkTokenValidity = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        // token expired
        localStorage.removeItem("token");
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      return false;
    }
  };

  const isLoggedIn = checkTokenValidity();

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://begumsaab.onrender.com";

  // -------------------
  // Auth Functions
  // -------------------
  const logoutUser = () => {
    setToken("");
    // setIsLoggedIn(false);
    localStorage.removeItem("token");
    setUser("");
    setCartItems([]);
  };

  const StoreTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
    // setIsLoggedIn(true);
  };

  const userAuthentication = async () => {
    setUserLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setUser(data);

        //s directly cart bhi le aao yahin pe
        if (data._id) {
          await fetchCart(data._id);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setUserLoading(false);
    }
  };

  // Cart Functions

  const fetchCart = async (userId = user?._id) => {
    if (!authorizationToken || !userId) return;
    try {
      const res = await fetch(`${API_URL}/api/cart/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.cartItems || []);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  const addToCartItem = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.cartItems || []);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.cartItems);
      }
    } catch (error) {
      console.error("Remove cart error:", error);
    }
  };

  const updateQuantity = async (item, action) => {
    const itemId = item.productId._id;

    const res = await fetch(
      `${API_URL}/api/cart/updateItemQuantity/${itemId}/${action}`,
      {
        method: "PATCH",
        headers: {
          Authorization: authorizationToken,
        },
      },
    );

    const data = await res.json();
    setCartItems(data.cartItems);
  };

  useEffect(() => {
    if (isLoggedIn && authorizationToken) {
      // ✅ Only run once when user logs in
      userAuthentication();
    }
  }, [isLoggedIn, authorizationToken]); // ✅ remove 'user' from deps

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        StoreTokenInLS,
        logoutUser,
        authorizationToken,
        userAuthentication,
        userLoading,
        API_URL,
        fetchCart,
        addToCartItem,
        removeFromCart,
        updateQuantity,
        cartItems,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider.");
  }
  return authContextValue;
};
