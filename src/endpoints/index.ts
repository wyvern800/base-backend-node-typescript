import auth from './auth/auth.controller';
import users from './users/users.controller';

import { Controller } from '../types/controller';

// Define the routes with its controllers here
export default [
  { endpoint: '/auth', controller: auth },
  { endpoint: '/users', controller: users },
] as Controller[];
