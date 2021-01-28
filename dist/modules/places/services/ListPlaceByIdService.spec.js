"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePlacesRepository = _interopRequireDefault(require("../repositories/fakes/FakePlacesRepository"));

var _ListPlaceByIdService = _interopRequireDefault(require("./ListPlaceByIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePlacesRepository;
let findPlaceById;
beforeEach(() => {
  fakePlacesRepository = new _FakePlacesRepository.default();
  findPlaceById = new _ListPlaceByIdService.default(fakePlacesRepository);
});
describe('ListPlaceByIdService', () => {
  it('should be able to list a place by id', async () => {
    const place = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    const places = await findPlaceById.execute(place.id);
    expect(place.id).toEqual(places === null || places === void 0 ? void 0 : places.id);
  });
  it('should not be able to list a place that not exist', async () => {
    expect(findPlaceById.execute('non-existing-place-id')).rejects.toBeInstanceOf(_AppError.default);
  });
});