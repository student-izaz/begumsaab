import React, { useEffect, useState } from "react";
import './List.css'
// import { useAuth } from "../../Store/auth";

const AllProducts = () => {
  //   const { authorizationToken } = useAuth();
  const [allProducts, setAllProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    const response = await fetch(
      "http://localhost:5000/api/admin/all-products"
      //   {
      //     headers: {
      //       Authorization: authorizationToken,
      //     },
      //   }
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      setLoading(true);
      setAllProducts(data);
      setLoading(false);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="all-product-container">
      <h1 className="text-primary">ALL PRODUCTS</h1>
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {loading
        ? "loading"
        : allProducts.map((item, index) => {
            return (
            <div key={index} className="list-table-format">
              <img src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>X</p>
            </div>
            )
          })}
        
    </div>
  );
};

export default AllProducts;
