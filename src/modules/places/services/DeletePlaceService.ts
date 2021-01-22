import 'reflect-metadata';
import { getCustomRepository } from 'typeorm';

import PlacesRepository from '@modules/places/infra/typeorm/repositories/PlacesRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const placesRepository = getCustomRepository(PlacesRepository);

    const product = await placesRepository.findOne(id);

    if (!product) {
      throw new AppError('Product does not exist');
    }

    await placesRepository.delete(product.id);
  }
}

export default DeleteProductService;
