import { Router } from 'express';
import placesRouter from '@modules/places/infra/http/routes/places.routes';

const routes = Router();

routes.use('/places', placesRouter);

export default routes;
