const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply middleware to check user role
router.use(authMiddleware.checkUserRole);

// Routes for books
router.get('/allBooks', bookController.getAllBooks);
router.post('/createBook', bookController.createBook);
router.get('/getBook/:id', bookController.getBookById);
router.delete('/deleteBook/:id', bookController.deleteBook);

module.exports = router;