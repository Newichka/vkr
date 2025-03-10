import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Client } = pkg;


const app = express();
const port = 5000;

app.use(cors());

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bdauto',
  password: '123',  // Замените на свой пароль
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

app.get('/api/cars', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM cars');
    res.json(result.rows);
  } catch (error) {
    console.error('Error getting data', error);
    res.status(500).json({ error: 'Error getting data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
