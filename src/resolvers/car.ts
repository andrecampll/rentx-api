import { Arg, Field, Mutation, ObjectType, Resolver } from 'type-graphql';
import Car from '../models/Car';

@ObjectType()
class CarFields {
  @Field()
  name: string;

  @Field()
  brand: string;

  @Field()
  daily_value: number;
}

@Resolver()
export class CarResolver {
  @Mutation(() => Car)
  create(
    @Arg('options') options: CarFields
  ) {
    const { name, brand, daily_value } = options;

    return 'hello world';
  }
}
