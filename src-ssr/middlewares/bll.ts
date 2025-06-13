import { type Request, type Response } from 'express';
import { defineSsrMiddleware } from '#q-app/wrappers';

import { userDatabase } from '../custom/database';
// This middleware should execute as last one
// since it captures everything and tries to
// render the page with Vue

export default defineSsrMiddleware(({ app }) => {
  const db = userDatabase();
  // we capture any other Express route and hand it
  // over to Vue and Vue Router to render our page
  app.get('/api/getProducts', (req: Request, res: Response) => {
    res.json( db.getProducts());
  });

  app.post('/api/getUserById', (req: Request, res: Response) => {
    res.json( db.getUserById(req.body.userId));
  });

  app.post('/api/login', (req: Request) => {
    const { emailOrName, password } = req.body;
    return db.login(emailOrName, password);
  });

  app.post('/api/logout', (req: Request, res: Response) => {
    const success = db.logout();
    if (success) {
      res.json({ message: 'Logged out successfully' });
    } else {
      res.status(500).json({ error: 'Logout failed' });
    }
  });

  app.post('/api/register', (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const newUser = db.register(name, email, password);
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
    }
  });

  app.post('/api/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const newUser = db.register(name, email, password);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
  }
  });

  app.post('/api/forgotPassword', (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const success = db.forgotPassword(email);
      res.json({ success });
    } catch (error) {
      res.status(404).json({ error: error instanceof Error ? error.message : 'Forgot password failed' });
    }
  }
  );


});
