/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

// internal import
import {
  errorHandler,
  notFoundHandler,
} from './middlewares/common/errorHandler.js';

import loginRouter from './routers/loginRouter.js';

const app = express();

dotenv.config();
// console.log(process.env.NODE_ENV);
//  database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log('database connection successful'))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set('view engine', 'ejs');

// set static folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// parse cookies

app.use(cookieParser(process.env.COOKIE_SECRET));

// route setup
app.use('/', loginRouter);

// error hanlding

// 404 not found handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`app listeting to http://localhost: ${process.env.PORT}`);
});
