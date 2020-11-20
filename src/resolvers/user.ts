import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import User from '../models/User';
import UserRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

@InputType()
class Request {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class Response {
  @Field(() => User)
  user: User
}

@Resolver()
export class UserResolver {

  @Mutation(() => Response)
  async register(
    @Arg('options') options: Request,
  ): Promise<Response> {
    const { name, email, password } = options;

    const userRepository = new UserRepository();

    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return {
      user,
    };
  }
}
