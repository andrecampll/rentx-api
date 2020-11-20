import { hash } from 'bcryptjs';
import Car from '../models/Car';
import ICarsRepository from '../repositories/cars/ICarsRepository';
import { classToClass } from 'class-transformer';

interface FieldError {
  field: string;
  message: string;
}

interface IResponse {
  cars?: Car[];
  errors?: FieldError[];
}

class ListCarsService {
  constructor(private carsRepository: ICarsRepository) {}

  public async execute(): Promise<IResponse> {
    const cars = await this.carsRepository.findAll();

    return {
      cars,
    };
  }
}

export default ListCarsService;
