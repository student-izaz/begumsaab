import './CategoryList.css'

import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    console.log(categories)
    getCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <>
    <div className="category-list">
      {categories.map((cat) => (
        <div key={cat._id} className="category-item" onClick={() => handleCategoryClick(cat.name)}>
          <img src={`../../assets/${cat.image}`} alt={cat.name} />
        </div>
      ))}
    </div>
    </>
    
  );
};

export default CategoryList;

