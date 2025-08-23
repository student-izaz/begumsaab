import { useState } from "react";
import "./Add.css";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    image: null,
    name: "",
    category: "",
    description: "",
    price: "",
    tags: "",
  });

  const [preview, setPreview] = useState(null); // 🔹 State for image preview

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setPreview(URL.createObjectURL(file)); // 🔹 Generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        body: formData,
      });

      if (response.ok) {
        toast.success("Product added successfully");
        setProductData({
          image: null,
          name: "",
          category: "",
          description: "",
          price: "",
          tags: "",
        });
        setPreview(null); // 🔹 Clear the preview after upload
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message || "Failed to add product");
    }
  };

  return (
    <div className="add-product-container flex flex-col rg-20 align-center justify-center py-20">
      <h1 className="text-primary">ADD PRODUCT</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-field flex flex-col rg-10">
          <label>Select Image</label>
          <input type="file" name="image" id="select_file" onChange={handleFileChange} />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" width="200px" height="auto" />
            </div>
          )}
        </div>
        <div className="product-name flex-col">
          <label>Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} />
        </div>
        <div className="product-category flex-col rg-10">
          <label>Product Category</label>
          <input type="text" name="category" value={productData.category} onChange={handleChange} />
        </div>
        <div className="product-description flex-col rg-10">
          <label>Product Description</label>
          <input type="text" name="description" value={productData.description} onChange={handleChange} />
        </div>
        <div className="product-price flex-col rg-10">
          <label>Product Price</label>
          <input type="text" name="price" value={productData.price} onChange={handleChange} />
        </div>
        <div className="input-field flex flex-col rg-10">
          <label>Product Tags</label>
          <input type="text" name="tags" value={productData.tags} onChange={handleChange} />
        </div>
        <div className="input-field w-full">
          <input type="submit" value="ADD PRODUCT" />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
