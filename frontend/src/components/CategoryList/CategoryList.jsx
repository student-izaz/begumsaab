import './CategoryList.css';

import React, { useContext, useEffect, useState } from 'react';
import { fetchCategories } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Store/auth';
import Loading from '../Loading/Loading';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { API_URL } = useContext(AuthContext);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories(API_URL);
        let categoryList = [];

        // 🛡️ SAFETY CHECK
        if (Array.isArray(data)) {
          categoryList = data;
        } else if (Array.isArray(data?.data)) {
          categoryList = data.data;
        }

        setCategories(categoryList);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, [API_URL]);

  const handleSelectCategory = (category) => {
    navigate(`/category/${category}`);
  };

  // 🔄 Loading
  if (loading) return <Loading />;

  // ❌ Error
  if (error) return <p>{error}</p>;

  // 📭 Empty
  if (categories.length === 0) {
    return <p>No categories found</p>;
  }

  return (
    <div className="category-list">
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="category-item"
          onClick={() => handleSelectCategory(cat.name)}
        >
          <img
            src={`/assets/${cat.image}`}
            alt={cat.name}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
