import { Router, Response, Request } from 'express';
import { DeepPartial } from 'typeorm';
import User from '../../models/User';
import JwtWebToken from '../../middlewares/JwtWebToken';
import * as repository from './user.repository';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json('users');
});

routes.post(
  '/',
  async (request: Request, response: Response): Promise<unknown> => {
    const { username, password } = request.body;

    const user: DeepPartial<User> = {
      username,
      password,
      role: 0,
    };

    try {
      const createdUser = await repository.insert(user);
      return response.status(200).json(createdUser);
    } catch (error) {
      return response.status(400).json(error);
    }
  },
);

routes.get(
  '/test-auth',
  JwtWebToken,
  (request: Request, response: Response) => {
    const { name, email } = request.body;

    const user = {
      name,
      email,
    };

    return response.json(user);
  },
);

export default routes;
