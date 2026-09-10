/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 09/09/2026
 */

// external validator

import { check, validationResult } from 'express-validator';

import createError from 'http-errors';
import path from 'path';
import unlink from 'node:fs/promises';

// internal import
import User from '../../models/Users.mjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//*** */

const addUserValidators = [
  check('name')
    .isLength({ min: 3 })
    .isAlpha('en-US', { ignore: '-' })
    .withMessage('Name must contain anything others than alphabet')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Invalid email address')
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError('Email already is use');
        }
      } catch (err) {
        throw createError();
      }
    }),
  check('mobile')
    .isMobilePhone('bn-BD', {
      strictMode: true,
    })
    .withMessage('Mobile number must be a valid Bangldeshi mobile')
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError('Mobile already is use');
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be at least 8 charecters long and should contain at least 1 lowercase, uppercase number and symbol',
    ),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `./../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        },
      );
    }

    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

export { addUserValidators, addUserValidationHandler };
