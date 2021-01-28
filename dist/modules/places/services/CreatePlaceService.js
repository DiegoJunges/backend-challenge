"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPlaceRepository = _interopRequireDefault(require("../repositories/IPlaceRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePlaceService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PlacesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPlaceRepository.default === "undefined" ? Object : _IPlaceRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatePlaceService {
  constructor(placeRepository) {
    this.placeRepository = placeRepository;
  }

  async execute({
    id,
    country,
    location,
    goal,
    flag_url
  }) {
    const locationAlreadyUsed = location;
    const findUsedLocation = await this.placeRepository.findLocationAlreadyUsed(locationAlreadyUsed);

    if (findUsedLocation) {
      throw new _AppError.default('Location already used');
    }

    const place = await this.placeRepository.create({
      id,
      country,
      location,
      goal,
      flag_url
    });
    return place;
  }

}) || _class) || _class) || _class) || _class);
var _default = CreatePlaceService;
exports.default = _default;