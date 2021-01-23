import 'reflect-metadata';
import { Router } from 'express';

import PlacesController from '../controllers/PlacesController';

const placesRouter = Router();

const placesController = new PlacesController();

placesRouter.get('/:id', placesController.show);
placesRouter.get('/', placesController.index);
placesRouter.post('/', placesController.create);
placesRouter.delete('/:id', placesController.destroy);
placesRouter.patch('/:id', placesController.update);

export default placesRouter;
