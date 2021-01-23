import AppError from '@shared/errors/AppError';
import FakePlacesRepository from '../repositories/fakes/FakePlacesRepository';
import CreatePlaceService from './CreatePlaceService';

let fakePlacesRepository: FakePlacesRepository;
let createPlace: CreatePlaceService;

describe('CreatePlaceService', () => {
  beforeEach(() => {
    fakePlacesRepository = new FakePlacesRepository();
    createPlace = new CreatePlaceService(fakePlacesRepository);
  });

  it('should be able to create a new place', async () => {
    const place = await createPlace.execute({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    expect(place).toHaveProperty('id');
    expect(place).toHaveProperty('country');
    expect(place).toHaveProperty('location');
    expect(place).toHaveProperty('goal');
    expect(place.flag_url).toBe('https://www.countryflags.io/br/flat/64.png');
  });

  it('should not be able to create a place with location that are already in use', async () => {
    await createPlace.execute({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    expect(
      createPlace.execute({
        id: '123456',
        country: 'Brasil',
        location: 'Cataratas do Iguaçu',
        goal: new Date(),
        flag_url: 'https://www.countryflags.io/br/flat/64.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
