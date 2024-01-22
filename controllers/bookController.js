const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.query().withGraphFetched('[user, movieOnShow]');
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createBook = async (req, res) => {
    const { users_id, movie_on_shows_id, seat_no, book_date, payment_proof, fixed_price } = req.body;

    try {
        const newBook = await Book.query().insert({
        users_id,
        movie_on_shows_id,
        seat_no,
        book_date,
        payment_proof,
        fixed_price,
    });

    res.status(201).json({message:'Success!', book: newBook});
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const book = await Book.query().findById(id).withGraphFetched('[user, movieOnShow]');

        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await Book.query().deleteById(id);

        if (deletedRows > 0) {
            res.status(200).json({ message: 'Delete Success'});
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};