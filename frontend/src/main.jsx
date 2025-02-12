import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx'
import ShowProductByCategoryPage from './pages/ShowProductsByCategoryPage/ShowProductsByCategory.jsx';
import Home from './pages/Home/Home.jsx'
import LoginRegister from './components/CreateAccount.jsx/LoginRegister.jsx';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage.jsx';
import OriginalPakistanWearPage from './pages/OriginalPakistanWearPage/OriginalPakistanWearPage.jsx';
import { AuthProvider } from './Store/auth.jsx';
import Logout from './components/Logout/Logout.jsx';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage.jsx';
import { ToastContainer } from 'react-toastify';
import AdminLayout from './Admin/AdminLayout/AdminLayout.jsx';
import AdminLogin from './Admin/AdminLogin/AdminLogin.jsx';
import AdminDashboard from './Admin/AdminDashboard/AdminDashboard.jsx';
import AddProduct from './Admin/AddProduct/AddProduct.jsx';
import AllProducts from './Admin/AllProducts/AllProducts.jsx';
import AddCategory from './Admin/AddCategory/AddCategory.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
  {
    path: "/admin/login",
    element: <AdminLogin/>
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    children: [
      {
        path: "/admin",
        element: <AdminDashboard/>
      },
      {
        path: "add-product",
        element: <AddProduct/>
      },
      {
        path: "all-products",
        element: <AllProducts/>
      },
      {
        path: "add-category",
        element: <AddCategory/>
      },
      {
        path: "*",
        element: <Error/>,
      },
      
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer/>
  </StrictMode>,
  </AuthProvider>  
)
