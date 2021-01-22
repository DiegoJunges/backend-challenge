import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';
import PlacesRepository from '@modules/places/infra/typeorm/repositories/PlacesRepository';

import AppError from '@shared/errors/AppError';

import Place from '@modules/places/infra/typeorm/entities/Place';

interface IRequest {
  country: string;
  location: string;
  goal: Date;
  flag_url: string;
}

class CreatePlaceService {
  public async execute({
    country,
    location,
    goal,
    flag_url,
  }: IRequest): Promise<Place> {
    const placesRepository = getCustomRepository(PlacesRepository);

    const locationAlreadyUsed = location;

    const findUsedLocation = await placesRepository.findLocationAlreadyUsed(
      locationAlreadyUsed,
    );

    if (findUsedLocation) {
      throw new AppError('Location already used');
    }

    const place = placesRepository.create({
      country,
      location,
      goal,
      flag_url,
    });

    await placesRepository.save(place);

    return place;
  }
}

export default CreatePlaceService;
