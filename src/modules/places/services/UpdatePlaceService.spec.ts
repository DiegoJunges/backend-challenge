import AppError from '@shared/errors/AppError';
import { startOfHour } from 'date-fns';
import FakePlacesRepository from '../repositories/fakes/FakePlacesRepository';
import UpdatePlaceService from './UpdatePlaceService';

let fakePlacesRepository: FakePlacesRepository;
let updatePlace: UpdatePlaceService;

describe('UpdatePlaceService', () => {
  beforeEach(() => {
    fakePlacesRepository = new FakePlacesRepository();
    updatePlace = new UpdatePlaceService(fakePlacesRepository);
  });

  it('should be able to update a new place', async () => {
    const place = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: startOfHour(new Date(2022, 4, 3, 25)),
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    const updatedPlace = await updatePlace.execute({
      id: place.id,
      location: 'Chapada Diamantina',
      goal: startOfHour(new Date(2023, 4, 3, 25)),
    });

    expect(updatedPlace.location).toBe('Chapada Diamantina');
    expect(updatedPlace.goal).toEqual(new Date(2023, 4, 3, 25));
  });

  it('should not be able to place a place that not exist', async () => {
    expect(
      updatePlace.execute({
        id: 'non-existing-place-id',
        location: 'non-existing-place-location',
        goal: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
