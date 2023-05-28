import { Router, Response, Request } from 'express';

const routes = Router();

routes.post('/users', (request: Request, response: Response) => {
  const { name, email } = request.body;

  const user = {
    name,
    email,
  };

  return response.json(user);
});

export default routes;
