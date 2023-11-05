/* eslint-disable consistent-return */
import { Router, Response, Request } from 'express';
import { DeepPartial } from 'typeorm';
import User from '../../models/User';
import JwtWebToken from '../../middlewares/JwtWebToken';
import * as repository from './users.repository';
import * as validator from './users.validator';

import BaseResponse from '../../utils/response';

import expressValidator from '../../middlewares/ExpressValidator';

const routes = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of users from the database.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response with a list of users
 */
routes.get('/', (request: Request, response: Response) => {
  return response.json('users');
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     description: Endpoint to create a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *                 description: User's username.
 *               password:
 *                 type: string
 *                 example: password123
 *                 description: User's password.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User credentials for login.
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: john_doe
 *             password:
 *               type: string
 *               example: password123
 *     responses:
 *       200:
 *         description: User created successfully.
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               example: 1
 *               description: User's unique ID.
 *             username:
 *               type: string
 *               example: john_doe
 *               description: User's username.
 *             role:
 *               type: number
 *               example: 0
 *               description: User's role (0 for regular user).
 *       400:
 *         description: Bad request. Error response with details.
 */
routes.post(
  '/',
  validator.createUser,
  expressValidator,
  async (request: Request, response: Response): Promise<unknown> => {
    const { username, password } = request.body;

    const user: DeepPartial<User> = {
      username,
      password,
      role: 0,
    };

    try {
      const createdUser = await repository.insert(user);
      return BaseResponse.success(response, createdUser);
    } catch (error) {
      return BaseResponse.error(response, error);
    }
  },
);

/**
 * @swagger
 * /users/test-auth:
 *   get:
 *     summary: Test Authentication Endpoint
 *     description: Endpoint to test authentication using JWT.
 *     tags: [Users]
 *     security:
 *       - JwtWebToken: []
 *     responses:
 *       200:
 *         description: Successful response with user data.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: John Doe
 *               description: User's name.
 *             email:
 *               type: string
 *               example: john.doe@example.com
 *               description: User's email address.
 */
routes.get(
  '/test-auth',
  JwtWebToken,
  (request: Request, response: Response) => {
    const { name, email } = request.body;

    const user = {
      name,
      email,
    };

    return BaseResponse.success(response, user);
  },
);

export default routes;
