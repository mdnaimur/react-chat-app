/**
 * Title: Login Router
 * Description: Router for login page
 * Author: Md Naimur Rahman
 * Date: 08/09/2026
 */

// External imports
import express from 'express';

// Internal imports
import { getLogin } from '../controller/loginController.mjs';
import { decorateHtmlResponse } from '../middlewares/common/decorateHtmlResponse.mjs';

const router = express.Router();

// Login page
console.log('I am login page[router] hit');

router.get('/', decorateHtmlResponse('Login'), getLogin);
// router.get('/', decorateHtmlResponse('Login', getLogin));
// router.get('/', (req, res) => {
//   console.log('GET / route hit');
//   res.send('Login page');
// });

export default router;
