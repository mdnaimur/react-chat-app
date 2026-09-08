/*
 * Title: user router
 * Description:
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

import express from 'express';
import { decorateHtmlResponse } from '../middlewares/common/decorateHtmlResponse.mjs';
import { getUsers } from '../controller/usersController.mjs';

const router = express.Router();

// user router

export default router.get('/', decorateHtmlResponse('Users'), getUsers);
