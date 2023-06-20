import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectToDatabase from './db';

const app = express();

connectToDatabase();

app.get('/ping', (request, response) => {
  response.send('pong');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`);
});
