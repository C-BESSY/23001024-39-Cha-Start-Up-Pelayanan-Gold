const express = require('express');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const path = require('path');
var cors = require('cors')


const fetch = import('node-fetch').then(module => module.default);

const { Pool } = require('pg');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

require('dotenv').config();

const app = express();
app.use(cors())

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

global.pool = pool;

const knexInstance = Knex(knexConfig.development);

Model.knex(knexInstance);

const homeRoutes = require('../routes/moviesRoutes');
const adminRoutes = require('../routes/adminRoutes');
const cinemaRoutes = require('../routes/cinemaRoutes')(knexInstance);
const auditoriumRoutes = require('../routes/auditoriumRoutes');
const movieOnShowRoutes = require('../routes/movieOnShowRoutes');
const userRoutes = require('../routes/userRoutes');
const bookRoutes = require('../routes/bookRoutes');

app.use('/api', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cinemas', cinemaRoutes);
app.use('/api/auditoriums', auditoriumRoutes);
app.use('/api/movie_on_shows', movieOnShowRoutes);
app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes);

// Uploead gambar
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload-image', upload.none(), async (req, res) => {
  try {
    const imageSource = req.body.imageSource;

    const imageData = await getImageData(imageSource);

    // SImpan ke dalam "movies" table
    const insertQuery = 'INSERT INTO movies (image_data) VALUES ($1) RETURNING *';
    const result = await pool.query(insertQuery, [imageData]);

    res.json({ success: true, message: 'Image uploaded successfully.', movie: result.rows[0] });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Error uploading image.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function getImageData(source) {
  if (source.startsWith('http')) {
    const response = await axios.get(source, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  } else {
    return fs.readFileSync(source);
  }
}
