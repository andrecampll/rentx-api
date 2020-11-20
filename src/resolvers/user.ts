import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from 'type-graphql';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import CreateSessionService from '../services/CreateSessionService';

@InputType()
class RegisterRequest {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class AuthRequest {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class Response {
  @Field(() => String)
  token?: string

  @Field(() => User)
  user: User
}

@Resolver()
export class UserResolver {

  @Mutation(() => Response)
  async register(
    @Arg('options') options: RegisterRequest,
  ): Promise<Response> {
    const { name, email, password } = options;

    const userRepository = new UsersRepository();

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

  @Mutation(() => Response)
  async login(
    @Arg('options') options: AuthRequest,
  ): Promise<Response> {
    const { email, password } = options;

    const userRepository = new UsersRepository();

    const authenticateUser = new CreateSessionService(userRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return {
      user,
      token,
    };
  }
}
