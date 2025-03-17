import './CategoryList.css'

import React, { useContext, useEffect, useState } from 'react';
import { fetchCategories } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Store/auth';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const {API_URL} = useContext(AuthContext);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories(API_URL);
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

