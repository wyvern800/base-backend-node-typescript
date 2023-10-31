import auth from './auth/auth.controller';
import user from './user/user.controller';

import { Controller } from '../types/controller';

// Define the routes with its controllers here
export default [
  { endpoint: '/auth', controller: auth },
  { endpoint: '/users', controller: user },
] as Controller[];
