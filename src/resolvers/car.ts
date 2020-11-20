import {
  Arg,
  Field,
  Mutation,
  InputType,
  Resolver,
  ObjectType,
  Query,
} from 'type-graphql';
import Car from '../models/Car';
import CarsRepository from '../repositories/cars/CarsRepository';
import CreateCarService from '../services/CreateCarService';
import ListCarsService from '../services/ListCarsService';
import UpdateCarService from '../services/UpdateCarService';

@InputType()
class CarRequest {
  @Field()
  name: string;

  @Field()
  brand: string;

  @Field()
  daily_value: number;
}

@InputType()
class UpdateCarRequest {
  @Field()
  id: string;

  @Field()
  name?: string;

  @Field()
  brand?: string;

  @Field()
  daily_value?: number;
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

  @Field(() => Car, { nullable: true })
  cars?: Car[]
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

  @Query(() => [Car])
  async cars(): Promise<Car[] | undefined> {
    const carsRepository = new CarsRepository();

    const createCar = new ListCarsService(carsRepository);

    const { cars } = await createCar.execute();

    return cars;
  }

  @Mutation(() => CarResponse)
  async updateCar(
    @Arg('options') options: UpdateCarRequest
  ): Promise<CarResponse> {
    const { name, brand, daily_value, id } = options;

    const carsRepository = new CarsRepository();

    const createCar = new UpdateCarService(carsRepository);

    const { car, errors } = await createCar.execute({
      id,
      name,
      brand,
      daily_value
    });

    return {
      car,
      errors
    };
  }

  @Mutation(() => CarResponse)
  async delete(
    @Arg('options') options: UpdateCarRequest
  ): Promise<CarResponse> {
    const { name, brand, daily_value, id } = options;

    const carsRepository = new CarsRepository();

    const createCar = new UpdateCarService(carsRepository);

    const { car, errors } = await createCar.execute({
      id,
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
