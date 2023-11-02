/* eslint-disable consistent-return */
import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { verifyPassword } from '../../utils/encryption';
import * as repository from '../users/users.repository';
import DatabaseError from '../../utils/errorTypes/database';
import * as validator from './auth.validator';

import BaseResponse from '../../utils/response';

require('dotenv').config();

const routes = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Endpoint for user authentication and login.
 *     tags: [Auth]
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
 *         description: Successful login. Returns an access token.
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *               description: JSON Web Token (JWT) for authentication.
 *       400:
 *         description: Bad request. User not found or invalid credentials.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "user not found"
 *               description: Error message indicating the reason for failure.
 *       401:
 *         description: Unauthorized. User has insufficient privileges or bad credentials.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "user has no privileges"
 *               description: Error message indicating the reason for failure.
 *       500:
 *         description: Internal Server Error. Failed to fetch data from the database.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Failed to fetch data from the database."
 *               description: Error message indicating the reason for failure.
 */
routes.post(
  '/login',
  validator.authenticate,
  async (req: Request, res: Response): Promise<unknown> => {
    const { username, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return BaseResponse.error(res, { errors: errors.array() });
    }

    try {
      const user = await repository.getUserByUsername(username);

      if (user) {
        if (user.role < 2) {
          res.status(401).json({ error: 'user has no privilleges' });
        } else if (verifyPassword(password, user.password)) {
          const accessToken = jwt.sign(password, process.env.SECRET_KEY || '');

          return BaseResponse.success(res, { accessToken });
        } else {
          return BaseResponse.unauthorized(res, {
            error: 'invalid grand: bad credentials',
          });
        }
      } else {
        return BaseResponse.error(res, {
          error: 'user not found',
        });
      }
    } catch (err) {
      throw new DatabaseError('Failed to fetch data from the database.');
    }
  },
);

export default routes;
