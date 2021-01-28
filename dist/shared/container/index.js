"use strict";

var _tsyringe = require("tsyringe");

var _PlacesRepository = _interopRequireDefault(require("../../modules/places/infra/typeorm/repositories/PlacesRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('PlacesRepository', _PlacesRepository.default);