import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';

import Place from '../models/Place';
import PlacesRepository from '../repositories/PlacesRepository';

class ListSortedPlacesService {
  // private placesRepository: PlacesRepository;

  // constructor(placesRepository: PlacesRepository) {
  //   this.placesRepository = placesRepository;
  // }

  public async execute(): Promise<Place[]> {
    const placesRepository = getCustomRepository(PlacesRepository);

    const places = await placesRepository.find();
    if (places.length <= 0) {
      throw Error('No places are found');
    }

    // const sortPlacesByGoal = places.sort(
    //   (a, b) => Number(a.goal) - Number(b.goal),
    // );

    const sortPlacesByGoal = places.sort((a, b) => {
      if (a.goal === b.goal) {
        return 0;
      }

      return a.goal > b.goal ? 1 : -1;
    });

    return sortPlacesByGoal;
  }
}

export default ListSortedPlacesService;
