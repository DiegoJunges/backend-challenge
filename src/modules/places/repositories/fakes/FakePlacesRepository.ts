import { v4 as uuid } from 'uuid';
import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';

import Place from '@modules/places/infra/typeorm/entities/Place';
import ICreatePlaceDTO from '@modules/places/dtos/ICreatePlaceDTO';

class FakePlacesRepository implements IPlaceRepository {
  private places: Place[] = [];

  public async findLocationAlreadyUsed(
    location: string,
  ): Promise<Place | undefined> {
    const findPlaceAlreadyUsed = this.places.find(
      place => place.location === location,
    );

    return findPlaceAlreadyUsed;
  }

  public async find(): Promise<Place[]> {
    return this.places;
  }

  public async findPlaceById(id: string): Promise<Place | undefined> {
    const findPlace = this.places.find(place => place.id === id);

    return findPlace;
  }

  public async create({
    country,
    location,
    goal,
    flag_url,
  }: ICreatePlaceDTO): Promise<Place> {
    const place = new Place();

    Object.assign(place, { id: uuid(), country, location, goal, flag_url });

    this.places.push(place);

    return place;
  }

  public async updatePlace(
    id: string,
    location: string,
    goal: Date,
  ): Promise<Place> {
    const place = new Place();

    Object.assign(place, { id: uuid(), location, goal });

    place.location = location;

    place.goal = goal;

    this.places.push(place);

    return place;
  }

  public async save(place: Place): Promise<Place> {
    const placeIndex = this.places.findIndex(
      findPlace => findPlace.id === place.id,
    );

    this.places[placeIndex] = place;

    return place;
  }

  public async delete(id: string): Promise<void> {
    const placeIndex = this.places.findIndex(place => place.id === id);
    delete this.places[placeIndex];
  }
}
export default FakePlacesRepository;
