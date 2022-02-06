import { argPuerto } from '../services/process';
import dotenv from 'dotenv';

dotenv.config();

const venv = {
  PORT: process.env.PORT || argPuerto || 8080 ,
  MONGOATLAS_SRV: process.env.MONGOATLAS_SRV,
  MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'ecommerce',
  MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'ecommerceLocal',
  GMAIL_EMAIL: process.env.GMAIL_EMAIL,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  SESSION_EXPIRE_SECONDS: process.env.SESSION_EXPIRE_SECONDS,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME, 
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY, 
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET
};

export default venv;