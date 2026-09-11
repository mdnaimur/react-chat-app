/*
 * Title: inbox route
 * Description: Route fro inbox router
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

import express from 'express';
import { decorateHtmlResponse } from '../middlewares/common/decorateHtmlResponse.mjs';
import { getInbox } from '../controller/inboxController.mjs';

import { checkLogin } from '../middlewares/common/checkLogin.js';

const router = express.Router();

export default router.get(
  '/',
  decorateHtmlResponse('Inbox'),
  checkLogin,
  getInbox,
);
