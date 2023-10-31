import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../../utils/encryption';
import * as repository from '../user/user.repository';

require('dotenv').config();

const routes = Router();

routes.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await repository.getUserByUsername(username);

    if (user) {
      if (verifyPassword(password, user.password)) {
        const accessToken = jwt.sign(password, process.env.SECRET_KEY || '');

        res.status(200).json({ accessToken });
      } else {
        res.status(401).json({ error: 'invalid grand: bad credentials' });
      }
    } else {
      res.status(400).json({ error: 'user not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'something unexpected happened' });
  }
});

export default routes;