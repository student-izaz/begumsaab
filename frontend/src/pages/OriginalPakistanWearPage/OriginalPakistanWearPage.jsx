import { useState, useEffect, useContext } from "react";
import { fetchOriginalPakistanWear } from "../../services/productService";
import ProductList from "../../components/ProductList/ProductList";

const OriginalPakistanWearPage = () => {
  const [products, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchOriginalPakistanWear(API_URL);
      setProduct(data);
    };
    getProduct();
  }, []);           

  return (
    <div>
      {products ? <ProductList products={products} /> : "Loading..."}
    </div>
  );
};

export default OriginalPakistanWearPage;
