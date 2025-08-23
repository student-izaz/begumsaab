const express = require('express');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const authenticate = require('../middlewares/authMiddleware'); // Optional if routes need authentication

const router = express.Router();

// Create a new category
router.post('/add', createCategory);

// Get all categories
router.get('/', getAllCategories);

// Get a category by ID
router.get('/:id', getCategoryById);

// Update a category by ID
router.put('/:id', authenticate, updateCategory);

// Delete a category by ID
router.delete('/:id', authenticate, deleteCategory);

module.exports = router;
