import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import ShowProductByCategoryPage from './pages/ShowProductsByCategoryPage/ShowProductsByCategory.jsx';
import Home from './pages/Home/Home.jsx'
import LoginRegister from './components/CreateAccount.jsx/LoginRegister.jsx';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage.jsx';
import OriginalPakistanWearPage from './pages/OriginalPakistanWearPage/OriginalPakistanWearPage.jsx';
import { AuthProvider } from './Store/auth.jsx';
import Logout from './components/Logout/Logout.jsx';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.jsx';
import { ToastContainer } from 'react-toastify';
import Welcome from './pages/Welcome/Welcome.jsx';


const router = createBrowserRouter([
  
    {
    path: "/",
    element: <Welcome />,   // <- yaha direct welcome hai, isme header nahi hoga
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/category/:category",
        element: <ShowProductByCategoryPage />,
      },
      {
        path: "/my-account",
        element: <LoginRegister/>
      },
      {
        path: "/logout",
        element: <Logout/>,
      },
      {
        path: "/checkout",
        element: <CheckoutPage/>,
      },
      {
        path: "/product/:productId",
        element: <SingleProductPage/>
      },
      {
        path: "/product-category/original_pakistan_wear",
        element: <OriginalPakistanWearPage/>
      },
      {
        path: "*",
        element: <Error/>,
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer/>
  </StrictMode>,
  </AuthProvider>  
)
