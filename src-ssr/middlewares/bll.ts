import { type Request, type Response } from 'express';
import { defineSsrMiddleware } from '#q-app/wrappers';
import { userDatabase } from '../custom/database';

export default defineSsrMiddleware(({ app }) => {
  const db = userDatabase();
  app.get('/api/getProducts', (req: Request, res: Response) => {
    res.json( db.getProducts());
  });

  app.post('/api/getProductById', (req: Request, res: Response) => {
    res.json(db.getProductById(req.body.productId));
  });

  app.post('/api/login', (req: Request, res: Response) => {
    res.json(db.login(req.body.emailOrName, req.body.password));
  });

  app.post('/api/logout', (req: Request, res: Response) => {
    res.json(db.logout())
  });

  app.post('/api/register', (req: Request, res: Response) => {
    res.json(db.register(req.body.name, req.body.email, req.body.password))
  });

  app.post('/api/forgotPassword', (req: Request, res: Response) => {
    res.json(db.forgotPassword(req.body.email));
  });
});
