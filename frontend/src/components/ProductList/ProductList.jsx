import "./ProductList.css";
import SingleItem from "../SingleItem/SingleItem";
import { CiFilter } from "react-icons/ci";

const ProductList = ({ products }) => {
  return (
    <div className="category-product-content">
      <div className="content-sorting">
        <div className="sorting-left">
          <span className="filter-product">
            <CiFilter className="icon"/>
            Filter
          </span>
          <p>{`Showing all ${products.length} Results`}</p>
        </div>
        <form method="get" className="sorting-right">
          <select name="orderBy" className="orderBy">
            <option value="menu_order">Default Sorting</option>
            <option value="popularity">Sort by popularity</option>
            <option value="rating">Sort by average rating</option>
            <option value="date">Sort by latest</option>
            <option value="price">Sort by price: low to high</option>
            <option value="price-desc">Sort by price: high to low</option>
          </select>
        </form>
      </div>
      {products ? <SingleItem products={products} /> : "Loading..."}
    </div>
  );
};

export default ProductList;
