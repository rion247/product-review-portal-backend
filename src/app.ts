import cors from 'cors';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';

import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send({ Message: 'Product Review Portal' });
});

app.use('/api/v1', router);
app.use(globalErrorHandler);
app.use(notFound);

export default app;
