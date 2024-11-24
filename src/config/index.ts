/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
