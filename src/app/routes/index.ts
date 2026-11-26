import express from 'express';
import { AccountRoutes } from '../modules/Account/account.routes';

const router = express.Router();

const moduleRoutes = [{ path: '/account', route: AccountRoutes }];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
