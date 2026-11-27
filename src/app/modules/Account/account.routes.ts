import { UserRole } from '@prisma/client';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { upload } from '../../../utils/sendImageToCloudinary';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidationSchemas } from '../Admin/admin.validation';
import { UserValidationSchemas } from '../User/user.validation';
import { AccountController } from './account.controller';
import { AccountValidationSchemas } from './account.validation';

const router = express.Router();

router.patch(
  '/update-profile',
  auth(UserRole.ADMIN, UserRole.USER),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(
    AccountValidationSchemas.accountValidationSchemaForUpdateProfile,
  ),
  AccountController.updateProfile,
);

router.post(
  '/create-admin',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidationSchemas.adminValidationSchemaForCreate),
  AccountController.createAdmin,
);

router.post(
  '/create-user',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(UserValidationSchemas.userValidationSchemaForCreate),
  AccountController.createUser,
);

router.patch(
  '/:id/status',
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(
    AccountValidationSchemas.accountValidationSchemaForChangeStatus,
  ),
  AccountController.changeUserStatus,
);

(router.get('/me', auth(UserRole.ADMIN, UserRole.USER)),
  AccountController.getMe);

export const AccountRoutes = router;
