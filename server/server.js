const express = require('express');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');

const fetch = import('node-fetch').then(module => module.default);

const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

global.pool = pool;

const knexInstance = Knex(knexConfig.development);

Model.knex(knexInstance);

const homeRoutes = require('../routes/homeRoutes');
const userRoutes = require('../routes/userRoutes');
const adminRoutes = require('../routes/adminRoutes');
const cinemaRoutes = require('../routes/cinemaRoutes')(knexInstance);
const auditoriumRoutes = require('../routes/auditoriumRoutes');

app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/cinemas', cinemaRoutes);
app.use('/auditoriums', auditoriumRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
