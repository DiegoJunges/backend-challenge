import 'reflect-metadata';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import PlacesRepository from '../repositories/PlacesRepository';
import CreatePlaceService from '../services/CreatePlaceService';
import ListSortedPlacesService from '../services/ListSortedPlacesService';

const placesRouter = Router();

placesRouter.get('/', async (request, response) => {
  try {
    // const listPlace = await placesRepository.find();

    const listPlaces = new ListSortedPlacesService();

    const places = await listPlaces.execute();

    return response.json(places);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }

  // const places = placesRepository.all();

  // const sortPlacesByGoal = places.sort((a, b) => a.goal - b.goal);

  // return response.json(sortPlacesByGoal);
});

placesRouter.post('/', async (request, response) => {
  try {
    const { country, location, goal, flag } = request.body;

    const createPlace = new CreatePlaceService();

    const place = await createPlace.execute({
      country,
      location,
      goal,
      flag,
    });

    return response.json(place);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default placesRouter;
