import Place from '../models/Place';
import PlacesRepository from '../repositories/PlacesRepository';

interface IRequest {
  country: string;
  location: string;
  goal: number;
  flag: string;
}

class CreatePlaceService {
  private placesRepository: PlacesRepository;

  constructor(placesRepository: PlacesRepository) {
    this.placesRepository = placesRepository;
  }

  public execute({ country, location, goal, flag }: IRequest): Place {
    const locationAlreadyUsed = location;

    const findUsedLocation = this.placesRepository.findLocationAlreadyUsed(
      locationAlreadyUsed,
    );

    if (findUsedLocation) {
      throw Error('Location already used');
    }

    const place = this.placesRepository.create({
      country,
      location,
      goal,
      flag,
    });

    return place;
  }
}

export default CreatePlaceService;
