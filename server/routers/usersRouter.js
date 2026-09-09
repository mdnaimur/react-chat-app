/*
 * Title: user router
 * Description:
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

import express from 'express';
import { decorateHtmlResponse } from '../middlewares/common/decorateHtmlResponse.mjs';
import {
  getUsers,
  addUser,
  removeUser,
} from '../controller/usersController.mjs';
import avatarUpload from '../middlewares/users/avatarUpload.mjs';
import {
  addUserValidators,
  addUserValidationHandler,
} from '../middlewares/users/userValidators.js';

const router = express.Router();

// user router

router.get('/', decorateHtmlResponse('Users'), getUsers);

router.post(
  '/',
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser,
);
// remove user
router.delete('/:id', removeUser);
export default router;
