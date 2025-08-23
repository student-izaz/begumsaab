import React from 'react';
import {useState} from 'react';

const AddCategory = () => {
    const [category, setCategory] = useState({
      image: null,
      categ_name: "",
    });
  
    const handleChange = (e) => {
      e.preventDefault();
      setCategory({
        ...category,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleFileChange = (e) => {
      console.log(e.target.files[0])
      const file = e.target.files[0];
      setCategory((prevData) => ({
        ...prevData,
        image: file,
      }));
      // Logging the file name after the update
      // console.log(file ? file.name : "No image selected");
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Form validation before submitting
      if (!category.categ_name || !category.image) {
        toast.info("Please fill in all fields, including the image.");
        return;
      }
  
      const formData = new FormData();
      formData.append("image", category.image);
      formData.append("categ_name", category.categ_name);
  
      try {
        const response = await fetch("http://localhost:5000/api/category/add", {
          method: "POST",
          body: formData, // Use formData instead of JSON
        });
  
        if (response.ok) {
          toast.success("Product added successfully");
          // You could reset the form here if needed
          setCategory({
            image: null,
            categ_name: "",
          });
        } else {
          toast.error("Failed to add product");
        }
      } catch (error) {
        // console.error("Error adding product:", error);
      }
    }
  return (
    <div className="add-product-container flex flex-col rg-20 align-center justify-center py-20">
      <h1 className="text-primary">ADD CATEGORY</h1>
      <form>
        <div className="input-field flex flex-col rg-10">
          <label>Select Image</label>
          <input type="file" name="image" id="select_file"/>
        </div>
        <div className="input-field flex flex-col rg-10">
          <label>Category Name</label>
          <input
            type="text"
            name="categ_name"
          />
        </div>
      </form>
    </div>
  )
}

export default AddCategory
