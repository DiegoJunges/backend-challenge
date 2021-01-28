"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dateFns = require("date-fns");

var _FakePlacesRepository = _interopRequireDefault(require("../repositories/fakes/FakePlacesRepository"));

var _ListSortedPlacesService = _interopRequireDefault(require("./ListSortedPlacesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePlacesRepository;
let listSortedPlaces;
beforeEach(() => {
  fakePlacesRepository = new _FakePlacesRepository.default();
  listSortedPlaces = new _ListSortedPlacesService.default(fakePlacesRepository);
});
describe('ListPlaceByIdService', () => {
  it('should be able to list a place by id', async () => {
    const place = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(2023, 4, 7),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    const place2 = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Jalapão',
      goal: new Date(2022, 4, 3, 25),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    const place3 = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Canoa Quebrada',
      goal: (0, _dateFns.startOfHour)(new Date(2023, 4, 5)),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    const place4 = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Praia da Pipa',
      goal: place3.goal,
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    const sortedPlaces = await listSortedPlaces.execute();
    expect(sortedPlaces).toEqual(expect.arrayContaining([place2, place3, place4, place2]));
  });
  it('should not be able to sort a place that not exist', async () => {
    expect(listSortedPlaces.execute()).rejects.toBeInstanceOf(_AppError.default);
  });
});