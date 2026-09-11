/**
 * Title: Login Router
 * Description: Router for login page
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

// External imports
import express from 'express';

// Internal imports
import { getLogin, login, logout } from '../controller/loginController.mjs';
import { decorateHtmlResponse } from '../middlewares/common/decorateHtmlResponse.mjs';
import {
  doLoginValidationHandler,
  doLoginValidators,
} from '../middlewares/login/loginValidators.js';

import { redirectLoggedIn } from '../middlewares/common/checkLogin.js';

const router = express.Router();

// set page title
const page_title = 'Login';

// Login page

router.get('/', decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);
// router.get('/', decorateHtmlResponse('Login', getLogin));
// router.get('/', (req, res) => {
//   console.log('GET / route hit');
//   res.send('Login page');
// });

router.post(
  '/',
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login,
);

// lotoug
router.delete('/', logout);
export default router;
