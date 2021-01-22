import 'reflect-metadata';
import { Router } from 'express';

import { parseISO } from 'date-fns';
import CreatePlaceService from '@modules/places/services/CreatePlaceService';
import ListSortedPlacesService from '@modules/places/services/ListSortedPlacesService';
import UpdatePlaceService from '@modules/places/services/UpdatePlaceService';
import DeletePlaceService from '@modules/places/services/DeletePlaceService';

const placesRouter = Router();

placesRouter.get('/', async (request, response) => {
  const listPlaces = new ListSortedPlacesService();

  const places = await listPlaces.execute();

  return response.json(places);
});

placesRouter.post('/', async (request, response) => {
  const { country, location, goal, flag_url } = request.body;

  const parsedtoDateGoal = parseISO(goal);

  const createPlace = new CreatePlaceService();

  const place = await createPlace.execute({
    country,
    location,
    goal: parsedtoDateGoal,
    flag_url,
  });

  return response.json(place);
});

placesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteProduct = new DeletePlaceService();

  await deleteProduct.execute({ id });

  return response.status(204).send();
});

placesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { location, goal } = request.body;
  const updateProduct = new UpdatePlaceService();
  const newProduct = await updateProduct.execute({
    id,
    location,
    goal,
  });
  return response.json(newProduct);
});

export default placesRouter;
