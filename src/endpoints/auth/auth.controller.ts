/* eslint-disable consistent-return */
import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../../utils/encryption';
import * as repository from '../users/users.repository';
import * as validator from './auth.validator';

import BaseResponse from '../../utils/response';

import * as Constants from '../../utils/constants';

import expressValidator from '../../middlewares/ExpressValidator';

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
  expressValidator,
  async (req: Request, res: Response): Promise<unknown> => {
    const { username, password } = req.body;

    try {
      const user = await repository.getUserByUsername(username);
      const genericError = 'Password or username are wrong!';

      if (user) {
        if (user.role < 2) {
          return BaseResponse.unauthorized(res, {
            error: 'The user has no privilleges to access this feature.',
          });
        }
        if (verifyPassword(password, user.password)) {
          const accessToken = jwt.sign(
            { userId: user.id },
            process.env.SECRET_KEY || '',
            {
              expiresIn: '1h',
            },
          );

          BaseResponse.success(res, { accessToken });
        } else {
          BaseResponse.unauthorized(res, {
            error: genericError,
          });
        }
      } else {
        BaseResponse.notFound(res, {
          error: genericError,
        });
      }
    } catch (err) {
      return BaseResponse.internalError(res, {
        error: 'Something unexpected happened!',
      });
    }
  },
);

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Check User Permissions
 *     description: Endpoint to check user permissions based on the provided access token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *                 description: User's access token.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successful permission check. Returns whether the user has sufficient privileges.
 *         schema:
 *           type: object
 *           properties:
 *             hasPermission:
 *               type: boolean
 *               example: true
 *               description: Indicates whether the user has permission (true) or not (false).
 *       400:
 *         description: Bad request. Invalid access token provided.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Invalid token."
 *               description: Error message indicating the reason for failure.
 *       401:
 *         description: Unauthorized. User does not have sufficient privileges or bad access token.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Insufficient privileges."
 *               description: Error message indicating the reason for failure.
 *       500:
 *         description: Internal Server Error. Failed to verify access token or fetch user data.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: "Failed to verify access token."
 *               description: Error message indicating the reason for failure.
 */
routes.post(
  '/permissions',
  validator.permissions,
  async (request: Request, response: Response) => {
    const { acessToken } = request.body;

    try {
      // Try to verify the token
      jwt.verify(
        acessToken,
        process.env.SECRET_KEY || '',
        async (err: unknown, payload: any) => {
          if (err) {
            return BaseResponse.error(response, {
              error: 'Invalid or expired token.',
            });
          }
          const user = await repository.getUserById(payload.userId);

          if (user) {
            BaseResponse.success(response, {
              role: Constants.getRole(user.role),
            });
          }
          return false;
        },
      );
    } catch (err) {
      BaseResponse.internalError(response);
    }
  },
);

export default routes;
