//#region Imports
import { type Request, type Response } from 'express';
import { defineSsrMiddleware } from '#q-app/wrappers';
import { userDatabase } from '../custom/database';
//#endregion

export default defineSsrMiddleware(({ app }) => {
  const db = userDatabase();

  //#region Products
  app.get('/api/getProducts', (req: Request, res: Response) => {
    res.json(db.getProducts());
  });

  app.post('/api/getProductById', (req: Request, res: Response) => {
    res.json(db.getProductById(req.body.productId));
  });
  //#endregion

  //#region Authentication
  app.post('/api/login', (req: Request, res: Response) => {
    res.json(db.login(req.body.emailOrName, req.body.password));
  });

  app.post('/api/logout', (req: Request, res: Response) => {
    res.json(db.logout());
  });

  app.post('/api/register', (req: Request, res: Response) => {
    res.json(db.register(req.body.name, req.body.email, req.body.password));
  });

  app.post('/api/forgotPassword', (req: Request, res: Response) => {
    res.json(db.forgotPassword(req.body.email));
  });
  //#endregion

  //#region User Management
  app.post('/api/updateUserCredentials', (req: Request, res: Response) => {
    res.json(db.updateUserCredentials(req.body.userId, req.body.credentials));
  });

  app.post('/api/updateUserAddresses', (req: Request, res: Response) => {
    res.json(db.updateUserAddresses(req.body.userId, req.body.addresses));
  });

  app.post('/api/updateUserPaymentCards', (req: Request, res: Response) => {
    res.json(db.updateUserPaymentCards(req.body.userId, req.body.paymentCards));
  });
  //#endregion

  //#region Basket
  app.post('/api/addItemToBasket', (req: Request, res: Response) => {
    res.json(db.addItemToBasket(req.body.userId, req.body.productId));
  });

  app.post('/api/deleteProductInBasket', (req: Request, res: Response) => {
    res.json(db.deleteProductInBasket(req.body.userId, req.body.productId));
  });

  app.post('/api/getBasketByUserId', (req: Request, res: Response) => {
    res.json(db.getBasketByUserId(req.body.userId));
  });
  //#endregion
});
