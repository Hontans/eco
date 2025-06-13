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

  app.post('/api/login', (req: Request, res: Response) => {
    const { emailOrName, password } = req.body;
    const user = db.login(emailOrName, password);
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
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
});
