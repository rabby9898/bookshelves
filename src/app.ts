import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BookRoutes } from './modules/products/product.route';
import { OrderRoutes } from './modules/orders/order.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// routes
app.use("/api/products", BookRoutes)
app.use("/api/orders", OrderRoutes)



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
