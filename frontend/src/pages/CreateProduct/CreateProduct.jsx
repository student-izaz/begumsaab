import React, { useContext, useState } from 'react';
import './CreateProduct.css'
import { AuthContext } from '../../Store/auth';

const ProductForm = () => {
  const {API_URL} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    tags: '',
  });

  const [message, setMessage] = useState('');

  // Handle change in text input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const data = await response.json();
      setMessage('Product created successfully!');
      // console.log('Created product:', data);

      // Reset form
      setFormData({ name: '', category: '', description: '', price: '' });
    } catch (error) {
      console.error(error);
      setMessage('Error creating product');
    }
  };

  return (
    <div className='create-product-container'>
      <h2>Create New Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          {/* <label>Image:</label> */}
          {/* <input type="file" name='image' onChange={handleImageChange} accept="image/*" /> */}
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
