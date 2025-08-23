import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // ✅ FIX
  const [userLoading, setUserLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const authorizationToken = token;

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://your-app-name.onrender.com";

  // -------------------
  // Auth Functions
  // -------------------
  const logoutUser = () => {
    setToken("");
    setIsLoggedIn(false); // ✅ FIX
    localStorage.removeItem("token");
    setUser("");
    setCartItems([]);
  };

  const StoreTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
    setIsLoggedIn(true); // ✅ FIX
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

      // ✅ directly cart bhi le aao yahin pe
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


  // -------------------
  // Cart Functions
  // -------------------
  const fetchCart = async (userId = user?._id) => {
  if (!authorizationToken || !userId) return;  
  try {
    const res = await fetch(`${API_URL}/api/cart/${userId}`, {
      headers: { Authorization: authorizationToken },
    });
    if (res.ok) {
      const data = await res.json();
      setCartItems(data.cartItems || []);
    }
  } catch (error) {
    console.error("Cart fetch error:", error);
  }
};


  const addToCartItem = async (userId, productId) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ userId, productId }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data)
        setCartItems(data.cartItems || []);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/api/cart/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: authorizationToken },
      });
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.cart);
      }
    } catch (error) {
      console.error("Remove cart error:", error);
    }
  };

 
 useEffect(() => {
  if (isLoggedIn && authorizationToken) {
    // ✅ Only run once when user logs in
    userAuthentication();
  }
}, [isLoggedIn, authorizationToken]);  // ✅ remove 'user' from deps




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
        cartItems,
        addToCartItem,
        removeFromCart,
        fetchCart,
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
