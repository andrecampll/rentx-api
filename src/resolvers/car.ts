import {
  Arg,
  Field,
  Mutation,
  InputType,
  Resolver,
  ObjectType,
  Query,
  Authorized,
} from 'type-graphql';
import Car from '../models/Car';
import CarsRepository from '../repositories/cars/CarsRepository';
import CreateCarService from '../services/CreateCarService';
import ListCarsService from '../services/ListCarsService';
import UpdateCarService from '../services/UpdateCarService';
import DeleteCarService from '../services/DeleteCarService';

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

@InputType()
class DeleteCarRequest {
  @Field()
  id: string;
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
  @Authorized()
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
  @Authorized()
  async readCars(): Promise<Car[] | undefined> {
    const carsRepository = new CarsRepository();

    const readCars = new ListCarsService(carsRepository);

    const { cars } = await readCars.execute();

    return cars;
  }

  @Mutation(() => CarResponse)
  @Authorized()
  async updateCar(
    @Arg('options') options: UpdateCarRequest
  ): Promise<CarResponse> {
    const { id, name, brand, daily_value } = options;

    const carsRepository = new CarsRepository();

    const updateCar = new UpdateCarService(carsRepository);

    const { car, errors } = await updateCar.execute({
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
  @Authorized()
  async deleteCar(
    @Arg('options') options: DeleteCarRequest
  ): Promise<CarResponse> {
    const { id } = options;

    const carsRepository = new CarsRepository();

    const deleteCar = new DeleteCarService(carsRepository);

    const { car, errors } = await deleteCar.execute({
      id,
    });

    return {
      car,
      errors
    };
  }
}
