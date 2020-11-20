import { Request, Response } from 'express';
import UserRepository from '../repositories/users/UsersRepository';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();

    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}

export default UserController;
