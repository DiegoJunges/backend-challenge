import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';
import Place from '../models/Place';

import PlacesRepository from '../repositories/PlacesRepository';

interface IRequest {
  country: string;
  location: string;
  goal: string;
  flag: string;
}

class CreatePlaceService {
  public async execute({
    country,
    location,
    goal,
    flag,
  }: IRequest): Promise<Place> {
    const placesRepository = getCustomRepository(PlacesRepository);

    const locationAlreadyUsed = location;

    const findUsedLocation = await placesRepository.findLocationAlreadyUsed(
      locationAlreadyUsed,
    );

    if (findUsedLocation) {
      throw Error('Location already used');
    }

    const place = placesRepository.create({
      country,
      location,
      goal,
      flag,
    });

    await placesRepository.save(place);

    return place;
  }
}

export default CreatePlaceService;
