import { Router } from 'express';

import PlacesRepository from '../repositories/PlacesRepository';
import CreatePlaceService from '../services/CreatePlaceService';

const placesRouter = Router();
const placesRepository = new PlacesRepository();

placesRouter.get('/', (request, response) => {
  const places = placesRepository.all();

  const sortPlacesByGoal = places.sort((a, b) => a.goal - b.goal);

  return response.json(sortPlacesByGoal);
});

placesRouter.post('/', (request, response) => {
  try {
    const { country, location, goal, flag } = request.body;

    const createPlace = new CreatePlaceService(placesRepository);

    const place = createPlace.execute({ country, location, goal, flag });

    return response.json(place);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default placesRouter;
