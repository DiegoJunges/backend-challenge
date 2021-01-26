import AppError from '@shared/errors/AppError';
import { startOfHour } from 'date-fns';
import FakePlacesRepository from '../repositories/fakes/FakePlacesRepository';
import ListSortedPlacesService from './ListSortedPlacesService';

let fakePlacesRepository: FakePlacesRepository;
let listSortedPlaces: ListSortedPlacesService;

beforeEach(() => {
  fakePlacesRepository = new FakePlacesRepository();
  listSortedPlaces = new ListSortedPlacesService(fakePlacesRepository);
});

describe('ListPlaceByIdService', () => {
  it('should be able to list a place by id', async () => {
    const place = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(2023, 4, 7),
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    const place2 = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Jalapão',
      goal: new Date(2022, 4, 3, 25),
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    const place3 = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Canoa Quebrada',
      goal: startOfHour(new Date(2023, 4, 5)),
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    const place4 = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Praia da Pipa',
      goal: place3.goal,
      flag_url: 'https://www.countryflags.io/br/flat/64.png',
    });

    const sortedPlaces = await listSortedPlaces.execute();

    expect(sortedPlaces).toEqual(
      expect.arrayContaining([place2, place3, place4, place2]),
    );
  });

  it('should not be able to sort a place that not exist', async () => {
    expect(listSortedPlaces.execute()).rejects.toBeInstanceOf(AppError);
  });
});
