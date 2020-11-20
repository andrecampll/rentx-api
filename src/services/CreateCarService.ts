import { hash } from 'bcryptjs';
import Car from '../models/Car';
import ICarsRepository from '../repositories/cars/ICarsRepository';
import { classToClass } from 'class-transformer';

interface FieldError {
  field: string;
  message: string;
}

interface Request {
  name: string;
  brand: string;
  daily_value: number;
}

interface IResponse {
  car?: Car;
  errors?: FieldError[];
}

class CreateCarService {
  constructor(private carsRepository: ICarsRepository) {}

  public async execute({
    name,
    brand,
    daily_value,
  }: Request): Promise<IResponse> {
    const car = await this.carsRepository.create({
      name,
      brand,
      daily_value,
    });

    if (!name) {
      return {
        errors: [{
          field: 'name',
          message: 'Nome de carro inválido.'
        }]
      }
    }

    if (!brand) {
      return {
        errors: [{
          field: 'brand',
          message: 'Marca de carro inválida.'
        }]
      }
    }

    if (!daily_value) {
      return {
        errors: [{
          field: 'brand',
          message: 'Você precisa especificar um valor de diária.'
        }]
      }
    }

    return {
      car: classToClass(car),
    };
  }
}

export default CreateCarService;
