const express = require('express');
const bodyParser = require('body-parser');

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

const homeRoutes = require('../routes/homeRoutes');


app.use('/', homeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
