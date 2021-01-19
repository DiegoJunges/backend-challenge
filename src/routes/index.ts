import express, { Router } from 'express';
import placesRouter from './places.routes';

const app = express();
const routes = Router();
app.use(express.json());

routes.use('/places', placesRouter);

export default routes;
