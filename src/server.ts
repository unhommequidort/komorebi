import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import connectToDatabase from './db';
import productRoutes from './routes/product';

const app = express();
app.use(express.json());

connectToDatabase();

app.get('/ping', (request: Request, response: Response) => {
  response.send('pong');
});

app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}`);
});
