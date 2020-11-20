import { Arg, Field, Mutation, InputType, Resolver, ObjectType } from 'type-graphql';
import Car from '../models/Car';
import CarsRepository from '../repositories/cars/CarsRepository';
import CreateCarService from '../services/CreateCarService';

@InputType()
class CarRequest {
  @Field()
  name: string;

  @Field()
  brand: string;

  @Field()
  daily_value: number;
}

@ObjectType()
class CarFieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class CarResponse {
  @Field(() => [CarFieldError], { nullable: true })
  errors?: CarFieldError[]

  @Field(() => Car, { nullable: true })
  car?: Car
}

@Resolver()
export class CarResolver {
  @Mutation(() => CarResponse)
  async createCar(
    @Arg('options') options: CarRequest
  ): Promise<CarResponse> {
    const { name, brand, daily_value } = options;

    const carsRepository = new CarsRepository();

    const createCar = new CreateCarService(carsRepository);

    const { car, errors } = await createCar.execute({
      name,
      brand,
      daily_value
    });

    return {
      car,
      errors
    };
  }
}
