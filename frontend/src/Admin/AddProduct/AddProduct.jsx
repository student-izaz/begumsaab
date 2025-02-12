import { useState } from "react";
import "./AddProduct.css";
import {toast} from 'react-toastify'

const AddProduct = () => {
  const [productData, setProductData] = useState({
    image: null,
    name: "",
    category: "",
    description: "",
    price: "",
    tags: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
    // Logging the file name after the update
    // console.log(file ? file.name : "No image selected");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation before submitting
    if (!productData.name || !productData.category || !productData.price || !productData.image) {
      toast.info("Please fill in all fields, including the image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", productData.image);
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("tags", productData.tags);

    try {
      const response = await fetch("http://localhost:5000/api/product/add", {
        method: "POST",
        body: formData, // Use formData instead of JSON
      });

      if (response.ok) {
        toast.success("Product added successfully");
        // You could reset the form here if needed
        setProductData({
          image: null,
          name: "",
          category: "",
          description: "",
          price: "",
          tags: "",
        });
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      // console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product-container flex flex-col rg-20 align-center justify-center py-20">
      <h1 className="text-primary">ADD PRODUCT</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-field flex flex-col rg-10">
          <label>Select Image</label>
          <input type="file" name="image" id="select_file" onChange={handleFileChange} />
        </div>
        <div className="input-field flex flex-col rg-10">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-field flex flex-col rg-10">
          <label>Product Category</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
          />
        </div>
        <div className="input-field flex flex-col rg-10">
          <label>Product Description</label>
          <input
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>
        <div className="input-field flex flex-col rg-10">
          <label>Product Price</label>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div className="input-field flex flex-col rg-10">
          <label>Product Tags</label>
          <input
            type="text"
            name="tags"
            value={productData.tags}
            onChange={handleChange}
          />
        </div>
        <div className="input-field w-full">
          <input type="submit" value="ADD PRODUCT" />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
