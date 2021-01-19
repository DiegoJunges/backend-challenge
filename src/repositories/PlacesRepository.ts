import Place from '../models/Place';

interface ICreatePlaceDTO {
  country: string;
  location: string;
  goal: number;
  flag: string;
}

class PlacesRepository {
  private places: Place[];

  constructor() {
    this.places = [];
  }

  public all(): Place[] {
    // const listSortedPlaces = this.places.sort((a, b) => a.goal - b.goal);

    // return listSortedPlaces || null;

    return this.places;
  }

  public findLocationAlreadyUsed(location: string): Place | null {
    const findLocationAlreadyUsed = this.places.find(
      place => place.location === location,
    );

    return findLocationAlreadyUsed || null;
  }

  public create({ country, location, goal, flag }: ICreatePlaceDTO): Place {
    const place = new Place({ country, location, goal, flag });

    this.places.push(place);

    return place;
  }
}

export default PlacesRepository;
