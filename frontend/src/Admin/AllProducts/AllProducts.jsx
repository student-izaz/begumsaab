import React, { useEffect, useState } from "react";
import { useAuth } from "../../Store/auth";

const AllProducts = () => {
  const { authorizationToken } = useAuth();
  const [allProducts, setAllProducts] = useState(null);
  const [loading, setLoading] = useState(true)

  const fetchAllProducts = async () => {
    const response = await fetch(
      "http://localhost:5000/api/admin/all-products",
      {
        headers: {
          Authorization: authorizationToken,
        },
      }
    );
    const data = await response.json();

    if (data) {
      setLoading(true)
      setAllProducts(data);
      setLoading(false)
      console.log(data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="add-product-container flex flex-col rg-20 align-center justify-center py-20">
      <h1 className="text-primary">ALL PRODUCTS</h1>
      <div style={{ width: "100%", padding: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Image
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Item Name
              </th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                Item Price
              </th>
              <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>Actions</th>

            </tr>
          </thead>
          <tbody>
            {loading ? "Loding" : allProducts.map((item, index) => (
            <tr>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover", }}
                />
              </td>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {item.name}
              </td>
              <td
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                ₹ {item.price.toFixed(2)}
              </td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                <button 
                  onClick={() => onEdit(item)} 
                  style={{ marginRight: '8px', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(item)} 
                  style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: 'red', color: 'white', border: 'none' }}
                >
                  Delete
                </button>
              </td>
            </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
