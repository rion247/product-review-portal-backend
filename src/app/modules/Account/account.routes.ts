import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { upload } from '../../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchemas } from '../User/user.validation';
import { AccountController } from './account.controller';

const router = express.Router();

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

export const AccountRoutes = router;
