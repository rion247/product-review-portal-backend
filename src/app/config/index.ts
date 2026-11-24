import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALTROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  jwt_reset_password_secret: process.env.JWT_RESET_PASSWORD_SECRET,
  jwt_reset_password_expires_in: process.env.JWT_RESET_PASSWORD_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  ssl_commerz_store_id: process.env.SSL_COMMERZ_STORE_ID,
  ssl_commerz_store_password: process.env.SSL_COMMERZ_STORE_PASSWORD,
  ssl_commerz_success_url: process.env.SSL_COMMERZ_SUCCESS_URL,
  ssl_commerz_fail_url: process.env.SSL_COMMERZ_FAIL_URL,
  ssl_commerz_cancel_url: process.env.SSL_COMMERZ_CANCEL_URL,
  ssl_commerz_ipn_url: process.env.SSL_COMMERZ_IPN_URL,
  ssl_commerz_generate_transaction_api:
    process.env.SSL_COMMERZ_GENERATE_TRANSACTION_API,
  ssl_commerz_validation_api: process.env.SSL_COMMERZ_VALIDATION_API,
  super_admin_name: process.env.SUPER_ADMIN_NAME,
  super_admin_contact_number: process.env.SUPER_ADMIN_CONTACT_NUMBER,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  super_admin_profile_photo: process.env.SUPER_ADMIN_PROFILE_PHOTO,
};
