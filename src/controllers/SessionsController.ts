import { Request, Response } from 'express';
import UserRepository from '../repositories/users/UsersRepository';
import CreateSessionsService from '../services/CreateSessionService';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userRepository = new UserRepository();

    const authenticatedUser = new CreateSessionsService(userRepository);

    const { user, token } = await authenticatedUser.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export default SessionController;
