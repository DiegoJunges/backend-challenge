"use strict";

var _FakePlacesRepository = _interopRequireDefault(require("../repositories/fakes/FakePlacesRepository"));

var _DeletePlaceService = _interopRequireDefault(require("./DeletePlaceService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePlacesRepository;
let deletePlace;
beforeEach(() => {
  fakePlacesRepository = new _FakePlacesRepository.default();
  deletePlace = new _DeletePlaceService.default(fakePlacesRepository);
});
describe('DeletePlaceService', () => {
  it('should be able to delete a place', async () => {
    const place = await fakePlacesRepository.create({
      id: '123456',
      country: 'Brasil',
      location: 'Cataratas do Iguaçu',
      goal: new Date(),
      flag_url: 'https://www.countryflags.io/br/flat/64.png'
    });
    const places = await fakePlacesRepository.find();
    await deletePlace.execute({
      id: place.id
    });
    expect(places).not.toContain([place.id]);
  });
});