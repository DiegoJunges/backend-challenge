import { container } from 'tsyringe';

import IPlaceRepository from '@modules/places/repositories/IPlaceRepository';
import PlacesRepository from '@modules/places/infra/typeorm/repositories/PlacesRepository';

container.registerSingleton<IPlaceRepository>(
  'PlacesRepository',
  PlacesRepository,
);
