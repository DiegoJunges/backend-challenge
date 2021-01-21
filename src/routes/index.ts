import { Router } from 'express';
import placesRouter from './places.routes';

const routes = Router();

routes.use('/places', placesRouter);

export default routes;
