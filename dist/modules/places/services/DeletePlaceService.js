"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _IPlaceRepository = _interopRequireDefault(require("../repositories/IPlaceRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PlacesRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPlaceRepository.default === "undefined" ? Object : _IPlaceRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteProductService {
  constructor(placesRepository) {
    this.placesRepository = placesRepository;
  }

  async execute({
    id
  }) {
    await this.placesRepository.delete(id);
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteProductService;
exports.default = _default;